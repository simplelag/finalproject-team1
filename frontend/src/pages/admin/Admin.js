import React, {useState, useEffect} from 'react';

import axios from "axios";
import MemberView from "./MemberView";
import QuestionView from "./QuestionView";
import ItemView from "./ItemView";
import Footer from "../mainPages/Footer";
import Header from "../mainPages/Header";


function Admin(props) {
    const id = sessionStorage.getItem("id");
    const grade = sessionStorage.getItem("grade");
    const name = sessionStorage.getItem("name");
    if(grade != "admin"){
        window.location.href = "/";
    }


    const [memberView, setMemberView] = useState(true);
    const [questionView, setQuestionView] = useState(false);
    const [itemView, setItemView] = useState(false);


    let div = <>
        <div>
            <Header/>
            <div className={"container"}>
                <div className={"adminInfo border"}>
                    <h3>관리자 정보</h3>
                    <div className={"d-flex justify-content-between"}>

                        <div className={"adminInfo"}>
                            <p>ID {id}</p>
                            <p>이름 {name}</p>
                            <p>등급 {grade}</p>
                        </div>

                        <div className={"d-flex flex-column"}>
                            <button type={"button"} className={"btn"}
                                    onClick={() => {
                                        setMemberView(true);
                                        setQuestionView(false);
                                        setItemView(false)
                                    }}>회원관리
                            </button>
                            <button type={"button"} className={"btn"}
                                    onClick={() => {
                                        setMemberView(false);
                                        setQuestionView(true);
                                        setItemView(false)
                                    }}>문의관리
                            </button>
                            <button type={"button"} className={"btn"}
                                    onClick={() => {
                                        setMemberView(false);
                                        setQuestionView(false);
                                        setItemView(true)
                                    }}>상품관리
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"listSection"}>
                    {memberView && <MemberView/>}
                    {questionView && <QuestionView/>}
                    {itemView && <ItemView/>}
                </div>

            </div>
            <Footer/>
        </div>
    </>;
    return div;
}

export default Admin;