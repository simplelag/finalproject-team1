import React, {useEffect, useState} from 'react';
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function ShoppingBasket() {
    const [oldBookInfo,setOldBookInfo] = useState([]);
    const navi = useNavigate();
    const [selectAll, setSelectAll] = useState(false);
    const [selectItems, setselectItems] = useState({});
    const [basketPk,setbasketPk] = useState();

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

        const updateSelecteItems = {};
        oldBookInfo.forEach(item => {
            updateSelecteItems[item.basketPk] = !selectAll
        });
        setselectItems(updateSelecteItems);
    }

    const handleDeleteItem = (basketPk) =>{
        axios.delete(`http://localhost:8080/searchUserBaseketDelete`,{
            params:{
                basketPk: basketPk
            }
        })
            .then(res =>{
                alert("장바구니에서 제거가 완료되었습니다!")
                // deleteItem으로 제거된 basketPk값을 뺴고 다시 OldBookInfo를 재설정하고 랜더링함
                const updatedBookInfo = oldBookInfo.filter(item => item.basketPk !== basketPk);
                setOldBookInfo(updatedBookInfo);
            })
    }

    const handleSelectItem = (basketPk) =>{
        setselectItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [basketPk]: !prevSelectedItems[basketPk]
        }));
    };

    const handlePurchase = (e) => {
        const postData = new Map();
        postData.set("data1", oldBookInfo);
        postData.set("data2", selectItems);

        axios.put("http://localhost:8080/purchase/basketInsert", postData)
            .then(res =>{
                console.log("통신 성공", res)
            })
            .catch(err => {
                console.log("통신 실패", err)
            })
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
                                <input type="checkbox" name={"Selectone"} checked={selectItems[item.basketPk] || false}
                                onChange={() => handleSelectItem(item.basketPk)}
                                />
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
                                <br/>
                                {"판매가:"}
                                <span className={"p-1"}>{item.basketBookPrice}</span>
                                {"원"}
                            </td>
                            <td className={"text-center"}>
                                <div className={"row"}>
                                    <div className={"col-sm-4 ms-1 mt-4" }>
                                        <span>{item.basketBookPieces}개</span>
                                    </div>
                                    <div className={"col-sm-7 ms-1 mt-4"}>
                                        <button type={"button"} className={"btn btn-danger"} onClick={() => handleDeleteItem(item.basketPk)}>삭제</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className={"text-center"}>
                <button type={"submit"} className={"btn btn-success"} onClick={handlePurchase}><h4>주문하기</h4></button>
            </div>

            <Footer/>
        </main>
    )
}

export default ShoppingBasket;