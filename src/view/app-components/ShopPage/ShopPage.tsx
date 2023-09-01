import React, { useState, useEffect } from "react";
import ProductCard from "shared/components/ProductCard/ProductCard";
import PageHeading from "shared/components/PageHeading/PageHeading";
import { Filter, IQueryParams } from "view/app-components/ShopPage/Filter/Filter";
import { Sorting } from "view/app-components/ShopPage/Sorting/Sorting";
import img from "assets/test-img.jpg";
import ProductService from "service/ProductService";
import { AuthService } from "service/AuthService";
import { AuthDataStore } from "service/AuthDataStore";
import { useCategorie } from "providers/FilterProvider";
import { useNavigate } from "react-router-dom";

export interface IProduct {
    categories: [];
    id: string;
    key: string;
    name: {
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
    const navigate = useNavigate();
    const [queryParams, setQueryParams] = useState<string>("");
    const [categoryParams, setCategoryParams] = useState<string>("");
    // const [url, setUrl] = useState<string>("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const { categorie } = useCategorie();

    function collectColorParams({ param, type }: IQueryParams) {
        if (type === "sort") {
            setQueryParams((prevState) => {
                if (prevState === "") {
                    return `sort=price%20${param}`;
                }
                if (prevState.includes(param)) {
                    const newUrl = `${prevState.replace(param, "").replace(/,""/g, "")}`;

                    if (newUrl === 'filter=variants.attributes.color.key:""') {
                        console.log("color--ok");
                        return "";
                    }

                    return newUrl;
                }
                return `sort=price%20${param}`;
            });
        }
        if (type === "color") {
            setQueryParams((prevState) => {
                if (prevState === "") {
                    return `filter=variants.attributes.color.key:"${param}"`;
                }
                if (prevState.includes(param)) {
                    const newUrl = `${prevState.replace(param, "").replace(/,""/g, "")}`;

                    if (newUrl === 'filter=variants.attributes.color.key:""') {
                        console.log("color--ok");
                        return "";
                    }

                    return newUrl;
                }
                return `${prevState},"${param}"`;
            });
        } else if (type === "size") {
            setQueryParams((prevState) => {
                if (prevState === "") {
                    return `filter=variants.attributes.size.key:"${param}"`;
                }
                if (prevState.includes(param)) {
                    const newUrl = `${prevState.replace(param, "").replace(/,""/g, "")}`;

                    if (newUrl === 'filter=variants.attributes.size.key:""') {
                        console.log("size--ok");
                        return "";
                    }

                    return newUrl;
                }
                return `${prevState},"${param}"`;
            });
        }
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
            const url = `${categoryParams || ""}&${queryParams || ""}`;

            console.log(url);

            if (url) {
                results = (await PRODUCT_SREVICE.getProductURL(url)).data.results;
                console.log(url);
                setProducts(results);
                // console.log(results);
            }
        }

        setParams();
    }, [categoryParams, queryParams]);

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
                    onChangeColor={({ param, type }) => {
                        collectColorParams({ param, type });
                    }}
                    onChangeCategory={(param: string) => {
                        setCategoryParams(param);
                    }}
                />
                <div className="shop-page__product-cards">
                    <Sorting
                        count={products.length}
                        onChangeSort={({ param, type }) => {
                            collectColorParams({ param, type });
                        }}
                    />
                    <div className="shop-page__cards-container">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                img={
                                    product.masterVariant.images &&
                                    product.masterVariant.images.length > 0
                                        ? product.masterVariant.images[0].url
                                        : img
                                }
                                title={product.name["en-US"]}
                                price={`$${
                                    product?.masterVariant?.prices[0]?.discounted
                                        ? product.masterVariant.prices[0].discounted.value
                                              .centAmount / 100
                                        : ""
                                }`}
                                discountPrice={`${
                                    product.masterVariant.prices &&
                                    product.masterVariant.prices.length > 0
                                        ? `$${
                                              product.masterVariant.prices[0].value.centAmount / 100
                                          }`
                                        : ""
                                }`}
                                onClick={() => {
                                    navigate(`/shop/${product.id}`);
                                    console.log(product.id);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
