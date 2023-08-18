import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {Link, useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";

function BoardMain(props) {

    const [boardList, setBoardList] = useState([]);

    const navi = useNavigate();

    // 책 리스트 정보 받아오는 부분
    useEffect(() => {
        axios.get("http://localhost:8080/board")
            .then(res => {
                setBoardList(res.data);
            })
            .catch(err => {
                alert("BoardList Connect Err")
            });
    },[])

    const onClickWrite = () => {
        if (sessionStorage.getItem("id") != null) {
            navi("/board/write")
        }
        else {
            alert("로그인이 필요합니다")
            navi("/login")
        }
    }

    return (
        <div>
            <Header />
            <div className={'container my-5'}>
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
                            if (item.boardCategory != "관리자문의") {
                                return (
                                    <tr key={item.boardPk}>
                                        <td className={'text-center col-sm-1'}>{item.boardPk}</td>
                                        <td className={'text-center col-sm-1'}>{item.boardCategory}</td>
                                        <td>
                                            <a href={'/board/' + item.boardPk} className={'btn'}>{item.boardTitle}</a>
                                        </td>
                                        <td className={'text-center col-sm-1'}>{item.boardWriterName}</td>
                                        <td className={'text-center col-sm-1'}>{item.boardVisitCount}</td>
                                        <td className={'text-center col-sm-1'}>{item.boardLike}</td>
                                        <td className={'text-center col-sm-2'}>{item.boardDatetime}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>
                <div className={'my-3 d-flex justify-content-end'}>
                    <button type={"button"} className={'btn'} onClick={onClickWrite}>글작성</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BoardMain;