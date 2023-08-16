import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import OldBookList from "./OldBookList";
import {useLocation, useNavigate} from "react-router-dom";
import props from "sockjs-client/lib/event/trans-message";

function BookDetailPage(props) {
    const [BookInfo,setBookInfo] = useState([]);

    const onClickSell = (e) => {
        navi("/sellerPage", {state: {ISBN13: location.state.ISBN13}});
    }
    const location = useLocation();
    const navi = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/searchIsbn",{
            params: {
                ISBN13 : location.state.ISBN13
            }
        })
            .then(res => {
                setBookInfo(res.data.item[0]);

            })
            .catch(err => {
                alert("페이지 로딩 오류")
            })
    },[]);


    return (
        <main>
            <Header/>
            <div className={"left mt-5"}>
                <ul style={{listStyleType: "none"}}>
                    <li>
                        <div>
                        <a href="#" className={"text-decoration-none ms-2"} style={{color: "black"}}>책 제목:{BookInfo.title}</a>
                        </div>
                    </li>
                    <li className={"mt-2"}>
                        <a href="#" className={"text-decoration-none ms-2"} style={{color: "black"}}>지은이:{BookInfo.author}</a>
                        <a href="#" className={"text-decoration-none ms-2"} style={{color: "black"}}>출판사:{BookInfo.publisher}</a>
                        <a href="#" className={"text-decoration-none ms-2"} style={{color: "black"}}>출판일:{BookInfo.pubDate}</a>
                    </li>
                </ul>
            </div>
            <hr/>
            <div className={"row"}>
                <div className={"col-sm-3"}>
                    <a href="#"><img src={BookInfo.cover} alt="이미지 나오는 곳"/></a>
                </div>
                <div className={"col-sm-6"}>
                    <div className={""} id={"info"}>
                        <div id={"infoList"}>
                            <ul style={{listStyleType:"none"}}>
                                <li>
                                    <span>새 상품 정가</span>
                                    <span className={"ms-2"}>{BookInfo.priceStandard}</span>
                                </li>
                                <li className={"mt-2"}>
                                    <span>새 상품 판매가</span>
                                    <span className={"ms-2"}>{BookInfo.priceSales}</span>
                                </li>
                            </ul>
                            <ul style={{listStyleType:"none"}}>
                                <li>
                                    <span>중고 도서 최고가</span>
                                    <span className={"ms-2"}>원</span>
                                </li>
                                <li className={"mt-2"}>
                                    <span>중고 도서 최저가</span>
                                    <span className={"ms-2"}>원</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={"col-sm-3"}>
                    <button className={"btn btn-dark mt-2"} onClick={onClickSell}> 판매 등록</button>
                    <button className={"btn btn-success mt-3"}>중고 알림</button>
                </div>
            </div>
            <OldBookList/>
            <Footer/>
        </main>
    )

}


export default BookDetailPage;