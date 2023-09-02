import React, { useState } from "react";
import ProductSwiper from "view/app-components/ProductPage/ProductSwiper";
import ProductBody from "view/app-components/ProductPage/ProductBody";
import useGetProductDate from "view/app-components/ProductPage/useGetProductDate";

function ProductPage() {
    const productData = useGetProductDate();
    const [checkedSize, setCheckedSize] = useState(0);

    return productData ? (
        <div className="product__container">
            <div className="swiper__container-two">
                <ProductSwiper productResponse={productData} />
            </div>
            <ProductBody
                productResponse={productData}
                checkedSize={checkedSize}
                setCheckedSize={setCheckedSize}
            />
        </div>
    ) : (
        <div />
    );
}

export default ProductPage;
