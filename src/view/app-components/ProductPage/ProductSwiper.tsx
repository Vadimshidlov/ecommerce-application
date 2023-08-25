import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/scrollbar";

const imagesList: string[] = [
    "https://a.lmcdn.ru/img600x866/R/T/RTLACY005601_20921413_1_v1_2x.jpg",
    "https://a.lmcdn.ru/img600x866/R/T/RTLACY005601_20921414_2_v1_2x.jpg",
    "https://a.lmcdn.ru/img600x866/R/T/RTLACY005601_20921415_3_v1_2x.jpg",
];

function ProductSwiper() {
    return (
        <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            loop
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="swiper-width"
        >
            {imagesList.map((image, index) => (
                <SwiperSlide key={image}>
                    <img src={image} alt={String(index)} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ProductSwiper;
