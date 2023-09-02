/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "shared/components/button/Button";
import plusButton from "assets/svg/Plus.svg";
import minusButton from "assets/svg/Minus.svg";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import { ProductResponseType } from "view/app-components/ProductPage/types";

export type ProductBodyType = {
    productResponse: ProductResponseType;
    checkedSize: number;
    setCheckedSize: (value: number) => void;
};

function ProductBody({ productResponse, checkedSize, setCheckedSize }: ProductBodyType) {
    let productColor: string = "";
    productResponse.masterVariant.attributes.forEach((variant) => {
        if (variant.name === "color") {
            productColor = variant.value.key;
        }
    });

    const productColorClass = `product__color product__color__${productColor}`;
    const productSizes = productResponse.variants.map(
        (productVariant) => productVariant.attributes[0].value.key,
    );
    const productDiscountPrice =
        productResponse.masterVariant.prices[0].discounted.value.centAmount / 100;
    const productPrice = productResponse.masterVariant.prices[0].value.centAmount / 100;
    const [productCount, setProductCount] = useState<number>(1);

    return (
        <div className="product__body">
            <h2 className="product__name">{productResponse.name["en-US"]}</h2>
            <div className="product__description">{productResponse.description["en-US"]}</div>
            <div className="product__price">
                {productDiscountPrice ? (
                    <div className="product__price-container">
                        <span className="product__price">${productDiscountPrice}</span>
                        <span className="product__price-old">{productPrice}</span>
                    </div>
                ) : (
                    <div className="product__price">${productPrice}</div>
                )}
            </div>
            <span className="product__color__title">Color:</span>
            <div className="product__colors">
                <div className={productColorClass} />
            </div>
            <span className="product__color__title">Size:</span>
            <ul className="product_sizes">
                {productSizes.map((productSize, index) => (
                    <button
                        onClick={() => {
                            setCheckedSize(index);
                        }}
                        onKeyDown={() => {
                            setCheckedSize(index);
                        }}
                        className={
                            index === checkedSize
                                ? "product__size product__size__active"
                                : "product__size"
                        }
                        key={productSize}
                    >
                        {productSize}
                    </button>
                ))}
            </ul>
            <div className="product__cart-count">
                <ButtonIcon
                    url={minusButton}
                    altText="icon-eye"
                    classes="product__cart-count__button-minus"
                    onClick={() => {
                        if (productCount > 1) {
                            setProductCount((prevState) => prevState - 1);
                        }
                    }}
                />
                <span>{productCount}</span>
                <ButtonIcon
                    url={plusButton}
                    altText="icon-eye"
                    classes="product__cart-count__button-plus"
                    onClick={() => setProductCount((prevState) => prevState + 1)}
                />
            </div>
            <Button
                type="submit"
                text="Add to Cart"
                textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                buttonClasses="button btn-full-width"
            />
        </div>
    );
}

export default ProductBody;
