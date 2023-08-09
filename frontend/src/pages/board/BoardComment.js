import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function BoardComment(props) {

    const [commentList, setCommentList] = useState([]);

    const [boardPk] = useState(props.boardPk);
    const [commentId, setCommentId] = useState('testUserId');
    const [commentName, setCommentName] = useState('testUserName');
    const [commentContent, setCommentContent] = useState('');
    const [commentNum, setCommentNum] = useState('');

    const navi = useNavigate();

    // 댓글 리스트 불러오기
    useEffect(() => {
        axios.get(`http://localhost:8080/board/comment/${props.boardPk}`)
            .then(res => {
                setCommentList(res.data)
            })
            .catch(err => {
                alert("댓글 불러오기 실패")
            })
    },[])

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
                commentWriterId: commentId,
            }
        })
            .then(() => {

            })
            .catch(() => {
                alert("댓글 등록 실패")
            })
    }

    // 댓글 수정
    const onClickUpdate = () => {
        let add = "<input type='text' class='form-control'/>";

    }
    const commentUpdate = () => {
        axios.put(`http://localhost:8080/board/comment/${boardPk}`, null, {

        })
            .then(res => {

            })
    }

    // 댓글 삭제
    const commentDelete = (commentPk) => {
        axios.delete(`http://localhost:8080/board/comment/delete/${commentPk}`, {
            params: {
                commentPk: commentPk,
                commentWriterId: commentId,
            }
        })
            .then(res => {
                /*삭제 후 페이지 리로드*/
            })
            .catch(err => {
                alert("댓글삭제 실패")
            })
    }
    const onClickDelete = (e) => {
        commentDelete(e.target.value);
    }


    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-sm-10 mx-auto'}>
                    <form onSubmit={onSubmitComment}>
                        <textarea className={'form-control'} rows={3} onChange={onChangeCommentContent} value={commentContent}></textarea>
                        <div className={'d-flex justify-content-end'}>
                            <button type={"submit"} className={'btn my-3'}>댓글등록</button>
                        </div>
                    </form>
                    <div className={'my-5'}>
                        {
                            commentList.map(item => {
                            return (
                                <div key={item.commentPk} className={'border-top p-3'}>
                                    <p className={'d-flex justify-content-end'}>{item.commentDatetime}</p>
                                    <p>{item.commentWriterName}</p>
                                    <p>{item.commentContent}</p>
                                    <div className={'d-flex justify-content-end my-2'}>
                                        <button type={"button"} className={'btn'} onClick={onClickUpdate}>수정</button>
                                        <div id={'commentUpdate'}></div>
                                        <button type={"button"} className={'btn'} value={item.commentPk} onClick={onClickDelete}>삭제{item.commentPk}</button>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BoardComment;