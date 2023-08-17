import React, {useEffect, useState} from 'react';
import axios from "axios";

function PurchaseMain(props) {

    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    const [ purchaseList, setPurchaseList ] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/purchase/List',{
            params:{
                userId:userId,
                state: 0
            }
        })
            .then(res => {
                console.log("통신 성공");
                setPurchaseList(res.data)
                props.setPurchaseList(res.data);
            })
            .catch(err => {
                console.log('통신 에러')
                console.log(err)
            })
    },[]);

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
                            purchaseList.map((item,index) => {
                                return (
                                    <tr>
                                        <td></td>
                                        <td className={'align-middle'}>{item.purchaseBookName}</td>
                                        <td className={'align-middle text-center'}>{item.purchaseSellerId}</td>
                                        <td className={'align-middle text-center'}>{item.purchasePayment}</td>
                                        <td className={'align-middle text-center'}>{item.purchaseNumber}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PurchaseMain;