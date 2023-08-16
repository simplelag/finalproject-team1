import React, {useState, useEffect} from 'react';
import Pagenation from "../common/Pagenation";
import axios from "axios";

function MemberView(props) {

    const [userList, setUserList] = useState([]);
    const [qNum, setQNum] = useState(3);
    const [size, setSize] = useState(5);
    const [authority, setAuthority] = useState("");

    const handleAuthorityBtn = (e) => {
        setAuthority(e.target.value);
    }

    const [showTr, setShowTr] = useState("");

    const handleTr = (e) => {
        if (showTr == e.target.value) {
            setShowTr("")
        } else {
            setShowTr(e.target.value);
        }
    }

    const editAuth = (e) => {
        const value = e.target.value.split("_");
        const id = value[0];
        const auth = value[1];



        console.log(`id: ${id}, auth: ${auth}`);
        axios.put(
            "/api/admin/editAuth",
            null,
            {
                params: {
                    id: id,
                    authority: auth
                }
            })
            .then(res => {
            })
            .catch()
    }


    return (
        <div className={"border"}>
            <div className={"d-flex justify-content-between"}>
                <h3>회원 관리</h3>
                <div>
                    <button onClick={handleAuthorityBtn} value={""}
                            className={`btn ${authority == "" ? "active" : ""}`}>전체회원
                    </button>
                    <button onClick={handleAuthorityBtn} value={"user"}
                            className={`btn ${authority == "user" ? "active" : ""}`}>일반회원
                    </button>
                    <button onClick={handleAuthorityBtn} value={"admin"}
                            className={`btn ${authority == "admin" ? "active" : ""}`}>관리자
                    </button>
                    <button onClick={handleAuthorityBtn} value={"block"}
                            className={`btn ${authority == "block" ? "active" : ""}`}>차단된 회원
                    </button>
                </div>
            </div>

            <table className={'table text-center'}>
                <colgroup>
                    <col style={{width: "20%"}}/>
                    <col style={{width: "10%"}}/>
                    <col style={{width: "20%"}}/>
                    <col style={{width: "20%"}}/>
                    <col style={{width: "20%"}}/>
                    <col style={{width: "10%"}}/>
                </colgroup>
                <thead>
                <tr className={'text-center'}>
                    <th>가입일</th>
                    <th>등급</th>
                    <th>아이디</th>
                    <th>별명</th>
                    <th>이메일</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    userList.map(item => {
                        return (
                            <React.Fragment key={item.memberId}>
                                <tr id={item.memberId}>
                                    <td>{item.memberDatetime.split("T")[0]}</td>
                                    <td>
                                        <select name="authEdit" value={`${item.memberId}_${item.memberAuthority}`} onChange={editAuth}>
                                            <option value={`${item.memberId}_user`}>user</option>
                                            <option value={`${item.memberId}_block`}>block</option>
                                            <option value={`${item.memberId}_admin`}>admin</option>
                                        </select>
                                    </td>
                                    <td>{item.memberId}</td>
                                    <td>
                                        {item.memberName}
                                    </td>
                                    <td>{item.memberEmail}</td>
                                    <td>
                                        <div>
                                            <button value={item.memberId} type={"button"} onClick={handleTr}>상세</button>
                                        </div>
                                    </td>
                                </tr>

                                <tr style={showTr == item.memberId ? {visibility: "visible"} : {visibility: "collapse"}}>
                                    <td colSpan={"6"} className={"bg-secondary bg-opacity-10 text-start"}>
                                        <div className={"mx-4 my-3"}>
                                            <p>전화번호 : {item.memberPhone}</p>
                                            <p>주소 : {item.memberAddress}</p>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        )
                    })
                }
                </tbody>
            </table>
            <Pagenation
                key={authority} // key값이 바뀔 때마다 컴포넌트가 강제로 언마운트되었다가 다시 마운트됨 => 리렌더링됨
                setList={setUserList}
                url={`/api/admin/getMembers?authority=${authority}`}
                numberUrl={`/api/admin/getMemberCount?authority=${authority}`}
                howManyContentsInAPage={qNum}
                howManyPagesInABlock={size}
                searchType={[]}
                order={"memberDatetime,DESC"}
            />
        </div>
    );
}

export default MemberView;