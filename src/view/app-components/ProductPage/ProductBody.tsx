/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ProductResponseType } from "view/app-components/ProductPage/ProductPage";

export type ProductBodyType = {
    productResponse: ProductResponseType;
};

function ProductBody({ productResponse }: ProductBodyType) {
    return (
        <div>
            <h2 className="product__name">{productResponse.name["en-US"]}</h2>
            <div className="product__description">{productResponse.description["en-US"]}</div>
            <div className="product__price">
                ${productResponse.masterVariant.prices[0].value.centAmount / 100}
            </div>
        </div>
    );
}

export default ProductBody;
