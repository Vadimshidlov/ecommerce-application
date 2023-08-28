/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Scrollbar } from "swiper/modules";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";
import { ProductBodyType } from "view/app-components/ProductPage/ProductBody";

function ProductSwiper({ productResponse }: ProductBodyType) {
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
                scrollbar={modalVersion}
                pagination={modalVersion ? false : { clickable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
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
                            onKeyDown={() => {
                                console.log("Swiper-container click");
                            }}
                            className="swiper__image-container"
                        >
                            <img src={image} alt={String(index)} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ProductSwiper;
