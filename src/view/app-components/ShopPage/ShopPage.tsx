import React, { useEffect, useState } from "react";
import ProductCard from "shared/components/ProductCard/ProductCard";
import PageHeading from "shared/components/PageHeading/PageHeading";
import { Filter, IQueryParams } from "view/app-components/ShopPage/Filter/Filter";
import { Sorting } from "view/app-components/ShopPage/Sorting/Sorting";
import img from "assets/no-img.png";
import { useParams } from "react-router-dom";
import ProductService from "service/ProductService/ProductService";
import filterIcon from "assets/svg/filter.svg";
import { FilterLabel } from "shared/components/FilterLabel/FilterLabel";
import Loader from "shared/components/Loader/Loader";
import BasketService from "service/BasketService/BasketService";

export interface IState {
    [type: string]: string[];
}

export interface IProduct {
    categories: [];
    id: string;
    key: string;
    name: {
        "en-US": string;
    };
    description: {
        "en-US": string;
    };
    masterVariant: {
        images: [
            {
                url: string;
            },
        ];
        prices: [
            {
                discounted: {
                    value: {
                        centAmount: number;
                    };
                };
                value: {
                    centAmount: number;
                };
            },
        ];
    };
}

const PRODUCT_SREVICE = new ProductService();
const BASKET_SERVICE = new BasketService();

