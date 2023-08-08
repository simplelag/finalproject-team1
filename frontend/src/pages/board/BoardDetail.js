import React, {useEffect, useState} from "react";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function BoardDetail(props) {

    const board = useParams();

    const [boardPk] = useState(board.boardPk);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('')
    const [id, setId] = useState('')
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
    const Delete = () => {
        axios.delete(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                navi('/main/board')
            })
    }

    // 수정
    const Update = () => {
        axios.put(`http://localhost:8080/board/${boardPk}`, null, {
            boardPk: boardPk,
        })
            .then(res => {
                navi('/main/board}')
            })
    }

    return (
        <div>
            <Header />
                <div className={'container my-5'}>
                    <div className={'row'}>
                        <div className={'col-sm-10 mx-auto'}>
                            <table className={'table'}>
                                <tr>
                                    <td className={'col-sm-1'}>{category}</td>
                                    <td>{title}</td>
                                </tr>
                                <tr>
                                    <td>{name}</td>
                                    <div className={'d-flex justify-content-end'}>
                                        <td>댓글수</td>
                                        <td>{like}</td>
                                        <td>{visit}</td>
                                    </div>
                                </tr>
                            </table>
                            <textarea rows={10} className={'form-control'} value={content} onChange={onChangeContent}></textarea>
                            <div className={'d-flex justify-content-center my-3'}>
                                <button type={'button'} className={'btn'}>추천</button>
                            </div>
                            <a href={'/main/board/'} className={'btn'}>목록</a>
                            <a href={'/main/board/write'} className={'btn'}>글작성</a>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default BoardDetail;