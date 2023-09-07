import React from "react";
import Text from "shared/components/Text/text";

interface IProductCardType extends React.ComponentPropsWithRef<"div"> {
    img: string;
    title: string;
    description: string;
    sale: boolean;
    price: string;
    discountPrice: string;
}

export default function ProductCard({
    img,
    title,
    description,
    price,
    discountPrice,
    sale,
    ...rest
}: IProductCardType) {
    return (
        <div className="product-card" {...rest}>
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
                        classes={["inter-400-font", "font-size_l", "color_grey", "discount-price"]}
                    >
                        {discountPrice}
                    </Text>
                </div>
            </div>
        </div>
    );
}
