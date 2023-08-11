import React, {useState, useEffect} from 'react';
import MainEventCarousel from "./MainEventCarouel";
import Header from "./Header";
import MainCardCarousel from "./MainCardCarousel";
import Footer from "./Footer";
import axios from "axios";

function Main(props) {
    return (
        <div className={'container'}>
            <Header />
            <MainEventCarousel />
            <MainCardCarousel title={'베스트도서'} type={'Bestseller'} />
            <MainCardCarousel title={'새로 등록된 도서'} type={'ItemNewAll'} />
            <MainCardCarousel title={'추천 도서'} type={'ItemNewSpecial'} />
            <Footer />
        </div>
    );
}

export default Main;