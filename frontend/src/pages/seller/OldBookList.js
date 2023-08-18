import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";


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
                const data = res.data;
                if(res.data.length == 0){
                }
                else {
                    setOldBookInfo(res.data);
                }
            })
    }, []);
    const save = (index) =>{
        console.log("index:", index);
        console.log("oldBookInfo:", oldBookInfo);
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
                    console.log("등록이 완료되었습니다.", response)
                })
                .catch(error => {
                    // 등록 중에 오류가 발생했을 때의 처리
                    console.error("등록 중 오류 발생:", error);
                });
    }
    }

    return (

        <div className={"container mt-5"}>
            {oldBookInfo.map((book,index) => (
                <div className={"row"} key={book.salePk}>
                    <div className={"col-sm-3"}>
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
                                <p>남은 재고 :{book.saleBookPieces} 개</p>
                                <p style={{fontSize:"9pt"}}>평균 출고일 5일 이내</p>
                            </li>
                        </ul>
                    </div>
                    <div className={"col-sm-1"}>
                        <p>등급 : {book.bookGrade}</p>
                    </div>
                    <div className={"col-sm-1"}>
                        <span>판매가격 : {book.saleBookPrice}</span>
                    </div>
                    <div className={"col-sm-2"}>
                        <span>판매자 이름 : {book.saleSellerName}</span>
                    </div>
                    <div className={"col-sm-2"}>
                        <a href="#"className={"btn btn-link bg-dark"} style={{fontSize:"10pt",color:"white",textDecoration:"none",width:"100pt"}} onClick={() => save(index)}>장바구니 담기</a>
                        <a href="#"className={"btn btn-link bg-dark"} style={{fontSize:"10pt",color:"white",textDecoration:"none", width:"100pt"}}>바로 구매</a>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default OldBookList;