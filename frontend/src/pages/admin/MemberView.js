import React, {useState, useEffect} from 'react';
import Pagenation from "../common/Pagenation";

function MemberView(props) {

    const [userList, setUserList] = useState([]);
    const [qNum, setQNum] = useState(3);
    const [size, setSize] = useState(5);
    return (
        <div className={"border"}>
            <h3>회원 관리</h3>
            <table className={'table'}>
                <thead>
                <tr className={'text-center'}>
                    <th>아이디</th>
                    <th>별명</th>
                    <th>이메일</th>
                    <th>전화번호</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    userList.map(item => {
                        return (
                            <tr key={item.boardPk}>
                                <td>{item.boardPk}</td>
                                <td>
                                    <a href={'/admin/question/' + item.boardPk} className={'btn'}>{item.boardTitle}
                                        {item.commentNumber == 0 ? "" : ` (${item.commentNumber})`}</a>
                                </td>
                                <td>{item.boardWriterName}</td>
                                <td>{item.boardDatetime}</td>
                                <td>
                                    <div>
                                        <button type={"button"}>등급</button>
                                        <button type={"button"}>제한</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <Pagenation
                setList={setUserList}
                url={"/api/admin/getQuestions"}
                numberUrl={"/api/admin/getQuestionNumber"}
                howManyContentsInAPage={qNum}
                howManyPagesInABlock={size}
                searchType={[]}
            />
        </div>
    );
}

export default MemberView;