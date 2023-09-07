/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Scrollbar } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import { ProductResponseType } from "view/app-components/ProductPage/types";

export type ProductSwiperType = {
    productResponse: ProductResponseType;
    isSale: boolean;
};

function ProductSwiper({ productResponse, isSale }: ProductSwiperType) {
    const imagesList: string[] = [];
    productResponse?.masterVariant.images.forEach((imageUrl) => imagesList.push(imageUrl.url));
    const [modalVersion, setModalVersion] = useState(false);

    return (
        <div className={modalVersion ? "swiper__container__modal" : "swiper__container"}>
            <div
                className="swiper__close-btn"
                hidden={!modalVersion}
                onClick={() => {
                    if (modalVersion) {
                        setModalVersion((currentVersion) => !currentVersion);
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        if (modalVersion) {
                            setModalVersion((currentVersion) => !currentVersion);
                        }
                    }
                }}
            />
            <div className="swiper_modal-background" hidden={!modalVersion} />
            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                loop
                slidesPerView={1}
                autoHeight={false}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => {}}
                onSwiper={(swiper) => {}}
                breakpoints={{}}
            >
                {imagesList.map((image, index) => (
                    <SwiperSlide key={image}>
                        <div
                            onClick={() => {
                                if (!modalVersion) {
                                    setModalVersion((currentVersion) => !currentVersion);
                                }
                            }}
                            onKeyDown={() => {}}
                            className={
                                modalVersion
                                    ? "swiper__image-container__modal"
                                    : "swiper__image-container"
                            }
                        >
                            <img src={image} alt={String(index)} />
                        </div>
                    </SwiperSlide>
                ))}
                {isSale && <div className="sale__icon color_white inter-400-font">sale</div>}
            </Swiper>
        </div>
    );
}

export default ProductSwiper;
