/* eslint-disable @typescript-eslint/no-unused-vars,react/require-default-props */
import React, { useState } from "react";
import ProductSwiper from "view/app-components/ProductPage/ProductSwiper";
import ProductBody from "view/app-components/ProductPage/ProductBody";
import useGetProductDate from "view/app-components/ProductPage/useGetProductDate";
import { useParams } from "react-router-dom";
import useGetProductBasketData from "view/app-components/ProductPage/useGetProductBasketData";

function ProductPage() {
    const { productId } = useParams();
    const [checkedSize, setCheckedSize] = useState(0);

    const { productData } = useGetProductDate(productId);

    const { basketQuantity, productVariantState, setProductVariantState, lineItemId } =
        useGetProductBasketData(checkedSize + 1, productId);

    return productData ? (
        <div className="product__container">
            <div className="swiper__container-two">
                <ProductSwiper productResponse={productData} />
            </div>
            <ProductBody
                productResponse={productData}
                checkedSize={checkedSize}
                basketQuantity={basketQuantity}
                lineItemId={lineItemId}
                setCheckedSize={setCheckedSize}
                productVariantState={productVariantState}
                setProductVariantState={setProductVariantState}
            />
        </div>
    ) : (
        <div />
    );
}

export default ProductPage;
