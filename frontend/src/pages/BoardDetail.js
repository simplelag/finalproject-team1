import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
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

    const navi = useNavigate();


    useEffect(() => {
        axios.get(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                setTitle(res.data.title);
                setName(res.data.name);
                setContent(res.data.content);
                setCategory(res.data.category);
                setVisit(res.data.visit);
            })
            .catch(err => {
                alert("BoardDetail Connect Err")
            })
    }, [])

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    const Delete = () => {
        axios.delete(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                navi('/main/board')
            })
    }

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
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-sm-10 mx-auto'}>
                            <span>{category}</span>
                            <span>{title}</span>
                            <span>{name}</span>
                            <span>댓글수</span>
                            <span>추천수</span>
                            <span>{visit}</span>
                            <textarea rows={10} className={'form-control'} value={content} onChange={onChangeContent}></textarea>
                            <div className={'d-flex justify-content-center'}>
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