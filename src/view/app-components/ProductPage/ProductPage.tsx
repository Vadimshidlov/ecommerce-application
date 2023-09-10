/* eslint-disable @typescript-eslint/no-unused-vars,react/require-default-props */
import React, { useState } from "react";
import ProductSwiper from "view/app-components/ProductPage/ProductSwiper";
import ProductBody from "view/app-components/ProductPage/ProductBody";
import useGetProductDate from "view/app-components/ProductPage/useGetProductDate";
import { useParams } from "react-router-dom";

function ProductPage() {
    const { productId } = useParams();
    const {
        productData,
        isInBasket,
        setIsInBasketHandler,
        basketProductData,
        lineItemId,
        setLineItemId,
        basketQuantity,
    } = useGetProductDate(productId);

    const [checkedSize, setCheckedSize] = useState(0);

    return productData ? (
        <div className="product__container">
            <div className="swiper__container-two">
                <ProductSwiper productResponse={productData} />
            </div>
            <ProductBody
                productResponse={productData}
                checkedSize={checkedSize}
                basketQuantity={basketQuantity}
                isInBasket={isInBasket}
                lineItemId={lineItemId}
                setIsInBasketHandler={setIsInBasketHandler}
                setCheckedSize={setCheckedSize}
            />
        </div>
    ) : (
        <div />
    );
}

export default ProductPage;
