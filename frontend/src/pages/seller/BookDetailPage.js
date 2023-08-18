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
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={BookInfo.cover}
                            className="ms-5"
                            alt="이미지 나오는 곳"
                            style={{width:"300px",height:"400px"}}
                        />
                    </div>
                    <div className="col-md-6">
                        <a
                            href="#"
                            className="text-decoration-none"
                            style={{ color: 'black', fontSize: '20pt' }}
                        >
                            책 제목: {BookInfo.title}
                        </a>
                        <br />
                        <a
                            href="#"
                            className="text-decoration-none"
                            style={{ color: 'black', fontSize: '10pt' }}
                        >
                            지은이: {BookInfo.author}
                        </a>

                        <a
                            href="#"
                            className="text-decoration-none"
                            style={{ color: 'black' }}
                        >
                            출판사: {BookInfo.publisher}
                        </a>
                        <br />
                        <a
                            href="#"
                            className="text-decoration-none"
                            style={{ color: 'black' }}
                        >
                            출판일: {BookInfo.pubDate}
                        </a>
                        <br/>
                        <span>{BookInfo.categoryName}</span>
                        <br />
                        <span className="mt-3">새 상품 정가</span>
                        <span className="ms-3">{BookInfo.priceStandard}원</span>
                        <br/>
                        <br/>
                        <span style={{ fontSize: '13pt' }}>{BookInfo.description}</span>
                    </div>
                </div>
            </div>
            <div className="container d-flex justify-content-end">
                <div className="row">
                    <div className="col-md-10">
                        <button
                            className="btn btn-dark mt-2"
                            onClick={onClickSell}
                        >
                            판매 등록
                        </button>
                        <button className="btn btn-success mt-2">
                            중고 알림
                        </button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="container">
                <h2>중고 서적 판매</h2>
            </div>
            <OldBookList/>
            <Footer/>
        </main>
    )

}


export default BookDetailPage;