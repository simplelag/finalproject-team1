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
    const [like, setLike] = useState('');

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

                if (sessionStorage.getItem("id") == boardId || sessionStorage.getItem("grade") == "admin") {
                    setVisible(!visible);
                }
            })
            .catch(err => {
                alert("BoardDetail Connect Err")
            })
    }, [])

    // 삭제
    const onClickDelete = () => {
        axios.delete(`http://localhost:8080/board/${boardPk}`, {
            params: {
                boardWriterId: boardId,
                nowId: sessionStorage.getItem("id"),

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
                    console.log(err)
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
                                <tr>
                                    <td className={'col-sm-1'}>{category}</td>
                                    <td className={''}>{title}</td>
                                </tr>
                                <tr>
                                    <td className={''}>{name}</td>
                                    <td className={'text-end col-1'}>댓글수: </td>
                                    <td className={'text-end col-1'}>추천수: {like}</td>
                                    <td className={'text-end col-1'}>조회수: {visit}</td>
                                </tr>
                                </tbody>
                            </table>
                            <textarea rows={10} className={'form-control'} value={content} readOnly={true}></textarea>
                            <div className={'d-flex justify-content-center my-3'}>
                                <button type={'button'} className={'btn btn-outline-dark'} onClick={onClickLike}>추천</button>
                            </div>
                            <a href={'/board/'} className={'btn btn-outline-dark'}>목록</a>

                            <button type={"button"} className={'btn btn-outline-dark'} onClick={onClickUpdate}>수정</button>
                            {
                                visible && <button type={"button"} className={'btn btn-outline-dark'} onClick={onClickDelete}>삭제</button>
                            }
                            <a href={'/board/write'} className={'btn btn-outline-dark'}>글작성</a>
                        </div>
                    </div>
                </div>
            <BoardComment boardPk={boardPk} />
            <Footer />
        </div>
    )
}

export default BoardDetail;