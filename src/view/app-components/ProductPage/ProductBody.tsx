/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ProductResponseType } from "view/app-components/ProductPage/ProductPage";

export type ProductBodyType = {
    productResponse: ProductResponseType;
};

function ProductBody({ productResponse }: ProductBodyType) {
    const productColor = productResponse.masterVariant.attributes[1].value.key;
    const productColorClass = `product__color product__color__${productColor}`;
    const productSize = productResponse.masterVariant.attributes[0].value.key;

    return (
        <div>
            <h2 className="product__name">{productResponse.name["en-US"]}</h2>
            <div className="product__description">{productResponse.description["en-US"]}</div>
            <div className="product__price">
                ${productResponse.masterVariant.prices[0].value.centAmount / 100}
            </div>
            <span className="product__color__title">Color:</span>
            <div className="product__colors">
                <div className={productColorClass} />
            </div>
            <span className="product__color__title">Size:</span>
            <div className="product_sizes">
                <div className="product__size">{productSize}</div>
                <div className="product__size">{productSize}</div>
                <div className="product__size">{productSize}</div>
                <div className="product__size">{productSize}</div>
                <div className="product__size">{productSize}</div>
            </div>
        </div>
    );
}

export default ProductBody;
