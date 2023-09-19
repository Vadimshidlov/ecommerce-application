/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
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
import promoImg1 from "assets/promocode1.png";
import promoImg2 from "assets/promocode2.png";
import BasketService from "service/BasketService/BasketService";
import Loader from "shared/components/Loader/Loader";
import { promocodeCopy } from "shared/utils/notifyMessages";
// import StorageStore from "store/StorageStore";

// interface IProductResponce {
//     count: number;
//     limit: number;
//     offset: number;
//     total: number;
//     results:
// }

const BASKET_SERVICE: BasketService = new BasketService();
const PRODUCT_SREVICE: ProductService = new ProductService();

export default function MainPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [productsInCart, setProductsInCart] = useState<string[]>([]);
    const [isLoad, setIsLoad] = useState<boolean>(true);

    // console.log(StorageStore.getAnonymousAccessToken());

    // const [limit, setLimit] = useState<number>(5);

    // function setProductLimit() {
    //     if (window.innerWidth > 1352) {
    //         setLimit(5);
    //     }
    //     if (window.innerWidth <= 1352) {
    //         setLimit(6);
    //     }
    // }
    // setProductLimit();

    // window.onresize = (): void => setProductLimit();

    useEffect(() => {
        const limit = window.innerWidth > 1352 ? 5 : 6;
        setIsLoad(true);
        const intervalId = setInterval(async () => {
            if (localStorage.length >= 5) {
                (async (): Promise<void> => {
                    const url = `filter=variants.prices.discounted:exists&limit=${limit}`;
                    const response = (await PRODUCT_SREVICE.getProductURL(url)).data;
                    setProducts([...response.results]);
                })();
                (async function getProductsInCart() {
                    const { lineItems } = await BASKET_SERVICE.getCartById();
                    const productId = lineItems.map((product) => product.productId);
                    setProductsInCart(productId);
                })();

                setIsLoad(false);
                clearInterval(intervalId);
            }
        }, 100);
    }, []);

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
                    <Link to="/shop/t-shirt">
                        <div className="categories-cards__item-text">
                            <Text
                                classes={[
                                    "space-grotesk-500-font",
                                    "font-size_heading-5",
                                    "color_black",
                                    "categories-cards__item-title",
                                ]}
                            >
                                T-Shirts
                            </Text>
                            <Text
                                classes={[
                                    "space-grotesk-500-font",
                                    "font-size_m",
                                    "color_grey-dark",
                                ]}
                            >
                                Explore →
                            </Text>
                        </div>
                    </Link>
                </div>
                <div className="categories-cards__item" id="categories-cards__item-2">
                    <Link to="/shop/sneakers">
                        <div className="categories-cards__item-text">
                            <Text
                                classes={[
                                    "space-grotesk-500-font",
                                    "font-size_heading-5",
                                    "color_black",
                                    "categories-cards__item-title",
                                ]}
                            >
                                Sneakers
                            </Text>
                            <Text
                                classes={[
                                    "space-grotesk-500-font",
                                    "font-size_m",
                                    "color_grey-dark",
                                ]}
                            >
                                Explore →
                            </Text>
                        </div>
                    </Link>
                </div>
                <div className="categories-cards__item" id="categories-cards__item-3">
                    <Link to="/shop/slippers">
                        <div className="categories-cards__item-text">
                            <Text
                                classes={[
                                    "space-grotesk-500-font",
                                    "font-size_heading-5",
                                    "color_black",
                                    "categories-cards__item-title",
                                ]}
                            >
                                Slippers
                            </Text>
                            <Text
                                classes={[
                                    "space-grotesk-500-font",
                                    "font-size_m",
                                    "color_grey-dark",
                                ]}
                            >
                                Explore →
                            </Text>
                        </div>
                    </Link>
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
                    Discounted products
                </Text>
                {isLoad && <Loader />}
                <div className="sale-products__wrapper">
                    {products.map((product) => (
                        <ProductCard
                            product={product}
                            isInBasket={productsInCart.includes(product.id)}
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
                                    ? product.masterVariant.prices[0].discounted.value.centAmount /
                                      100
                                    : product.masterVariant.prices[0].value.centAmount / 100
                            }`}
                            discountPrice={`${
                                product.masterVariant.prices &&
                                product?.masterVariant?.prices[0]?.discounted
                                    ? `$${product.masterVariant.prices[0].value.centAmount / 100}`
                                    : ""
                            }`}
                        />
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
            <section className="promocode">
                <img
                    src={promoImg2}
                    alt="promokod"
                    className="promocode__item"
                    onClick={() => {
                        navigator.clipboard.writeText("DELIVERY12");
                        promocodeCopy();
                    }}
                    onKeyDown={() => {}}
                />
                <img
                    src={promoImg1}
                    alt="promokod"
                    className="promocode__item"
                    onClick={() => {
                        navigator.clipboard.writeText("SALE15");
                        promocodeCopy();
                    }}
                    onKeyDown={() => {}}
                />
            </section>
        </main>
    );
}
