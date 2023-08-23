import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";
import MailOpenButton from "../common/MailOpenButton";


function OldBookList() {
    const location = useLocation();
    const [oldBookInfo, setOldBookInfo] = useState([]);
    const navi = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/oldBookInfo',{
            params:{
                ISBN13:location.state.ISBN13
            }
        })
            .then(res =>{
                setOldBookInfo(res.data)
            })
    }, []);

    const save = (index) =>{
        if(sessionStorage.getItem("id") === null){
            alert("로그인 해주세요!")
            navi("/login");
        }
        else {
            const requestData = {
                basketSalePk: oldBookInfo[index].salePk,
                basketMemberId: sessionStorage.getItem("id"),
                basketBookId: location.state.ISBN13,
                basketBookPrice: oldBookInfo[index].saleBookPrice,
                basketBookCover: oldBookInfo[index].saleImgSrc,
                basketBookTitle: oldBookInfo[index].saleBookTitle,
                basketBookPieces: oldBookInfo[index].saleBookPieces
            }
            axios.post("http://localhost:8080/saveShoppingBaskest", requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    alert("등록 성공!")
                })
                .catch(error => {
                    // 등록 중에 오류가 발생했을 때의 처리
                });
        }
    }

    // 구매 버튼 눌렀을때 발생하는 이벤트(구매 페이지로 이동)
    const handleInPurchase = (index) => {
        axios.get('http://localhost:8080/purchase/insert',{
            params:{
                ISBN13: oldBookInfo[index].saleBookId,
                BookName: oldBookInfo[index].saleBookTitle,
                BuyerId: sessionStorage.getItem("id"),
                BuyerName: sessionStorage.getItem("name"),
                SellerId: oldBookInfo[index].saleSellerId,
                SellerName: oldBookInfo[index].saleSellerName,
                SellerPrice: oldBookInfo[index].saleBookPrice
            }
        })
            .then(res => {

            })
    }

    return (
        <div className={"container my-3"}>
            {
                oldBookInfo.length == 0 ? <p className={"text-center"}><strong>등록된 중고도서가 없습니다</strong></p>
                    :
                oldBookInfo.map((book,index) => {
                    return (
                        <div className={"row my-2"} key={book.salePk}>
                            <div className={"col-sm-2"}>
                                <a href="#">
                                    <img src={book.saleImgSrc} alt="이미지 나오는 곳"/>
                                </a>
                            </div>
                            <div className={"col-sm-3"}>
                                <ul style={{listStyleType:"none"}}>
                                    <li>
                                        <p><strong>[중고]{book.saleBookTitle}</strong></p>
                                    </li>
                                    <li>
                                        <p>남은 재고 : {book.saleBookPieces}개</p>
                                        <p style={{fontSize:"9pt"}}>평균 출고일 5일 이내</p>
                                    </li>
                                </ul>
                            </div>
                            <div className={"col-sm-1"}>
                                <p>등급 : {book.bookGrade}</p>
                            </div>
                            <div className={"col-sm-2"}>
                                <span>판매 중고가격 : {book.saleBookPrice}원</span>
                            </div>
                            <div className={"col-sm-2"}>
                                <span>판매자 : {book.saleSellerName}</span>
                            </div>
                            <div className={"col-sm-2 text-center"}>
                                <a href="#"className={"btn btn-link bg-dark mb-2"} style={{fontSize:"10pt",color:"white",textDecoration:"none",width:"100pt"}} onClick={() => save(index)}>장바구니 담기</a>
                                <a href="/purchase" className={"btn btn-link bg-dark"} style={{fontSize:"10pt",color:"white",textDecoration:"none", width:"100pt"}} onClick={() => handleInPurchase(index)}>바로 구매</a>
                                {book.saleSellerId==sessionStorage.getItem("id")? null:
                                    <MailOpenButton room={book.salePk+"_"+sessionStorage.getItem("id")} name={"판매자문의"} />
                                }

                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default OldBookList;