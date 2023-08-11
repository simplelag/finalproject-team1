import React, {useEffect, useState} from 'react';
import axios from "axios";

function BookDetailPage() {
    const [BookIsbn,setBookIsbn] = useState('');
    const [BookInfo,setBookInfo] = useState([]);
    const [Booktitle,setBooktitle] = useState('해리포터');
    const [Booksubtitle,setBooksubtitle] = useState('');
    const [autohr,setauthor] = useState('');
    const [Bookpublisher,setBookpublisher] = useState('');
    const [pubdate,setpubdate] = useState('');
    const [pricestandard,setpricestandard] = useState('');
    const [cover,setcover] = useState('');


    useEffect(() =>{
        axios.get('http://localhost:8080/searchNoType',{
            params:{
                SearchType: BookIsbn
            }
        })
            .then(res => {
                setBookInfo(res.data);


            })
            .catch(error => {
                console.log('Error fetching book data',error)
            })
    },[]);
    return (
        <div className={"container"}>
            <div className={"left mt-5"}>
                <ul style={{listStyleType: "none"}}>
                    <li>
                        <div>
                            <a href="#" className={"text-decoration-none ms-2"} style={{color: "black"}}>책 제목:</a>
                            "-"
                            <span className={"text-decoration-none"} style={{color: "black"}}>책 부제목</span>
                        </div>
                    </li>
                    <li className={"mt-2"}>
                        <a href="#" className={"text-decoration-none ms-2"} style={{color: "black"}}>지은이</a>
                        <a href="#" className={"text-decoration-none ms-2"} style={{color: "black"}}>지은이+2</a>
                        <a href="" className={"text-decoration-none ms-2"} style={{color: "black"}}>지은이+3</a>
                        <a href="" className={"text-decoration-none ms-2"} style={{color: "black"}}>출판사</a>
                        <a href="" className={"text-decoration-none ms-2"} style={{color: "black"}}>출판일</a>
                    </li>
                </ul>
            </div>
            <hr/>
            <div className={"row"}>
                <div className={"col-sm-3"}>
                    <a href="#">
                        <img src="#" alt="이미지 나오는 곳"/>
                    </a>
                </div>
                <div className={"col-sm-6"}>
                    <div className={""} id={"info"}>
                        <div id={"infolist"}>
                            <ul style={{listStyleType:"none"}}>
                                <li>
                                    <span>새 상품 정가</span>
                                    <span className={"ms-2"}>18,000원</span>
                                </li>
                                <li className={"mt-2"}>
                                    <span>새 상품 판매가</span>
                                    <span className={"ms-2"}>18,000원</span>
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
                    <br/>
                    <br/>
                    <button className={"btn btn-primary"}>판매 등록</button>
                    <button className={"btn btn-success mt-3"}>중고 알림</button>
                </div>
            </div>
        </div>
    )
}

export default BookDetailPage;