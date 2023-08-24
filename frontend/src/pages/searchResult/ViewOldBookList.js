import React, {Fragment, useEffect, useState} from "react";


import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";
import MailOpenButton from "../common/MailOpenButton";

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
        axios.get('http://localhost:8080/searchOldBook', {})
            .then(res => {
                setOldBookInfo(res.data)
            })
    }, [])
    const gotoDetail = (saleBookId) => {
        navi("/bookDetailPage", {state: {ISBN13: saleBookId}});
    }
    const save = (index) => {
        if (sessionStorage.getItem("id") === null) {
            alert("로그인 해주세요!")
            navi("/login");
        } else {
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
                    navi("/")
                })
                .catch(error => {
                    // 등록 중에 오류가 발생했을 때의 처리
                });
        }
    }

    const handleInPurchase = (index) => {
        if (oldBookInfo[index].saleSellerId !== sessionStorage.getItem("id")) {
            axios.get('http://localhost:8080/purchase/insert', {
                params: {
                    ISBN13: oldBookInfo[index].saleBookId,
                    BookName: oldBookInfo[index].saleBookTitle,
                    BuyerId: sessionStorage.getItem("id"),
                    BuyerName: sessionStorage.getItem("name"),
                    SellerId: oldBookInfo[index].saleSellerId,
                    SellerName: oldBookInfo[index].saleSellerName,
                    SellerPrice: oldBookInfo[index].saleBookPrice,
                    saleBookPieces: oldBookInfo[index].saleBookPieces
                }
            })
                .then(res => {
                    let a = new Array();
                    a.push(res.data.purchaseNumber)
                    if (oldBookInfo[index].saleBookPieces === 0) {
                        alert("재고가 없습니다.")
                    } else if (res.data.purchaseState === 1) {
                        alert("이미 구입한 책입니다.")
                    } else {
                        navi("/purchase", {
                            state: {
                                value: res.data,
                                number: [oldBookInfo[index].saleBookPieces],
                                number1: a
                            }
                        })
                    }
                })
        } else {
            alert('자기가 판매한 책은 구입할 수 없습니다.')
        }
    }

    return (
        <Fragment>
            <Header/>
            <main className={'container'}>

                {
                    oldBookInfo.map((info, index) => {
                        return (
                            <div className={'row mt-5'} key={info.salePk}>
                                <div className={'col-sm-2'}>
                                    <img src={info.saleImgSrc} style={style.img}/>
                                </div>
                                <div className={'col-sm-6 my-3'}>
                                    <div>
                                        <a href={'#'} className={"text-decoration-none"}
                                           style={{color: "black", fontSize: 18}}
                                           onClick={() => gotoDetail(info.saleBookId)}>
                                            <strong>{info.saleBookTitle}</strong>
                                        </a>
                                    </div>
                                    <p className={""}>품질 : {info.bookGrade}등급</p>
                                    <div>
                                        <p className={""}>판매자 설명 : {info.saleDiscription}</p>
                                    </div>
                                </div>
                                <div className={"col-sm-2"}>
                                    <p><strong>판매자정보</strong></p>
                                    <p className={"mt-3"} style={{color: "black"}}>판매자 : {info.saleSellerName}</p>
                                    <p className={""} style={{color: "black"}}>판매자ID : {info.saleSellerId}</p>
                                </div>
                                <div className={"col-sm-2 text-center my-3 d-flex flex-column"}>
                                    <div>
                                        <button type={'button'} className={'btn btn-dark w-100'} onClick={() => save(index)}> 장바구니에 담기 </button>
                                    </div>
                                    <div>
                                        <button type={'button'} className={'btn btn-dark w-100 mt-2'}
                                                onClick={() => handleInPurchase(index)}> 바로 구매
                                        </button>
                                    </div>
                                    <div>
                                        {info.saleSellerId == sessionStorage.getItem("id") ? null :
                                            <MailOpenButton room={info.salePk + "_" + sessionStorage.getItem("id")} name={"판매자문의"} style={{width:"100%"}}/>
                                        }
                                    </div>
                                </div>
                                <div className={'d-flex mt-2'}>
                                    <table className={'table'}>
                                        <thead>
                                        <tr className={'text-center table-secondary'}>
                                            <th>판매 가격</th>
                                            <th>판매 수량</th>
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
                        )
                    })
                }
            </main>
            <Footer/>
        </Fragment>

    )
}

export default ViewOldBookList;