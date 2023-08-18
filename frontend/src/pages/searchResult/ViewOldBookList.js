
import React, {useEffect, useState} from "react";


import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";

function ViewOldBookList(props) {
    const [oldBookInfo, setOldBookInfo] = useState([]);
    const navi = useNavigate();
    const style = {
        box: {
            width: '152px',
            height: '215px',
        },
        img: {
            width: '152px',
            height: '215px'
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8080/searchOldBook', {
        })
            .then(res => {
                console.log(res.data)
                setOldBookInfo(res.data)
            })
    }, [])
    const gotoDetail = (saleBookId) =>{
        navi("/bookDetailPage", {state: {ISBN13 : saleBookId }});
    }
    const save = (index) =>{
        if(sessionStorage.getItem("id") === null){
            alert("로그인 해주세요!")
            navi("/login");
        }
        else {
            const requestData = {
                basketSalePk: oldBookInfo[index].salePk,
                basketMemberId: sessionStorage.getItem("id"),
                basketBookId: oldBookInfo[index].saleBookId,
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
        <div className={'container'}>
            <Header/>

            {oldBookInfo.map((info,index) =>(
                <div className={'row mt-5'} key={info.salePk}>
                    <div className={'col-sm-auto'} style={style.box}>
                        <img src={info.saleImgSrc} style={style.img} />
                    </div>
                    <div className={'col-sm-5 my-3'}>
                        <div>
                            <a href={'#'} className={"text-decoration-none ms-3"} style={{color:"black"}} onClick={() => gotoDetail(info.saleBookId)} >책 제목:{info.saleBookTitle}</a>
                        </div>
                        <div>
                            <span>
                                <p className={" ms-3 mt-3"} style={{color:"black"}}>판매자 : {info.saleSellerName}</p>
                                <p className={"ms-3"} style={{color:"black"}}>판매자 ID : {info.saleSellerId}</p>
                                <p className={"ms-3"}>판매자 설명 : {info.saleDiscription}</p>
                                <p className={"ms-3"}>책 품질 : {info.bookGrade}등급</p>
                            </span>
                        </div>
                    </div>
                        <div className={"col-sm text-end my-3"}>
                            <button type={'button'} className={'btn btn-dark'} onClick={() => save(index)}> 장바구니에 넣기 </button>
                            <button type={'button'} className={'btn btn-dark'}> 즉시 구매하기 </button>
                        </div>
                        <div className={'d-flex'}>
                            <table className={'table'}>
                                <thead>
                                    <tr className={'text-center'}>
                                        <th>판매 가격 : </th>
                                        <th>판매 수량 : </th>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr className={'text-center'}>
                                    <td>{info.saleBookPrice}원</td>
                                    <td>{info.saleBookPieces}개</td>
                                </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
                ))}
            {/*<Pagenation*/}
            {/*    setList={setOldBookInfo}*/}
            {/*    url= {oldBookInfo}*/}
            {/*    numberUrl= {oldBookInfo.length}*/}
            {/*    howManyContentsInAPage={10}*/}
            {/*    howManyPagesInABlock={5}*/}
            {/*    searchType={[]}*/}
            {/*    order="boardPk,DESC"*/}
            {/*/>*/}
            <Footer/>

        </div>
    )
}

export default ViewOldBookList;