export function ShopPage() {
    const limitProducts = 8;
    const [offset, setOffset] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [sortParams, setSortParams] = useState<string>("");
    const [objParams, setObjParams] = useState<IState>({});
    const [activeButton, setActiveButton] = useState(false);
    const { categoryKey } = useParams();
    const [isLoad, setIsLoad] = useState(true);
    const [productsInCart, setProductsInCart] = useState<string[]>([]);
    const title = categoryKey
        ? `${categoryKey.charAt(0).toUpperCase()}${categoryKey.slice(1)}`
        : "Shop";

    // console.log(productsInCart);

    useEffect(() => {
        (async function getProductsInCart() {
            const { lineItems } = await BASKET_SERVICE.getActiveCart();
            const productId = lineItems.map((product) => product.productId);
            setProductsInCart(productId);
        })();
    }, []);

    function collectParams({ param, type, inputFiled }: IQueryParams) {
        setObjParams((prevData) => {
            if (type === "search") {
                return {
                    ...prevData,
                    [type]: param ? [param] : [],
                };
            }
            if (type === "price") {
                const minPrice = inputFiled === "min" ? param || "*" : prevData.price?.[0] || "*";
                const maxPrice = inputFiled === "max" ? param || "*" : prevData.price?.[1] || "*";
                return {
                    ...prevData,
                    [type]: [minPrice, maxPrice],
                };
            }
            const values = prevData[type] || [];
            const newValues = values.includes(param)
                ? (values as string[]).filter((value) => value !== param)
                : [...values, param];
            return {
                ...prevData,
                [type]: newValues,
            };
        });
    }

    const resetAllFiltersHandler = (): void => {
        const filtersContainer: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        const priceInput: NodeListOf<HTMLInputElement> =
            document.querySelectorAll(".filter__price-input");

        priceInput.forEach((item) => {
            const newItem = item;
            newItem.value = "";
        });

        filtersContainer?.forEach((childNode) => {
            const currentNode = childNode;
            if (currentNode instanceof HTMLInputElement && currentNode.type === "checkbox") {
                currentNode.checked = false;
            }
        });

        setObjParams({});
    };

    function resetFilter(type: string): void {
        const typeInputs = document.querySelectorAll(`.filter__${type}-input`);

        typeInputs?.forEach((childNode) => {
            const currentNode = childNode;
            if (currentNode instanceof HTMLInputElement) {
                currentNode.checked = false;
                currentNode.value = "";
            }
        });
    }

    useEffect(() => {
        const scrollEvent = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight &&
                products.length < totalProducts
            ) {
                setOffset((prevState) => prevState + limitProducts);
            }
        };

        window.onscroll = () => scrollEvent();
    }, [products.length, totalProducts]);

    useEffect(() => {
        setProducts([]);
        setOffset(0);
    }, [objParams, categoryKey, sortParams]);

    useEffect(() => {
        (async function setParams() {
            setIsLoad(true);
            const keys: string[] = Object.keys(objParams);
            const params: string[] = [];
            const results: IProduct[] = [];
            const category: string[] = [];

            if (categoryKey) {
                const { id } = (await PRODUCT_SREVICE.getCategoryByKey(categoryKey)).data;
                category.push(`filter=categories.id:"${id}"`);
            }

            keys.forEach((key) => {
                if (key === "search" && objParams[key].length > 0) {
                    params.push(`fuzzy=true&text.en-US=${objParams[key].join("")}`);
                } else if (key === "price") {
                    if (objParams.price[0] !== "*" || objParams.price[1] !== "*") {
                        params.push(
                            `filter=variants.${key}.centAmount:range (${objParams.price[0]} to ${objParams.price[1]})`,
                        );
                    }
                } else if (objParams[key].length > 0) {
                    params.push(
                        `filter=variants.attributes.${key}.key:${objParams[key].join(",")}`,
                    );
                }
            });

            const queryLimit = `limit=${limitProducts}&offset=${offset}`;
            const queryParams = [
                queryLimit,
                category.join(""),
                params.join("&"),
                sortParams,
            ].filter(Boolean);
            const url = queryParams.join("&");

            if (url) {
                const response = (await PRODUCT_SREVICE.getProductURL(url)).data;
                setTotalProducts(response.total);
                results.push(...response.results);
            } else {
                const response = (await PRODUCT_SREVICE.getAllProducts()).data;
                setTotalProducts(response.total);
            }
            setProducts((prevState) => prevState.concat(results));
            setIsLoad(false);
        })();
    }, [categoryKey, objParams, offset, sortParams]);

    return (
        <section className="shop-page container">
            <PageHeading
                navigation={categoryKey || ""}
                title={title}
                description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    voluptatum deleniti."
            />
            <div className="shop-page__wrapper">
                <Filter
                    activeButton={activeButton}
                    setActiveButton={setActiveButton}
                    onChangeFilter={({ param, type, inputFiled }: IQueryParams) =>
                        collectParams({ param, type, inputFiled })
                    }
                    activeCategory={categoryKey || ""}
                    resetAllFilters={resetAllFiltersHandler}
                />
                <div className="shop-page__product-cards">
                    <Sorting
                        productsCount={products.length}
                        onChangeSort={(param) => {
                            setSortParams(param);
                        }}
                    />
                    <button
                        type="button"
                        className="shop-page__filter-button"
                        onClick={() => setActiveButton(!activeButton)}
                    >
                        <img src={filterIcon} alt="filter-icon" />
                        <span className="inter-600-font font-size_m color_black">Filter</span>
                    </button>
                    <FilterLabel
                        params={objParams}
                        resetAllFilters={resetAllFiltersHandler}
                        onRemoveFilter={(type) => {
                            resetFilter(type);
                            setObjParams((prevState) => {
                                const newState = { ...prevState };
                                delete newState[type];
                                return newState;
                            });
                        }}
                    />
                    <div className="shop-page__cards-container">
                        {products.map((product) => (
                            <ProductCard
                                product={product}
                                categoryKey={categoryKey}
                                isInBasket={productsInCart.includes(product.id)}
                                sale={!!product?.masterVariant?.prices[0]?.discounted}
                                key={product.id}
                                // id={product.id}
                                img={
                                    product.masterVariant.images &&
                                    product.masterVariant.images.length > 0
                                        ? product.masterVariant.images[0].url
                                        : img
                                }
                                title={product.name["en-US"]}
                                description={`${product.description["en-US"].slice(0, 60)}...`}
                                price={`$${
                                    product?.masterVariant?.prices[0]?.discounted
                                        ? product.masterVariant.prices[0].discounted.value
                                              .centAmount / 100
                                        : product.masterVariant.prices[0].value.centAmount / 100
                                }`}
                                discountPrice={`${
                                    product.masterVariant.prices &&
                                    product?.masterVariant?.prices[0]?.discounted
                                        ? `$${
                                              product.masterVariant.prices[0].value.centAmount / 100
                                          }`
                                        : ""
                                }`}
                            />
                        ))}
                    </div>
                    {isLoad && <Loader />}
                </div>
            </div>
        </section>
    );
}
