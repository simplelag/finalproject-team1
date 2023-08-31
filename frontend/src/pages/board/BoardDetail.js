import React, {Fragment, useEffect, useState} from "react";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import BoardComment from "./BoardComment";

function BoardDetail(props) {

    const navi = useNavigate();

    const board = useParams();
    const [boardPk] = useState(board.boardPk);
    const [title, setTitle] = useState('');
    const [name, setName] = useState(sessionStorage.getItem("name"))
    const [id, setId] = useState(sessionStorage.getItem("id"))
    const [boardId, setBoardId] = useState('')
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [visit, setVisit] = useState('');
    const [like, setLike] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const [visible, setVisible] = useState(false);

    // 게시글 정보 받아오는 부분
    useEffect(() => {
        axios.get(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                setTitle(res.data.boardTitle);
                setName(res.data.boardWriterName);
                setBoardId(res.data.boardWriterId)
                setContent(res.data.boardContent);
                setCategory(res.data.boardCategory);
                setVisit(res.data.boardVisitCount);
                setLike(res.data.boardLike);

                if (sessionStorage.getItem("id") == res.data.boardWriterId) {
                    setVisible(true);
                }
            })
            .catch(err => {
                alert("BoardDetail Connect Err")
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

    // 삭제
    const onClickDelete = () => {
        axios.delete(`http://localhost:8080/board/${boardPk}`, {
            params: {
                boardWriterId: boardId,
                nowId: id,
                authority: sessionStorage.getItem("grade")
            }
        })
            .then(res => {
                navi('/board')
            })
    }

    const onClickUpdate = () => {
        navi("/board/update", {state: {boardPk: boardPk}});
    }

    const onClickLike = () => {
        if (sessionStorage.getItem("id") == null) {
            alert("로그인이 필요한 서비스입니다")
        }
        else {
            axios.post('http://localhost:8080/board/like', null,{
                params: {
                    boardPk: boardPk,
                    likeMemberId: id,
                }
            })
                .then(res =>{
                    setLike(res.data.boardLike)
                })
                .catch(err => {

                })
        }
    }

    return (
        <div>
            <Header />
                <div className={'container my-5'}>
                    <div className={'row'}>
                        <div className={'col-sm-10 mx-auto'}>
                            <table className={'table'}>
                                <tbody>
                                <tr className={"table-dark"}>
                                    <td className={'col-sm-1'}>{category}</td>
                                    <td colSpan={3} className={'col-sm-auto'}>{title}</td>
                                </tr>
                                <tr className={"table-secondary"}>
                                    <td className={''}>{name}</td>
                                    <td className={'text-end col-1'}>댓글수: {commentCount}</td>
                                    <td className={'text-end col-1'}>추천수: {like}</td>
                                    <td className={'text-end col-1'}>조회수: {visit}</td>
                                </tr>
                                </tbody>
                            </table>
                            <textarea rows={10} className={'form-control'} value={content} disabled={true}></textarea>
                            <div className={'d-flex justify-content-center my-3'}>
                                <button type={'button'} className={'btn btn-outline-purple'} onClick={onClickLike}>추천</button>
                            </div>
                            <div className={"d-flex"}>
                                <a href={'/board/'} className={'btn btn-outline-purple me-auto'}>목록</a>
                                {
                                    visible && <button type={"button"} className={'btn btn-outline-purple  ms-2'} onClick={onClickUpdate}>수정</button>
                                }
                                {
                                    (visible && <button type={"button"} className={'btn btn-outline-purple ms-2'} onClick={onClickDelete}>삭제</button>)
                                    ||
                                    (sessionStorage.getItem("grade") == "admin" && <button type={"button"} className={'btn btn-outline-purple'} onClick={onClickDelete}>삭제</button>)
                                }
                                <button type={"button"} onClick={onClickWrite} className={'btn btn-outline-purple ms-2'}>글작성</button>
                            </div>
                        </div>
                    </div>
                </div>
            <BoardComment boardPk={boardPk} setCommentCount={setCommentCount} />
            <Footer />
        </div>
    )
}

export default BoardDetail;