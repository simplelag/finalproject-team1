import React, {useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";

function BoardMain(props) {

    const [boardList, setBoardList] = useState([]);
    const [notice, setNotice] = useState([]);
    const [qNum, setQNum] = useState(10);
    const [size, setSize] = useState(5);

    const [noticeShow, setNoticeShow] = useState(false);
    const [noticeList, setNoticeList] = useState([]);
    const [subList, setSubList] = useState([]);

    const navi = useNavigate();

    // 책 리스트 정보 받아오는 부분
    useEffect(() => {
        axios.get("http://localhost:8080/board")
            .then(res => {
                setBoardList(res.data)
            })
            .catch(err => {
                alert("BoardList Connect Err")
            });
    },[])


    useEffect(() => {
        axios.get("http://localhost:8080/board/category", {
            params: {
                boardCategory: "공지/이벤트",
            }
        })
            .then(res => {
                setNotice(res.data);
                setNoticeList(res.data.slice(0,2))
                setSubList(res.data.slice(0,2))
            })
            .catch(err => {
                alert("공지글 불러오기 실패")
            })
    },[])


    const onClickWrite = () => {
        if (sessionStorage.getItem("id") != null) {
            navi("/board/write")
        }
        else {
            alert("로그인이 필요한 서비스입니다")
            navi("/login")
        }
    }

    const onClickView = () => {
        setNoticeShow(!noticeShow)

        if (noticeShow) {
            setNoticeList(subList);
        }
        else {
            setNoticeList(notice);
        }
    }


    return (
        <div>
            <Header />
            <div className={'container my-5'}>
                <table className={'table'}>
                    <thead>
                        <tr className={'text-center table-dark'}>
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
                        noticeList.map(item => {
                            return (
                                <tr key={item.boardPk} className={"table-secondary"}>
                                    <td className={'text-center col-sm-1'}>{item.boardPk}</td>
                                    <td className={'text-center col-sm-1'} style={{color: "coral"}}>{item.boardCategory}</td>
                                    <td>
                                        <a href={'/board/' + item.boardPk} className={'text-decoration-none text-dark'}>{item.boardTitle}</a>
                                    </td>
                                    <td className={'text-center col-sm-1'}>{item.boardWriterName}</td>
                                    <td className={'text-center col-sm-1'}>{item.boardVisitCount}</td>
                                    <td className={'text-center col-sm-1'}>{item.boardLike}</td>
                                    <td className={'text-center col-sm-2'}>{item.boardDatetime}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        notice.length > 2 &&
                        <tr className={"table-secondary"}>
                            <td colSpan={7} className={"text-center"} onClick={onClickView}>{noticeShow ? "접기" : "펼치기"}</td>
                        </tr>
                    }
                    {
                        boardList.map(item => {
                            if (item.boardCategory != "관리자문의" && item.boardCategory != "공지/이벤트") {
                                return (
                                    <tr key={item.boardPk}>
                                        <td className={'text-center col-sm-1'}>{item.boardPk}</td>
                                        <td className={'text-center col-sm-1'}>{item.boardCategory}</td>
                                        <td>
                                            <a href={'/board/' + item.boardPk} className={'text-decoration-none text-dark'}>{item.boardTitle}</a>
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
                    <button type={"button"} className={'btn btn-outline-dark'} onClick={onClickWrite}>글작성</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BoardMain;