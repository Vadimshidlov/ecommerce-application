import React, { useState, useEffect } from "react";
import ProductCard from "shared/components/ProductCard/ProductCard";
import PageHeading from "shared/components/PageHeading/PageHeading";
import { Filter, QueryParamsType } from "view/app-components/ShopPage/Filter/Filter";
import { Sorting } from "view/app-components/ShopPage/Sorting/Sorting";
import img from "assets/test-img.jpg";
import ProductService from "service/ProductService";
import { AuthService } from "service/AuthService";
import { AuthDataStore } from "service/AuthDataStore";
import { useCategorie } from "providers/FilterProvider";

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
    const [queryParams, setQueryParams] = useState<QueryParamsType>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const { categorie } = useCategorie();

    useEffect(() => {
        if (categorie.length === 0) {
            setProducts(results);
        } else {
            setProducts(categorie);
        }

        async function setParams() {
            if (queryParams) {
                results = (await PRODUCT_SREVICE.getProduct(queryParams)).data.results;
                setProducts(results);
            }
        }

        setParams();
    }, [categorie, queryParams]);

    console.log(products);

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
                    onClickFn={(param: QueryParamsType) => {
                        setQueryParams(param);
                    }}
                />
                <div className="shop-page__product-cards">
                    <Sorting count={products.length} />
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
                                price={`${
                                    product?.masterVariant?.prices[0]?.discounted
                                        ? product.masterVariant.prices[0].discounted.value
                                              .centAmount / 100
                                        : ""
                                }`}
                                discountPrice={`${
                                    product.masterVariant.prices &&
                                    product.masterVariant.prices.length > 0
                                        ? product.masterVariant.prices[0].value.centAmount / 100
                                        : ""
                                } $`}
                                onClick={() => console.log(product.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
