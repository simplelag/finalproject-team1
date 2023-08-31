import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import OldBookList from "./OldBookList";
import {useLocation, useNavigate} from "react-router-dom";
import Review from "../review/review/Review";

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
                const noInfo = {
                    title:"",
                    author:"",
                    publisher:"",
                    pubDate:"",
                    categoryName:"",
                    priceStandard:"",
                    description:"도서정보를 찾을 수 없습니다."
                }
                setBookInfo(noInfo)
            })
    },[]);


    return (
        <Fragment>
            <Header/>
            <main className={"container"}>

                <div className={"left mt-5"}>
                    <ul style={{listStyleType: "none"}}>
                        <li>
                            <a className={"text-decoration-none"} style={{color: "black",fontSize:"20pt"}}>{BookInfo.title}</a>
                        </li>
                        <li className={"mt-2"}>
                            <a className={"text-decoration-none"} style={{color: "black",fontSize:"10pt"}}>지은이: {BookInfo.author}</a>
                            <a className={"text-decoration-none ms-2"} style={{color: "black"}}>출판사: {BookInfo.publisher}</a>
                            <a className={"text-decoration-none ms-2"} style={{color: "black"}}>출판일: {BookInfo.pubDate}</a>
                        </li>
                    </ul>
                </div>
                <hr/>
                <div className={"row"}>
                    <div className={"col-sm-2"}>
                        <img src={BookInfo.cover} className={"ms-2"}  alt="이미지 나오는 곳"/>
                    </div>
                    <div className={"col-sm mx-2"}>
                        <div className={""} id={"info"}>
                            <div id={"infoList"}>
                                <span>{BookInfo.categoryName}</span>
                                <br/>
                                {
                                    !BookInfo.title=="" &&  <span className={"mt-2"}>새 상품 정가 : {BookInfo.priceStandard}원</span>
                                }

                                <div className={"mt-3"}>
                                    <span style={{fontSize:"13pt"}}>{BookInfo.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-2 text-center"}>
                        {
                            !BookInfo.title=="" &&
                            <button className={"btn btn-dark mb-2"} onClick={onClickSell}> 판매 등록</button>
                        }

                    </div>
                </div>
                <hr/>
                <h3 className={"ms-3 my-2"}>중고서적 판매</h3>
                {

                }
                {
                    <OldBookList/>
                }
                {
                    BookInfo && <Review reviewIsbn13={location.state.ISBN13} />
                }
            </main>
            <Footer/>
        </Fragment>


    )

}


export default BookDetailPage;