import React, { useState, useEffect } from "react";
import ProductCard from "shared/components/ProductCard/ProductCard";
import PageHeading from "shared/components/PageHeading/PageHeading";
import Filter from "view/app-components/ShopPage/Filter/Filter";
import img from "assets/test-img.jpg";
// import ProductService from "service/ProductService";
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
                value: {
                    centAmount: number;
                };
            },
        ];
    };
}

export function ShopPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { categorie } = useCategorie();

    useEffect(() => {
        function getProductList() {
            setProducts(categorie);
        }

        getProductList();
    }, [categorie]);

    return (
        <section className="shop-page container">
            <PageHeading
                navigation="home - shop"
                title="Shop"
                description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                    voluptatum deleniti."
            />
            <div className="shop-page__wrapper">
                <Filter />
                <div className="shop-page__product-cards">
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
                                    product.masterVariant.prices &&
                                    product.masterVariant.prices.length > 0
                                        ? product.masterVariant.prices[0].value.centAmount / 100
                                        : 100
                                } $`}
                                discountPrice="150$"
                                onClick={() => console.log(product.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
