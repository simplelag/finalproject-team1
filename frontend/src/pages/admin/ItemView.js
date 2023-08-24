import React, {useState, useEffect, Fragment} from 'react';
import Pagenation from "../common/Pagenation";
import axios from "axios";

function ItemView(props) {

    const [itemList, setItemList] = useState([]);
    const [qNum, setQNum] = useState(10);
    const [size, setSize] = useState(5);
    const [disabledList, setDisabledList] = useState("all");
    const [text, setText] = useState("");
    const [showTr, setShowTr] = useState("");

    const onClickDisabledList = (e) => {
        setDisabledList(e.target.value);
    };

    const handleQNum = (e) => {
        setQNum(e.target.value);
    }

    const handleText = (e) => {
        setText(e.target.value);
    }

    const send = (e) => {
        const salePk = e.target.value;
        const disabledReason = text;
        axios.put("/api/admin/editDisabled", null,
            {
                params: {
                    salePk: salePk,
                    disabled: disabledReason
                }
            })
            .then(() => {
                const updatedItemList = itemList.map((item) => {
                    if (item.salePk == salePk) {
                        return {...item, saleDisabled: disabledReason};
                    }
                    return item;
                })
                console.log(updatedItemList);
                setItemList(updatedItemList);
            })
    }

    const show = (e) => {
        if (showTr == e.target.id) {
            setShowTr("");
            setText("");
        } else {
            setShowTr(e.target.id);
            setText(e.target.value);
        }
    }

    return (
        <div className={""}>
            <div className={"d-flex justify-content-between align-items-center"}>
                <h3>판매중인 상품 관리</h3>

                <div>
                    <button onClick={onClickDisabledList} value={"all"}
                            className={`btn ${disabledList == "all" ? "active" : ""}`}>전체 상품
                    </button>
                    <button onClick={onClickDisabledList} value={"able"}
                            className={`btn ${disabledList == "able" ? "active" : ""}`}>판매가능 상품
                    </button>
                    <button onClick={onClickDisabledList} value={"disable"}
                            className={`btn ${disabledList == "disable" ? "active" : ""}`}>판매중지 상품
                    </button>
                </div>

                <select name="contentsCount" value={qNum} onChange={handleQNum} className={"form-select w-25"}>
                    <option value="10">10개씩 보기</option>
                    <option value="30">30개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                    <option value="100">100개씩 보기</option>
                </select>
            </div>

            <table className={'table text-center border-top'}>
                <colgroup>
                    <col style={{width: "10%"}}/>
                    <col style={{width: "28%"}}/>
                    <col style={{width: "10%"}}/>
                    <col style={{width: "10%"}}/>
                    <col style={{width: "8%"}}/>
                    <col style={{width: "4%"}}/>
                </colgroup>
                <thead>
                <tr className={'text-center'}>
                    <th>번호</th>
                    <th>제목</th>
                    <th>아이디</th>
                    <th>닉네임</th>
                    <th>판매가능여부</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    itemList.map((item) => {
                        return (
                            <Fragment key={item.salePk}>
                                <tr>
                                    <td>{item.salePk}</td>
                                    <td className={"text-start"}>{item.saleBookTitle}</td>
                                    <td>{item.saleSellerId}</td>
                                    <td>{item.saleSellerName}</td>
                                    <td key={item.saleDisabled}>{item.saleDisabled ? "불가능" : "가능"}</td>
                                    <td>
                                        <button className={"btn btn-outline-purple py-0 float-end"} type={"button"}
                                                id={item.salePk} value={item.saleDisabled} onClick={show}>상세
                                        </button>
                                    </td>
                                </tr>
                                <tr style={showTr == item.salePk ? {visibility: "visible"} : {visibility: "collapse"}}>
                                    <td className={"bg-secondary bg-opacity-10"} colSpan={6}>
                                        <div className={"d-flex container"}>
                                            <div>
                                                <img src={item.saleImgSrc} alt={item.saleBookTitle}/>
                                            </div>
                                            <div
                                                className={"text-start container m-3 d-flex flex-column justify-content-between"}>
                                                <div>
                                                    <span>Book Id : {item.saleBookId}</span><br/>
                                                    <span>등록 시간 : {item.saleDateTime}</span><br/>
                                                    <span>상태 : {item.bookGrade == 1 ? "좋음" : item.bookGrade == 2 ? "보통" : "나쁨"}</span><br/>
                                                    <span>설명 : {item.saleDiscription}</span><br/>
                                                </div>


                                                <div className={"input-group"}>
                                                    <input type="text" value={text}
                                                           onChange={handleText}
                                                           className={"form-control"}
                                                           placeholder={"판매중지 사유, 입력시 판매중지"}
                                                    />
                                                    <button type={"button"}
                                                            onClick={send}
                                                            value={item.salePk}
                                                            className={"btn btn-outline-purple"}
                                                    >확인
                                                    </button>

                                                </div>

                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </Fragment>

                        )
                    })
                }
                </tbody>
            </table>
            <Pagenation
                key={disabledList + qNum} // key값이 바뀔 때마다 컴포넌트가 강제로 언마운트되었다가 다시 마운트됨 => 리렌더링됨
                setList={setItemList}
                url={`/api/admin/getSellingBookList?disabled=${disabledList}`}
                numberUrl={`/api/admin/countSellingBookList?disabled=${disabledList}`}
                howManyContentsInAPage={qNum}
                howManyPagesInABlock={size}
                searchType={["제목", "아이디/닉네임", "내용"]}
                order={"salePk,DESC"}
            />
        </div>
    );
}

export default ItemView;