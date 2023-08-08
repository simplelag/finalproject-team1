import React, {useEffect, useState} from "react";
import axios from "axios";

function BoardComment(props) {

    const [commentList, setCommentList] = useState([]);

    const [commentId, setCommentId] = useState('testUserId');
    const [commentName, setCommentName] = useState('testUserName');
    const [commentContent, setCommentContent] = useState('');
    const [commentNum, setCommentNum] = useState('');


    useEffect(() => {
        axios.get(`http://localhost:8080/board/comment/${props.boardPk}`)
            .then(res => {
                setCommentList(res.data)
            })
            .catch(err => {
                alert("댓글 불러오기 실패")
            })
    },[])

    const onChangeCommentContent = (e) => {
        setCommentContent(e.target.value);
    }

    const onSubmitComment = (e) => {
        axios.post('http://localhost:8080/board/comment/write', null, {
            params: {
                commentBoardPk: props.boardPk,
                commentWriterId: commentId,
                commentWriterName: commentName,
                commentContent: commentContent,
                commentNum: commentNum,
            }
        })
            .then(() => {

            })
            .catch(() => {
                alert("댓글 등록 실패")
            })
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                <div className={'col-sm-10 mx-auto'}>
                    <form onSubmit={onSubmitComment}>
                        <textarea className={'form-control'} rows={3} onChange={onChangeCommentContent}></textarea>
                        <div className={'d-flex justify-content-end'}>
                            <button type={"submit"} className={'btn'}>댓글등록</button>
                        </div>
                    </form>
                    <div>
                        {
                            commentList.map(item => {
                            return (
                                <div>

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