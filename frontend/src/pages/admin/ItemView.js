import React, {useState, useEffect} from 'react';
import Pagenation from "../common/Pagenation";
import axios from "axios";

function ItemView(props) {

    const [itemList, setItemList] = useState([]);
    const [qNum, setQNum] = useState(10);
    const [size, setSize] = useState(5);
    const [disabledList, setDisabledList] = useState("all");

    const onClickDisabledList = (e)=> {
        setDisabledList(e.target.value);
    };

    const handleQNum = (e) => {
        setQNum(e.target.value);
    }

    return (
        <div className={"border"}>
            <div className={"d-flex justify-content-between align-items-center"}>
                <h3>회원 관리</h3>

                <div>
                    <button onClick={onClickDisabledList} value={"all"}
                            className={`btn ${disabledList == "all" ? "active" : ""}`}>전체 상품
                    </button>
                    <button onClick={onClickDisabledList} value={"able"}
                            className={`btn ${disabledList == "able" ? "active" : ""}`}>판매가능 상품
                    </button>
                    <button onClick={onClickDisabledList} value={"disable"}
                            className={`btn ${disabledList == "disable" ? "active" : ""}`}>판매금지 상품
                    </button>
                </div>

                <select name="contentsCount" value={qNum} onChange={handleQNum}>
                    <option value="10">10개씩 보기</option>
                    <option value="30">30개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                    <option value="100">100개씩 보기</option>
                </select>
            </div>

            <table className={'table text-center border-top'}>
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

                }
                </tbody>
            </table>
            {/*<Pagenation*/}
            {/*    key={disabledList+qNum} // key값이 바뀔 때마다 컴포넌트가 강제로 언마운트되었다가 다시 마운트됨 => 리렌더링됨*/}
            {/*    setList={setItemList()}*/}
            {/*    url={`/api/admin/getMembers?authority=${authority}`}*/}
            {/*    numberUrl={`/api/admin/getMemberCount?authority=${authority}`}*/}
            {/*    howManyContentsInAPage={qNum}*/}
            {/*    howManyPagesInABlock={size}*/}
            {/*    searchType={[]}*/}
            {/*    order={"memberDatetime,DESC"}*/}
            {/*/>*/}
        </div>
    );
}

export default ItemView;