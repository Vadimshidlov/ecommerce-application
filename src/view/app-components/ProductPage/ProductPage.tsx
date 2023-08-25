import React from "react";
import ProductSwiper from "view/app-components/ProductPage/ProductSwiper";

function ProductPage() {
    return (
        <div className="product__container">
            <div className="product__info">
                <ProductSwiper />
                <div>PrdouctInfoComponent</div>
            </div>
        </div>
    );
}

export default ProductPage;
