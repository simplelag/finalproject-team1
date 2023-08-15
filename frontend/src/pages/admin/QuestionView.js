import React, {useState, useEffect} from 'react';
import axios from "axios";
import Pagenation from "../common/Pagenation";

function QuestionView(props) {
    const [boardList, setBoardList] = useState([]);
    const [qNum, setQNum] = useState(3);
    const [size, setSize] = useState(5);
    return (
        <div className={"border"}>
            <table className={'table'}>
                <thead>
                <tr className={'text-center'}>
                    <th>글번호</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                {
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
                setList={setBoardList}
                url={"/api/admin/getQuestions"}
                numberUrl={"/api/admin/getQuestionsCount"}
                howManyContentsInAPage={qNum}
                howManyPagesInABlock={size}
                searchType={["제목","내용","제목+내용","작성자"]}
                order={"boardPk,DESC"}
            />
        </div>
    );
}

export default QuestionView;