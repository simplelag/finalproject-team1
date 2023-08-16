import React, {useEffect, useState} from 'react';
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ShoppingBasket() {
    const [BookInfo,setBookInfo] = useState([]);
    const [oldBookInfo,setOldBookInfo] = useState([]);
    const navi = useNavigate();
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/searchUserBasket',{
            params:{
                basketMemberId: sessionStorage.getItem("id")
            }
        })
            .then(res =>{
                console.log(res.data)
                setOldBookInfo(res.data)
            })
    }, []);
    const handleSelectAll = () =>{
        setSelectAll(prevSelectAll => !prevSelectAll);
    }


    return (

        <main className={"container"}>
            <Header/>
            <div className={"p-2"}>
                <h4>장바구니</h4>
                <input
                    className={"form-check-input"}
                    type={"checkbox"}
                    value={""}
                    id={"checkbox"}
                    checked={selectAll}
                    onChange={handleSelectAll}
                />
                <label className={"form-check-label ms-2"} for={"checkbox"} id={"selectAll"}>전체 선택</label>
                <table className={"table table-bordered"}>
                    {oldBookInfo.map(item => (
                        <tr key={item.basketBookId}>
                            <td className={"text-center"}>
                                <input type="checkbox" name={"Selectone"} checked={selectAll}/>
                            </td>
                            <td>
                                <a href="#">
                                    <img src={item.basketBookCover} alt="이미지가 들어갈 자리" style={{width:200,height:200}}/>
                                </a>
                            </td>
                            <td>
                        <span>
                            <a href="" className={"text-decoration-none"} style={{color:"black"}}>{item.basketBookTitle}</a>
                        </span>
                            </td>
                            <td>
                                {/*{"정가:"}*/}
                                {/*<s>{item.originalPrice}</s>*/}
                                <br/>
                                {"판매가:"}
                                <span className={"p-1"}>{item.basketBookPrice}</span>
                                {"원"}
                            </td>
                            <td className={"text-center"}>
                                <div className={"row"}>
                                    {/*<div className={"col-sm-2"}>*/}
                                    {/*    <input type="text" className={"form-control"}*/}
                                    {/*           style={{height: "20px", width: "30px"}}/>*/}
                                    {/*</div>*/}
                                    <div className={"col-sm-4 ms-2"}>
                                        <span>{item.basketBookPieces}개</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className={"text-center"}>
                <button type={"submit"} className={"btn btn-success"}><h4>주문하기</h4></button>
            </div>

            <Footer/>
        </main>
    )
}

export default ShoppingBasket;