import React, { useState, useEffect } from "react";
import ProductCard from "shared/components/ProductCard/ProductCard";
import PageHeading from "shared/components/PageHeading/PageHeading";
import { Filter, IQueryParams } from "view/app-components/ShopPage/Filter/Filter";
import { Sorting } from "view/app-components/ShopPage/Sorting/Sorting";
import img from "assets/no-img.png";
import ProductService from "service/ProductService/ProductService";
import { AuthService } from "service/AuthService/AuthService";
import { AuthDataStore } from "service/AuthDataStore/AuthDataStore";
import { useCategorie } from "providers/FilterProvider";
import { Link } from "react-router-dom";

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
const AUTH_SERVICE = new AuthService();
const AUTH_DATA_STORE = new AuthDataStore();
const token = AUTH_DATA_STORE.getAccessAuthToken() || AUTH_DATA_STORE.getAnonymousAccessToken();

if (!token) {
    AUTH_SERVICE.createAnonymousToken();
}
let { results } = (await PRODUCT_SREVICE.getAllProducts()).data;

export function ShopPage() {
    const { categorie } = useCategorie();
    const [sortParams, setSortParams] = useState<string>("");
    const [categoryParams, setCategoryParams] = useState<string>("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [objParams, setObjParams] = useState<IState>({});

    function collectParams({ param, type }: IQueryParams) {
        setObjParams((prevData) => {
            if (type === "search") {
                return {
                    ...prevData,
                    [type]: param ? [param] : [],
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

    useEffect(() => {
        if (categorie.length === 0) {
            setProducts(results);
        } else {
            setProducts(categorie);
        }
    }, [categorie]);

    useEffect(() => {
        async function setParams() {
            const keys = Object.keys(objParams);
            const params: string[] = [];

            keys.forEach((key) => {
                if (key === "search" && objParams[key].length > 0) {
                    params.push(`fuzzy=true&text.en-US=${objParams[key].join("")}`);
                } else if (objParams[key].length > 0) {
                    params.push(
                        `filter=variants.attributes.${key}.key:${objParams[key].join(",")}`,
                    );
                }
            });

            const queryParams = [categoryParams, params.join("&"), sortParams].filter(Boolean);
            const url = queryParams.join("&");

            console.log(url);

            if (url) {
                results = (await PRODUCT_SREVICE.getProductURL(url)).data.results;
            } else {
                results = (await PRODUCT_SREVICE.getAllProducts()).data.results;
            }
            setProducts(results);
        }

        setParams();
    }, [categoryParams, objParams, sortParams]);

    // console.log(products);

    return (
        <section className="shop-page container">
            <PageHeading
                navigation="home - shop"
                title="Shop"
                description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    voluptatum deleniti."
            />
            <div className="shop-page__wrapper">
                <Filter
                    onChangeFn={({ param, type }) => {
                        collectParams({ param, type });
                    }}
                    onChangeCategory={(param: string) => {
                        setCategoryParams(param);
                    }}
                />
                <div className="shop-page__product-cards">
                    <Sorting
                        count={products.length}
                        onChangeSort={(param) => {
                            setSortParams(param);
                        }}
                    />
                    <div className="shop-page__cards-container">
                        {products.map((product) => (
                            <Link key={product.id} to={`/shop/${product.id}`}>
                                <ProductCard
                                    sale={!!product?.masterVariant?.prices[0]?.discounted}
                                    key={product.id}
                                    id={product.id}
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
                                                  product.masterVariant.prices[0].value.centAmount /
                                                  100
                                              }`
                                            : ""
                                    }`}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
