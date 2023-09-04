import React, { useCallback, useState } from "react";
import ProductCard from "shared/components/ProductCard/ProductCard";
import PageHeading from "shared/components/PageHeading/PageHeading";
import { Filter } from "view/app-components/ShopPage/Filter/Filter";
import { Sorting } from "view/app-components/ShopPage/Sorting/Sorting";
import img from "assets/no-img.png";
import { Link } from "react-router-dom";

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

export function ShopPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [sortParams, setSortParams] = useState<string>("");

    const onChangeFilter = useCallback((newProducts: IProduct[]) => {
        setProducts(newProducts);
    }, []);

    return (
        <section className="shop-page container">
            <PageHeading
                navigation="home > shop"
                title="Shop"
                description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    voluptatum deleniti."
            />
            <div className="shop-page__wrapper">
                <Filter onChangeFn={onChangeFilter} sortingParam={sortParams} />
                <div className="shop-page__product-cards">
                    <Sorting
                        count={products.length}
                        onChangeSort={(param) => {
                            setSortParams(param);
                        }}
                    />
                    <div className="shop-page__cards-container">
                        {products.map((product) => (
                            <Link key={product.id} to={`/shop/product/${product.id}`}>
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
