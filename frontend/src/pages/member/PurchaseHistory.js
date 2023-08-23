import React, {useEffect, useState} from 'react';
import axios from "axios";

function PurchaseHistory(props) {

    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    const [myPurchaseList, setMyPurchaseList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/login/myLogin/myPurchaseList', {
            params: {
                userId: userId,
                state : 1
            }
        })
            .then(res => {
                setMyPurchaseList(res.data)
            })
    },[]);

    const handlePurchaseCancel = (index) => {
        const requestData = {
            purchasePk : myPurchaseList[index].purchasePk,
            purchaseBookId: myPurchaseList[index].purchaseBookId,
            purchaseBookName : myPurchaseList[index].purchaseBookName,
            purchaseBuyerId : myPurchaseList[index].purchaseBuyerId,
            purchaseBuyerName : myPurchaseList[index].purchaseBuyerName,
            purchaseSellerId : myPurchaseList[index].purchaseSellerId,
            purchaseSellerName : myPurchaseList[index].purchaseSellerName
        }
        axios.delete("http://localhost:8080/login/myLogin/delete",{
            data: requestData
        })
            .then(res => {
                console.log("통신 성공", res);
                let purchaseList = myPurchaseList.splice(0);
                purchaseList.splice(index, 1);
                setMyPurchaseList(purchaseList);
            })
            .catch(err => {
                console.log("통신 실패", err)
            })
    }

    return (
        <div className={'container my-4'}>
            <h1 className={'display-5 my-4 text-center'}>주문 내역 페이지</h1>
            <div className={'border border-2'}>
                <table className={'table table-hover table-striped'}>
                    <colgroup>
                        <col width={'10%'}/>
                        <col width={'50%'}/>
                        <col width={'10%'}/>
                        <col width={'10%'}/>
                        <col width={'20%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th className={'text-center'}>주문상태</th>
                        <th>상품명</th>
                        <th className={'text-center'}>권당가격</th>
                        <th className={'text-center'}>수량</th>
                        <th className={'text-center'}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myPurchaseList.map((item, index) => {
                            return (
                                <tr key={item.purchasePk}>
                                    <td className={'text-center align-middle'}>
                                        <span>{item.purchaseParcel === 0 ? "상품 준비중" : <div>
                                            {item.purchaseParcel === 1 ? "상품접수" : <div>
                                                {item.purchaseParcel === 2 ? "배송중" : <div>
                                                    {item.purchaseParcel === 3 ? "배송 완료" : null}
                                                </div>}
                                            </div>}
                                        </div>}</span>
                                    </td>
                                    <td className={'align-middle'}>{item.purchaseBookName}</td>
                                    <td className={'align-middle text-center'}>{item.purchasePayment}</td>
                                    <td className={'align-middle text-center'}>{item.purchaseNumber}</td>
                                    <td>
                                        <div>
                                            {item.purchaseParcel > 1 ? "" :
                                            <div className={'d-grid'}>
                                                <button type={'button'} className={'btn btn-danger'} onClick={() => handlePurchaseCancel(index)}>구매 취소</button>
                                            </div>}
                                        </div>

                                    </td>
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

export default PurchaseHistory;