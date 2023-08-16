import React, {useEffect, useState} from 'react';
import axios from "axios";

function PurchaseMain(props) {

    // 여기는 수정해야하는 거임,
    const [ boardList, setBoardList ] = useState([]);

    useEffect(() => {
        axios.get('')
            .then(res => {
                console.log("통신 성공");

                if (res.data.result === 'success') {
                    setBoardList(res.data.data);
                }
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
                        <col width={'10%'}/>
                        <col width={'70%'}/>
                        <col width={'15%'}/>
                        <col width={'15%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th></th>
                        <th>상품명</th>
                        <th className={'text-center'}>가격</th>
                        <th className={'text-center'}>수량</th>
                    </tr>
                    </thead>
                    <tbody>
                        <td className={'text-center'}><input type={"checkbox"}/></td>
                        <td className={'align-self-center'}>마음의 지혜</td>
                        <td className={'align-self-center text-center'}>10000</td>
                        <td className={'align-self-center text-center'}>2</td>
                        {/* 일단은 이렇게 할거라고 해놓긴만 했음 */}
                        {/*{*/}
                        {/*    boardList.map(item => {*/}
                        {/*        return (*/}
                        {/*            <tr key={item.num}>*/}
                        {/*                <td>{item.num}</td>*/}
                        {/*                <td>*/}
                        {/*                    <Link to={`detailBoard?num=${item.num}`}>{item.title}</Link>*/}
                        {/*                </td>*/}
                        {/*                <td>{item.id}</td>*/}
                        {/*                <td>{item.postdate}</td>*/}
                        {/*                <td>{item.visitCount}</td>*/}
                        {/*            </tr>*/}
                        {/*        );*/}
                        {/*    })*/}
                        {/*}*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PurchaseMain;