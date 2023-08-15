import React, {useEffect, useState} from "react";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import BoardComment from "./BoardComment";

function BoardDetail(props) {

    const board = useParams();

    const [boardPk] = useState(board.boardPk);
    const [title, setTitle] = useState('');
    const [name, setName] = useState(sessionStorage.getItem("name"))
    const [id, setId] = useState(sessionStorage.getItem("id"))
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [visit, setVisit] = useState('');
    const [like, setLike] = useState('');

    const navi = useNavigate();


    // 게시글 정보 받아오는 부분
    useEffect(() => {
        axios.get(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                setTitle(res.data.boardTitle);
                setName(res.data.boardWriterName);
                setContent(res.data.boardContent);
                setCategory(res.data.boardCategory);
                setVisit(res.data.boardVisitCount);
                setLike(res.data.boardLike);
            })
            .catch(err => {
                alert("BoardDetail Connect Err")
            })
    }, [])

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    // 삭제
    const onClickDelete = () => {
        axios.delete(`http://localhost:8080/board/${boardPk}`, {
            params: {
                boardWriterId: id,
            }
        })
            .then(res => {
                navi('/board')
            })
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
                                    <td>{name}</td>
                                    <td className={'text-end'}>댓글: </td>
                                    <td className={'text-end'}>추천: {like}</td>
                                    <td className={'text-end'}>조회수: {visit}</td>
                                </tr>
                                </tbody>
                            </table>
                            <textarea rows={10} className={'form-control'} value={content} onChange={onChangeContent}></textarea>
                            <div className={'d-flex justify-content-center my-3'}>
                                <button type={'button'} className={'btn'}>추천</button>
                            </div>
                            <a href={'/board/'} className={'btn'}>목록</a>
                            <button type={"button"} className={'btn'}>수정</button>
                            <button type={"button"} className={'btn'} onClick={onClickDelete}>삭제</button>
                            <a href={'/board/write'} className={'btn'}>글작성</a>
                        </div>
                    </div>
                </div>
            <BoardComment boardPk={boardPk} />
            <Footer />
        </div>
    )
}

export default BoardDetail;