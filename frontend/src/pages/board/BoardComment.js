import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function BoardComment(props) {

    const [commentList, setCommentList] = useState([]);
    const location = useLocation();

    const [boardPk] = useState(props.boardPk);
    const [id, setId] =useState(sessionStorage.getItem("id"));
    const [commentName, setCommentName] = useState(sessionStorage.getItem("name"));
    const [commentContent, setCommentContent] = useState('');
    const [commentUpdateContent, setCommentUpdateContent] = useState('');
    const [test, setTest] = useState('');


    const [formVisible, setFormVisible] = useState(false);
    const [commentUpdateVisible, setCommentUpdateVisible] = useState(false);

    // 댓글 리스트 불러오기
    useEffect(() => {
        axios.get(`http://localhost:8080/board/comment/${props.boardPk}`)
            .then(res => {
                setCommentList(res.data)
                props.setCommentCount(res.data.length)

                if (sessionStorage.getItem("id") != null) {
                    setFormVisible(true);
                }
            })
            .catch(err => {
                alert("댓글 불러오기 실패")
            })
    },[props])

    // 댓글내용 작성
    const onChangeCommentContent = (e) => {
        setCommentContent(e.target.value);
    }

    // 댓글 데이터베이스에 등록
    const onSubmitComment = () => {
        axios.post(`http://localhost:8080/board/comment/write`, null, {
            params: {
                commentBoardPk: boardPk,
                commentContent: commentContent,
                commentWriterName: commentName,
                commentWriterId: id,
            }
        })
            .then(res => {
                props.setCommentCount(res.data.length)

            })
            .catch(() => {
                alert("댓글 등록 실패")
            })
    }

    // 댓글 수정
    const onClickUpdate = (commentPk) => {
        setCommentUpdateVisible(!commentUpdateVisible);
        setTest(commentPk);
    }
    const onChangeCommentUpdateContent = (e) => {
        setCommentUpdateContent(e.target.value);
    }
    const commentUpdate = (commentPk) => {
        axios.put(`http://localhost:8080/board/comment/update/${commentPk}`, null, {
            params: {
                commentBoardPk: boardPk,
                commentPk: commentPk,
                commentContent: commentUpdateContent,
                commentWriterName: commentName,
                commentWriterId: id,
            }
        })
            .then(res => {

            })
    }

    // 댓글 삭제
    const commentDelete = (commentPk, commentId) => {
        axios.delete(`http://localhost:8080/board/comment/delete/${commentPk}`, {
            params: {
                commentPk: commentPk,
                commentWriterId: commentId,
                nowId: id,
                authority: sessionStorage.getItem("grade")
            }
        })
            .then(res => {
                props.setCommentCount(res.data.length)
            })
            .catch(err => {
                alert("댓글삭제 실패")
            })
    }
    const onClickDelete = (pk, id) => {
        commentDelete(pk, id);
    }


    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-sm-10 mx-auto'}>
                    {
                        formVisible &&
                        <form onSubmit={onSubmitComment}>
                            <textarea className={'form-control'} rows={3} onChange={onChangeCommentContent} value={commentContent}></textarea>
                            <div className={'d-flex justify-content-end'}>
                                <button type={"submit"} className={'btn my-3 btn-outline-dark'}>댓글등록</button>
                            </div>
                        </form>
                    }

                    <div className={'my-5'}>
                        {
                            commentList.map(item => {
                            let visible = false;

                                if (id == item.commentWriterId) {
                                    visible = true;

                                    return (
                                        <div key={item.commentPk} className={'border-top p-3'}>
                                            <div className={"d-flex"}>
                                                <p className={"me-auto"}>{item.commentWriterName}</p>
                                                <p>{item.commentDatetime}</p>
                                            </div>
                                            <p>{item.commentContent}</p>
                                            <div className={'d-flex justify-content-end my-2'}>
                                                {
                                                    visible &&
                                                    <button type={"button"} className={'btn btn-outline-dark'} onClick={() => {onClickUpdate(item.commentPk)}}>수정</button>
                                                }
                                                {
                                                    visible && <button type={"button"} className={'btn btn-outline-dark ms-2'} onClick={() => {
                                                        onClickDelete(item.commentPk, item.commentWriterId)
                                                    }}>삭제</button>
                                                }
                                            </div>
                                            {
                                                item.commentPk == test &&
                                                commentUpdateVisible &&
                                                <form onSubmit={() => {commentUpdate(item.commentPk)}}>
                                                    <textarea className={"form-control"} rows={3} onChange={onChangeCommentUpdateContent} defaultValue={item.commentContent} />
                                                    <div className={"d-flex justify-content-end"}>
                                                        <button type={"submit"} className={"btn my-2 btn-outline-dark"}>작성</button>
                                                    </div>
                                                </form>
                                            }
                                        </div>
                                    )
                                }
                                else {
                                    if (sessionStorage.getItem("grade") == "admin") {
                                        visible = true;
                                    }
                                    return (
                                        <div key={item.commentPk} className={'border-top p-3'}>
                                            <div className={"d-flex"}>
                                                <p className={"me-auto"}>{item.commentWriterName}</p>
                                                <p>{item.commentDatetime}</p>
                                            </div>
                                            <p>{item.commentContent}</p>
                                            <div className={'d-flex justify-content-end my-2'}>
                                                {
                                                    visible && <button type={"button"} className={'btn btn-outline-dark'} onClick={() => {
                                                        onClickDelete(item.commentPk, item.commentWriterId)
                                                    }}>삭제</button>
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardComment;