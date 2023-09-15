import React, { useEffect, useState } from "react";
import "view/app-components/MainPage/style.scss";
import "react-toastify/dist/ReactToastify.css";
import Text from "shared/components/Text/text";
import { Button } from "shared/components/button/Button";
import { Link, NavLink } from "react-router-dom";
import nikeLogo from "assets/svg/nike.svg";
import pumaLogo from "assets/svg/puma.svg";
import supremeLogo from "assets/svg/supreme.svg";
import marsLogo from "assets/svg/mars.svg";
import shoeiLogo from "assets/svg/shoei.svg";
import hushLogo from "assets/svg/hush.svg";
import ProductService from "service/ProductService/ProductService";
import ProductCard from "shared/components/ProductCard/ProductCard";
import { IProduct } from "view/app-components/ShopPage/ShopPage";
import img from "assets/no-img.png";

export default function MainPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [limit, setLimit] = useState(5);

    function setProductLimit() {
        if (window.innerWidth > 1352) {
            setLimit(5);
        }
        if (window.innerWidth <= 1352) {
            setLimit(6);
        }
    }

    window.onresize = () => setProductLimit();

    useEffect(() => {
        setProductLimit();
        (async () => {
            const PRODUCT_SREVICE = new ProductService();
            const url = `filter=variants.prices.discounted:exists&limit=${limit}`;
            const response = (await PRODUCT_SREVICE.getProductURL(url)).data;
            setProducts([...response.results]);
        })();
    }, [limit]);

    return (
        <main className="container">
            <section className="main-part">
                <div className="main-part__bg-img" />
                <div className="main-part__info">
                    <Text classes={["inter-600-font", "font-size_m"]}>New Arrivals</Text>
                    <Text classes={["space-grotesk-500-font", "font-size_heading-3", "page-title"]}>
                        Create your dream shop instantly.
                    </Text>
                    <Text classes={["inter-400-font", "font-size_l"]}>
                        Keep your everyday style chic and on-trend with our selection 20+ styles to
                        choose from.
                    </Text>
                    <NavLink to="/shop">
                        <Button
                            type="button"
                            text="See Collection"
                            textClasses={["space-grotesk-500-font", "font-size_l", "color_white"]}
                            buttonClasses="button"
                        />
                    </NavLink>
                </div>
            </section>
            <section className="categories-cards">
                <div className="categories-cards__item" id="categories-cards__item-1">
                    <div className="categories-cards__item-text">
                        <Text
                            classes={[
                                "space-grotesk-500-font",
                                "font-size_heading-5",
                                "color_black",
                            ]}
                        >
                            T-Shirts
                        </Text>
                        <Link to="/shop/t-shirt">Explore →</Link>
                    </div>
                </div>
                <div className="categories-cards__item" id="categories-cards__item-2">
                    <div className="categories-cards__item-text">
                        <Text
                            classes={[
                                "space-grotesk-500-font",
                                "font-size_heading-5",
                                "color_black",
                            ]}
                        >
                            Sneakers
                        </Text>
                        <Link to="/shop/sneakers">Explore →</Link>
                    </div>
                </div>
                <div className="categories-cards__item" id="categories-cards__item-3">
                    <div className="categories-cards__item-text">
                        <Text
                            classes={[
                                "space-grotesk-500-font",
                                "font-size_heading-5",
                                "color_black",
                            ]}
                        >
                            Slippers
                        </Text>
                        <Link to="/shop/slippers">Explore →</Link>
                    </div>
                </div>
            </section>
            <section className="sale-products">
                <Text
                    classes={[
                        "sale-products__title",
                        "space-grotesk-500-font",
                        "font-size_xl",
                        "color-black",
                    ]}
                >
                    Sale products
                </Text>
                <div className="sale-products__wrapper">
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
                                              product.masterVariant.prices[0].value.centAmount / 100
                                          }`
                                        : ""
                                }`}
                            />
                        </Link>
                    ))}
                </div>
            </section>
            <section className="brands-banner">
                <div className="brands-banner__wrapper">
                    <div className="brands-banner__left-side">
                        <Text
                            classes={[
                                "space-grotesk-500-font",
                                "font-size_heading-4",
                                "color-black",
                            ]}
                        >
                            Loved brands
                        </Text>
                        <Text classes={["inter-400-font", "font-size_m", "color_blue-dark"]}>
                            At vero et accusamus et iusto odio dignissimos ducimus qui blanditiis
                            deleniti atqu.
                        </Text>
                        <Link className="space-grotesk-500-font color-black color_black" to="/shop">
                            See all brands
                        </Link>
                    </div>
                    <div className="brands-banner__right-side">
                        <img src={nikeLogo} alt="nike-logo" />
                        <img src={hushLogo} alt="hush-logo" />
                        <img src={pumaLogo} alt="puma-logo" id="puma-logo" />
                        <img src={shoeiLogo} alt="shoei-logo" />
                        <img src={marsLogo} alt="mars-logo" />
                        <img src={supremeLogo} alt="supreme-logo" />
                    </div>
                </div>
            </section>
        </main>
    );
}
