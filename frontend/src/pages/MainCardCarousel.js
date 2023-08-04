import React, {useEffect, useState} from "react";

const swiperSlide = {
    slide: {
        width: '100%',
        height: '100%',
        textAlign: 'center'
    },
    img: {
        display: 'block',
        width: '200px',
        height: '300px',
        objectFit: 'cover',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}

function MainCardCarousel(props) {

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
            <h1 className={'ms-5'}>{props.title}</h1>
            <swiper-container className="mySwiper" slides-per-view="4" space-between="30" navigation="true" loop="true">
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
                <swiper-slide style={swiperSlide.slide}><img src="/image/1.png" style={swiperSlide.img} />책제목값 불러올 영역</swiper-slide>
            </swiper-container>
        </div>
    )
}

export default MainCardCarousel;