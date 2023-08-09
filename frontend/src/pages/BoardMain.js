import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import {Link} from "react-router-dom";

function BoardMain(props) {

    const [boardList, setBoardList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/board")
            .then(res => {
                setBoardList(res.data);

            })
            .catch(err => {
                alert("BoardList Connect Err")
            });
    },[])

    return (
        <div>
            <Header />
            <div className={'container'}>
                <table className={'table'}>
                    <thead>
                        <tr className={'text-center'}>
                            <th>글번호</th>
                            <th>말머리</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>조회수</th>
                            <th>추천수</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        boardList.map(item => {
                            return (
                                <tr key={item.boardPk}><td>{item.boardPk}</td>
                                    <td>{item.boardCategory}</td>
                                    <td>
                                        <a href={'/main/board/' + item.boardPk} className={'btn'}>{item.boardTitle}</a>
                                    </td>
                                    <td>{item.boardWriterName}</td>
                                    <td>{item.boardVisitCount}</td>
                                    <td>{item.boardLike}</td>
                                    <td>{item.boardDatetime}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <div className={'my-3 d-flex justify-content-end'}>
                    <a href={'/main/board/write'} className={'btn'}>글작성</a>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BoardMain;