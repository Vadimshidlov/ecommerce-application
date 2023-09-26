import React, { useState } from "react";
import BasketService from "service/BasketService/BasketService";
import { Link } from "react-router-dom";
import Text from "shared/components/Text/text";
import { Button } from "shared/components/button/Button";
import { IProduct } from "view/app-components/ShopPage/ShopPage";
import { addProductMessage } from "shared/utils/notifyMessages";
import { useBasketQuantity } from "providers/BasketItemsProvider";

interface IProductCardType extends React.ComponentPropsWithRef<"div"> {
    img: string;
    title: string;
    description: string;
    sale: boolean;
    price: string;
    discountPrice: string;
    product: IProduct;
    isInBasket: boolean;
    // eslint-disable-next-line react/require-default-props
    categoryKey?: string | undefined;
}

const BASKET_SERVICE = new BasketService();

export default function ProductCard({
    img,
    title,
    description,
    price,
    discountPrice,
    sale,
    product,
    isInBasket,
    categoryKey = undefined,
    ...rest
}: IProductCardType) {
    const [isInBasketState, setIsInBasketState] = useState(isInBasket);
    const { setQuantity } = useBasketQuantity();

    return (
        <div className="product-card" {...rest}>
            <Link
                className="product-card__wrapper"
                to={
                    categoryKey
                        ? `/shop/${categoryKey}/product/${product.id}`
                        : `/shop/product/${product.id}`
                }
            >
                {sale && <div className="sale__icon color_white inter-400-font">sale</div>}
                <div className="product-card__img-wrapper">
                    <img src={img} alt="product-card" />
                </div>
                <div className="product-card__info">
                    <Text classes={["space-grotesk-500-font", "font-size_m", "color_black"]}>
                        {title}
                    </Text>
                    <Text
                        classes={[
                            "space-grotesk-500-font",
                            "font-size_s",
                            "color_grey-dark",
                            "product-card__description",
                        ]}
                    >
                        {description}
                    </Text>
                    <div className="product-card__price">
                        <Text classes={["inter-600-font", "font-size_l", "color_blue-dark"]}>
                            {price}
                        </Text>
                        <Text
                            classes={[
                                "inter-400-font",
                                "font-size_l",
                                "color_grey",
                                "discount-price",
                            ]}
                        >
                            {discountPrice}
                        </Text>
                    </div>
                </div>
            </Link>
            <Button
                type="button"
                text={isInBasketState ? "Product in cart" : "Add to cart"}
                textClasses={["space-grotesk-500-font", "font-size_m", "color_white"]}
                buttonClasses={`button product-card__button ${
                    isInBasketState ? "product-card__button-inactive" : ""
                }`}
                onClick={() => {
                    if (!isInBasketState) {
                        setIsInBasketState(!isInBasketState);
                        BASKET_SERVICE.addProductToBasket(product.id, 1, 1);
                        addProductMessage();
                        setQuantity((prevState) => prevState + 1);
                    }
                }}
            />
        </div>
    );
}
