import React, {useEffect, useState} from "react";

const swiperSlide = {
    slide: {
        width: '500px',
        height: '600px'
    },
    img: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
}

function MainEventCarousel(props) {

    useEffect(() => {
        if (document.querySelector(
            'script[src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"]'
        ))
            return;

        const script = document.createElement("Script");
        script.src = "https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);


    return (
        <swiper-container className="mySwiper" pagination="true" pagination-dynamic-bullets="true">
            <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img}/></swiper-slide>
            <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img}/></swiper-slide>
            <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img}/></swiper-slide>
            <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img}/></swiper-slide>
            <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img}/></swiper-slide>
        </swiper-container>
    );
}

export default MainEventCarousel;