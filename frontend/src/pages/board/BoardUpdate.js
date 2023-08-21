import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";

function BoardUpdate(props) {

    const navi = useNavigate();
    const location = useLocation();

    const [boardPk] = useState(location.state.boardPk);
    const [title, setTitle] = useState('');
    const [name, setName] = useState(sessionStorage.getItem("name"))
    const [id, setId] = useState(sessionStorage.getItem("id"))
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');



    const onClickCategory = (e) => {
        setCategory(e.target.value);
    }

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onClickList = (e) => {
        navi("/board")
    }


    useEffect(() => {
        axios.get(`http://localhost:8080/board/${boardPk}`)
            .then(res => {
                setTitle(res.data.boardTitle);
                setName(res.data.boardWriterName);
                setContent(res.data.boardContent);
                setCategory(res.data.boardCategory);
            })
            .catch(err => {
                alert("BoardUpdate Loading Err")
            })
    }, [])

    // 수정
    const Update = () => {
        axios.put(`http://localhost:8080/board/update/${boardPk}`, null, {
            params: {
                boardPk: boardPk,
                boardCategory: category,
                boardTitle: title,
                boardWriterId: id ,
                boardWriterName: name,
                boardContent: content,
            }
        })
            .then(res => {
                navi('/board')
            })
            .catch(err => {
                alert("글수정 오류")
            })
    }

    return (
        <div>
            <Header />
            <div className={'container my-5'}>
                <div className={'row'}>
                    <div className={'col-sm-10 mx-auto'}>
                        <div>
                            <button type={'button'} className={'btn'} value={'일반'} onClick={onClickCategory}>일반</button>
                            <button type={'button'} className={'btn'} value={'독후감'} onClick={onClickCategory}>독후감</button>
                            <button type={'button'} className={'btn'} value={'공지/이벤트'} onClick={onClickCategory}>공지/이벤트</button>
                        </div>
                        <div className={'my-3'}>
                            <input type={'text'} className={'form-control'} defaultValue={title} onChange={onChangeTitle} />
                            <input type={'hidden'} className={'form-control'} value={name}/>
                            <input type={'hidden'} className={'form-control'} value={id}/>
                        </div>
                        <div className={'my-3'}>
                            <textarea className={'form-control'} rows={10} defaultValue={content} onChange={onChangeContent}></textarea>
                        </div>
                        <div className={'d-flex justify-content-around'}>
                            <button type={'button'} className={'btn'} onClick={onClickList}>목록</button>
                            <button type={'button'} className={'btn'} onClick={Update}>작성</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default BoardUpdate;