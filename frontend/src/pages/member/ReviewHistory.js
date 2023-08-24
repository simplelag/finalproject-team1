import React, {useEffect, useState} from 'react';
import axios from "axios";

function ReviewHistory(props) {

    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    const [myReviewList, setMyReviewList] = useState([])
    const [myBookTitle, setMyBookTitle] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/login/myLogin/myReviewList', {
            params: {
                userId: userId
            }
        })
            .then(res => {
                console.log(res.data)
                setMyReviewList(res.data.data1);
                setMyBookTitle(res.data.data2);
            })
    }, []);

    return (
        <div className={'container my-4'}>
            <h1 className={'display-5 my-4 text-center'}>리뷰 내역 페이지</h1>
            <div className={'border border-2'}>
                <table className={'table table-hover table-striped'}>
                    <colgroup>
                        <col width={'50%'}/>
                        <col width={'20%'}/>
                        <col width={'15%'}/>
                        <col width={'15%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>리뷰한 책</th>
                        <th className={'text-center'}>리뷰 제목</th>
                        <th className={'text-center'}>평점</th>
                        <th className={'text-center'}>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        myReviewList.map((item, index) => {
                            return (
                                <tr key={item.salePk}>
                                    <td className={'align-middle'}>
                                        {myBookTitle.slice(index, index + 1).map((item, index1) => {
                                            return (
                                                <div>
                                                    {item}
                                                    {/*{item == "판매하는 책이 아니어서 리뷰를 쓸 수 없습니다." ? <td rowSpan="5">1</td> : item}*/}
                                                </div>
                                            )
                                        })}
                                    </td>
                                    <td className={'align-middle text-center'}>{item.bookReviewTitle}</td>
                                    <td className={'align-middle text-center'}>{item.bookReviewGrade}/10</td>
                                    <td className={'align-middle text-center'}>{item.bookReviewDatetime}</td>
                                    <td></td>
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

export default ReviewHistory;