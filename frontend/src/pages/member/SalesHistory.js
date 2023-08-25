import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";

function SalesHistory(props) {

    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    const [ mySaleList, setMySaleList ] = useState([])
    const navi = useNavigate();

    // useEffect(() => {
    //     axios.get('http://localhost:8080/login/myLogin/mySaleList', {
    //         params:{
    //             userId: userId
    //         }
    //     })
    //         .then(res => {
    //             console.log(res)
    //             setMySaleList(res.data)
    //         })
    // },[]);

    // 판매자가 배송하기 버튼을 클릭 했을 때
    const handlePost = (index) => {
        axios.put("http://localhost:8080/login/myLogin/mySalePost", mySaleList[index], null)
            .then(res => {
                console.log("통신 성공", res)
            })
            .catch(err => {
                console.log("통신 실패", err);
            })
    }

    //  판매자가 판매 취소하기
    const handleCancel = (index) => {
            axios.delete("http://localhost:8080/deleteSell",{
                params:{
                    salePk: mySaleList[index].salePk
                }
            })
                .then(res => {
                    alert("삭제를 완료하였습니다.")
                    const updateBookInfo = mySaleList.filter(item => item.salePk !== mySaleList[index].salePk );
                    setMySaleList(updateBookInfo);
                })
    }

    return (
        <div className={'container my-4'}>
            {/*<h1 className={'display-5 my-4 text-center'}>판매 내역 페이지</h1>*/}
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
                        <th className={'text-center'}>권당가격</th>
                        <th className={'text-center'}>수량</th>
                        <th className={'text-center'}></th>
                    </tr>
                    </thead>
                    <tbody>
                    { mySaleList.length==0?
                        <tr><td colSpan={5} className={"text-center"}>판매중인 상품이 없습니다.</td></tr> :
                        mySaleList.map((item,index) => {
                            return (
                                <tr key={item.salePk}>
                                    <td className={'text-center align-middle'}>
                                        {item.saleDisabled === null ? <span>{item.saleBookPieces === 0 ? "판매접수" : "판매중"}</span> : "판매 불가"}
                                    </td>
                                    <td className={'align-middle'}>{item.saleBookTitle}</td>
                                    <td className={'align-middle text-center'}>{item.saleBookPrice}</td>
                                    <td className={'align-middle text-center'}>{item.saleBookPieces}</td>
                                    <td>
                                        <span>{item.saleDisabled === null ?
                                            <div className={'d-grid'}>
                                                <button type={'button'} className={'btn btn-success'} onClick={() => handlePost(index)}>배송하기</button>
                                                <button type={'button'} className={'btn btn-warning'}>조회하기</button>
                                                <button type={'button'} className={'btn btn-danger'} onClick={() => handleCancel(index)}>취소하기</button>
                                            </div>
                                            : ""}</span>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
            <Pagenation
                // key={qNum}
                setList={setMySaleList}
                url={`/login/myLogin/mySaleList?userId=${userId}`}
                numberUrl={`/login/myLogin/mySaleListCount?userId=${userId}`}
                howManyContentsInAPage={5}
                howManyPagesInABlock={5}
                searchType={[]}
                order={""}
                isSearchable={false}
            />
        </div>
    )
}

export default SalesHistory;