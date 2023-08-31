import React, {useEffect, useState} from "react";

const swiperSlide = {
    slide: {
        width: '1000px',
        height: '500px'
    },
    img: {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
}

function MainEventCarousel(props) {

    // 스크립트 생성
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
        <div className={'my-3'}>
            <swiper-container className="mySwiper" pagination="true" pagination-dynamic-bullets="true" loop="true" autoplay="true">
                <swiper-slide style={swiperSlide.slide}><img src="/image/event1.jpg" style={swiperSlide.img}/></swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/event2.jpg" style={swiperSlide.img}/></swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/event3.jpg" style={swiperSlide.img}/></swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/event4.jpg" style={swiperSlide.img}/></swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/event5.jpg" style={swiperSlide.img}/></swiper-slide>
            </swiper-container>
        </div>
    );
}

export default MainEventCarousel;