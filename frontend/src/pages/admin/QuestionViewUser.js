import React, {useState, useEffect} from 'react';
import axios from "axios";
import Pagenation from "../common/Pagenation";

function QuestionViewUser(props) {
    const [boardList, setBoardList] = useState([]);
    const [qNum, setQNum] = useState(5);
    const [size, setSize] = useState(5);
    const handleQNum = (e) => {
        setQNum(e.target.value);
    }
    return (
        <div className={"border"}>
            <select name="contentsCount" value={qNum} onChange={handleQNum} className={"float-end"}>
                <option value="5">5개씩 보기</option>
                <option value="10">10개씩 보기</option>
                <option value="30">30개씩 보기</option>
            </select>
            <table className={'table border-top'}>
                <thead>
                <tr className={'text-center'}>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                { boardList.length==0?
                    <tr><td colSpan={4} className={"text-center"}>문의 내역이 없습니다.</td></tr> :
                    boardList.map(item => {
                        return (
                            <tr key={item.boardPk}>
                                <td>{item.boardPk}</td>
                                <td>
                                    <a href={'/admin/question/' + item.boardPk} className={'btn'}>{item.boardTitle}
                                        {item.commentNumber==0 ? "" : ` (${item.commentNumber})`}</a>
                                </td>
                                <td>{item.boardWriterName}</td>
                                <td>{item.boardDatetime}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <Pagenation
                key={qNum}
                setList={setBoardList}
                url={`/board/getQuestionsUser/${props.id}`}
                numberUrl={`/board/getQuestionsCountUser/${props.id}`}
                howManyContentsInAPage={qNum}
                howManyPagesInABlock={size}
                searchType={["제목","내용","제목+내용"]}
                order={"boardPk,DESC"}
            />
        </div>
    );
}

export default QuestionViewUser;