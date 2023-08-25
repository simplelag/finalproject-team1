import React, {useEffect, useMemo, useRef, useState} from "react";
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Pagenation from "../common/Pagenation";

function BoardMain(props) {

    const [boardList, setBoardList] = useState([]);
    const [notice, setNotice] = useState([]);
    const [noticeShow, setNoticeShow] = useState(false);
    const [noticeList, setNoticeList] = useState([]);
    const [subList, setSubList] = useState([]);

    const navi = useNavigate();

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

    // 펼치기 및 접기버튼 클릭이벤트 핸들러
    const onClickView = () => {
        setNoticeShow(!noticeShow)

        if (noticeShow) {
            setNoticeList(subList);
        }
        else {
            setNoticeList(notice);
        }
    }

    const [totalPage, setTotalPage] = useState(1);
    const [nowPage, setNowPage] = useState(1);
    const [btnList, setBtnList] = useState([]);

    // 5는 표시할 버튼개수
    let firstBtn = Math.floor((nowPage - 1) / 5) * 5 + 1;

    // 처음 게시물 리스트 로딩
    useEffect(() => {
        axios.get("http://localhost:8080/board/normal", {
            params: {
                page: 0,
                size: 10,
                boardCategory: "일반",
                boardCategory2: "독후감"
            }
        })
            .then(res => {
                setBoardList(res.data)
            })
    },[])

    // 게시물 리스트 전체 개수 정보 받아오는 부분
    useEffect(() => {
        axios.get("http://localhost:8080/board/countList", {
            params: {
                boardCategory: "일반",
                boardCategory2: "독후감"
            }
        })
            .then(res => {
                btnCreate(res.data)
            })
            .catch(err => {
                alert("BoardList Count Err")
            });
    },[nowPage])

    // 버튼 생성
    const btnCreate = (totalPage) => {
        let btnArray = [];
        if (firstBtn != 1) {
            btnArray.push("이전")
        }
        for (let i = firstBtn; i < firstBtn + 5; i++) {
            btnArray.push(i);
            // 10은 한페이지에 표시할 게시글 수
            if (i >= Math.ceil(totalPage/10)) {
                break;
            }
            if (i == firstBtn + 5 - 1) {
                btnArray.push("다음")
            }
        }
        setBtnList(btnArray);
    }

    // 페이지네이션 버튼 클릭시 일반, 독후감 게시판 리스트 불러오기
    const loadList = (page) => {
        axios.get("http://localhost:8080/board/normal", {
            params: {
                page: page - 1,
                size: 10,
                boardCategory: "일반",
                boardCategory2: "독후감"
            }
        })
            .then(res => {
                setBoardList(res.data);
            })
        }

    // 버튼 클릭시 작동하는 이벤트핸들러
    const nowBtn = (item) => {
        if (item == "이전") {
            setNowPage(firstBtn - 5);
        }
        else if (item == "다음") {
            setNowPage(firstBtn + 5);
        }
        else {
            loadList(item);
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
                        })
                    }
                    </tbody>
                </table>
                <div className={'my-3 d-flex justify-content-end'}>
                    <button type={"button"} className={'btn btn-outline-purple'} onClick={onClickWrite}>글작성</button>
                </div>
                <div className={"text-center"}>
                    {
                        btnList.map(item => {
                            return (
                                <button key={item} onClick={() => {nowBtn(item)}} className={"btn"}>{item}</button>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BoardMain;