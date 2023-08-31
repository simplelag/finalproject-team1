import React, {useEffect, useState} from "react";

import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import BoardComment from "../board/BoardComment";


function QuestionDetail(props) {

    const navi = useNavigate();

    const board = useParams();
    const [boardPk] = useState(board.boardPk);
    const [title, setTitle] = useState('');
    const [name, setName] = useState(sessionStorage.getItem("name"))
    const [id, setId] = useState(sessionStorage.getItem("id"))
    const [boardId, setBoardId] = useState('')
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [datetime, setDatetime] = useState("");
    const [authority, setAuthority] = useState(sessionStorage.getItem("grade") || "block");
    const [commentCount, setCommentCount] = useState(0);


    // 게시글 정보 받아오는 부분
    useEffect(() => {
        axios.get(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                setTitle(res.data.boardTitle);
                setName(res.data.boardWriterName);
                setBoardId(res.data.boardWriterId);
                setContent(res.data.boardContent);
                setCategory(res.data.boardCategory);
                setDatetime(res.data.boardDatetime);

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
                nowId: id,
                authority: authority
            }
        })
            .then(res => {
                navi('/login/myLogin')
            })
    }


    return (
        <div>
            <Header />
            <div className={'container mt-5'}>
                <div className={'row'}>
                    <div className={'col-sm-10 mx-auto'}>
                        <div>
                            <p>{category} {boardPk}</p>
                            <p>제목: {title}</p>
                            <p>닉네임/아이디: {name} / {boardId}</p>
                            <p>작성시간: {datetime}</p>
                        </div>
                        <hr/>
                        <div className={"mb-5"}>
                            <p>
                                {content}
                            </p>
                            <img src={`/questions/image/${boardPk}`} alt="" className={"w-100"}/>
                        </div>
                        <div className={"d-flex justify-content-end"}>
                            <a href={sessionStorage.getItem("grade")=="admin"? "/admin": "/login/myLogin"} className={'btn btn-outline-purple'}>목록</a>
                            {authority=="user" &&
                                <button className={'btn btn-outline-purple'} onClick={onClickDelete}>삭제</button>}
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>
            <BoardComment boardPk={boardPk} setCommentCount={setCommentCount} />
            <Footer />
        </div>
    )
}

export default QuestionDetail;