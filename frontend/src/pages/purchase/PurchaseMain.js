import React, {useEffect, useState} from 'react';
import axios from "axios";
import PurchaseInfor from "./PurchaseInfor";
import {useLocation} from "react-router-dom";

function PurchaseMain(props) {

    const location = useLocation();
    const list = location.state.value;
    const number = location.state.number

    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    const [purchaseList, setPurchaseList ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/purchase/List',{
            params:{
                userId:userId,
                state: 0
            }
        })
            .then(res => {
                res.data.map((item) => {
                    item.purchaseNumber = 1
                })
                setPurchaseList(res.data)
            })
    },[]);

    useEffect(() => {
        // (() => {
        //     window.addEventListener('beforeunload', preventClose, {capture: false});
        // })();

        if(Array.isArray(list)){
            axios.put("http://localhost:8080/purchase/locationInsert", list, null)
                .then(res => {
                    console.log(res)
                    setPurchaseList(list)
                })
                .catch(err => {
                    console.log(err)
                })
        }else{
            axios.put("http://localhost:8080/purchase/locationIndviSave", list, null)
                .then(res => {
                    console.log(res)
                    setPurchaseList(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        return(() => {
            // window.removeEventListener('beforeunload', preventClose);

            axios.delete('http://localhost:8080/purchase/delete',{
                params:{
                    userId : userId,
                    state : 0
                }
            })
                .then(res=>{
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        })
    },[])

    
    // 수량 체크
    const [selectedValue, setSelectedValue] = useState(1);

    const handleNumberInput = (index, e) => {
        setSelectedValue(e.target.value)
        purchaseList[index].purchaseNumber = parseInt(e.target.value);
        console.log(purchaseList)
    };

    return (
        <div className={'container my-3 px-0'}>
            <p>주문 정보</p>
            <div className={'border border-2'}>
                <table className={'table table-hover table-striped'}>
                    <colgroup>
                        <col width={'5%'}/>
                        <col width={'70%'}/>
                        <col width={'10%'}/>
                        <col width={'10%'}/>
                        <col width={'15%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th></th>
                        <th>상품명</th>
                        <th className={'text-center'}>판매자</th>
                        <th className={'text-center'}>가격</th>
                        <th className={'text-center'}>수량</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            purchaseList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td></td>
                                        <td className={'align-middle'}>{item.purchaseBookName}</td>
                                        <td className={'align-middle text-center'}>{item.purchaseSellerId}</td>
                                        <td className={'align-middle text-center'}>{item.purchasePayment}</td>
                                        <td className={'align-middle text-center'}>
                                            {/*{item.purchaseNumber}*/}
                                            {/*<select value={selectedValue} onChange={(e) => handleNumberInput(index, e)}>*/}
                                                {
                                                    number.map((item, index) => {
                                                        return(
                                                            <div key={index}>
                                                                <select value={selectedValue} onChange={(e) => handleNumberInput(index, e)}>
                                                                    {Array.from(Array(item), (_, index1) => (
                                                                        <option key={index1} value={index1 + 1}>{index1 + 1}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                {/*{Array.from(Array(item.purchaseNumber), (_, index1) => (*/}
                                                {/*{Array.from((AllNumber), (_, index1) => (*/}
                                                {/*    <option key={index1} value={index1 + 1}>{index1 + 1}</option>*/}
                                                {/*))}*/}
                                            {/*</select>*/}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <ul>
                    {/*{selectedValue.map((item, index) => (*/}
                    {/*    <li key={index}>{item}</li>*/}
                    {/*))}*/}
                </ul>
            </div>
            <PurchaseInfor purchaseList={purchaseList} />
        </div>
    )
}

export default PurchaseMain;