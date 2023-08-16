import React, {useEffect, useState} from 'react';
import axios from "axios";

function SalesHistory(props) {

    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    const [ mySaleList, setMySaleList ] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/login/myLogin/mySaleList', {
            params:{
                userId: userId
            }
        })
            .then(res => {
                setMySaleList(res.data)
            })
    },[]);

    return (
        <div className={'container my-4'}>
            <h1 className={'display-5 my-4 text-center'}>판매 내역 페이지</h1>
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
                        <th className={'text-center'}>판매상태</th>
                        <th>상품명</th>
                        <th className={'text-center'}>가격</th>
                        {/* 수량은 db에서 없어서 아무거나 가져온거임*/}
                        <th className={'text-center'}>수량</th>
                        <th className={'text-center'}>배송상태</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        mySaleList.map(item => {
                            return (
                                <tr>
                                    <td className={'text-center align-middle'}>{item.saleDisabled === null ? '판매중' : '판매완료'}</td>
                                    <td className={'align-middle'}>{item.saleBookTitle}</td>
                                    <td className={'align-middle text-center'}>{item.saleBookPrice}</td>
                                    <td className={'align-middle text-center'}>{item.saleBookPieces}</td>
                                    <td className={'d-grid'}>
                                        <button type={'button'} className={'btn btn-success'}>배송하기</button>
                                        <button type={'button'} className={'btn btn-warning'}>조회하기</button>
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

export default SalesHistory;