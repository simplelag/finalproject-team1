import React, {useState, useEffect} from 'react';
import axios from "axios";
import Pagenation from "../common/Pagenation";

function QuestionView(props) {
    const [boardList, setBoardList] = useState([]);
    const [qNum, setQNum] = useState(3);
    const [size, setSize] = useState(5);
    return (
        <div>
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
                setList={setBoardList} // 보여줄 게시글 리스트를 설정하는 setList에 원하는 useState를 넘겨줌
                url={"/api/admin/getQuestions"} // 보여줄 게시글 리스트를 반환해주는 컨트롤러 주소(한번에 한페이지만 불러옴)
                numberUrl={"/api/admin/getQuestionNumber"} // 보여줄 게시글 리스트의 총 개수를 반환해주는 컨트롤러 주소
                howManyContentsInAPage={qNum} // 한 페이지당 보여줄 게시글 갯수
                howManyPagesInABlock={size} // 한 번에 표시할 페이지 버튼 개수
            />
        </div>
    );
}

export default QuestionView;