import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

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
        overflow:"hidden",
    }
}

function MainCardCarousel(props) {

    const [bookList, setBookList] = useState([]);
    const navi = useNavigate();

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

    useEffect(() => {
        axios.get('http://localhost:8080/api', {
            params: {
                Type: props.type,
                MaxResults: "10"
            }
        })
            .then(res => {
                setBookList(res.data.item);
            })
    }, [])


    return (
        <div className={'my-3'}>
            <h1 className={'ms-5'}>{props.title}</h1>
            <swiper-container className="mySwiper" slides-per-view="4" space-between="30" navigation="true" loop="true">
                {
                    bookList.map(itemList => {
                        return (
                            <swiper-slide style={swiperSlide.slide} key={itemList.isbn13}>
                                <div onClick={() => {
                                    navi("/bookDetailPage", {state: {ISBN13: itemList.isbn13}})
                                    }
                                }>
                                    <div style={swiperSlide.img}>
                                        <img className={"bookImg"} src={itemList.cover}  />
                                    </div>
                                    <span>{itemList.title}</span>
                                </div>
                            </swiper-slide>
                        )
                    })
                }
            </swiper-container>
        </div>
    )
}

export default MainCardCarousel;