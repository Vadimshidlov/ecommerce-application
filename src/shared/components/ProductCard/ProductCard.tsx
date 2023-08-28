import React from "react";
import Text from "shared/components/Text/text";

interface IProductCardType extends React.ComponentPropsWithRef<"div"> {
    img: string;
    title: string;
    price: string;
    discountPrice: string;
}

export default function ProductCard({
    img,
    title,
    price,
    discountPrice,
    ...rest
}: IProductCardType) {
    return (
        <div className="product-card" {...rest}>
            <div className="product-card__img-wrapper">
                <img src={img} alt="product-card" />
            </div>
            <div className="product-card__info">
                <Text classes={["space-grotesk-500-font", "font-size_m", "color_black"]}>
                    {title}
                </Text>
                <div className="product-card__price">
                    <Text classes={["space-grotesk-500-font", "font-size_s", "color_black"]}>
                        {price}
                    </Text>
                    <Text
                        classes={[
                            "space-grotesk-500-font",
                            "font-size_s",
                            "color_grey",
                            "discount-price",
                        ]}
                    >
                        {discountPrice}
                    </Text>
                </div>
            </div>
        </div>
    );
}
