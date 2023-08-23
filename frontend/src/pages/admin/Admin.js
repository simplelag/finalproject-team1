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

    const [view, setView] = useState(props.view || "questionView");

    const styleAdmin = {
      info:{
          padding:"1rem 2rem",
          borderRadius:"1rem",
          marginBottom:"1rem"
      },
      view:{
          padding:"1rem 2rem",
          borderRadius:"1rem",
          marginBottom:"1rem"
      }
    };


    let div = <>
        <div>
            <Header/>
            <div className={"container"}>
                <div className={"adminInfo border"} style={styleAdmin.info}>
                    <h3>관리자 정보</h3>
                    <div className={"d-flex justify-content-between"}>

                        <div className={"adminInfo"}>
                            <p>ID {id}</p>
                            <p>이름 {name}</p>
                            <p>등급 {grade}</p>
                        </div>

                        <div className={"d-flex flex-column"}>
                            <button type={"button"}  className={`btn ${view=="questionView"? "active":""}`}
                                    onClick={() => {
                                        setView("questionView");
                                    }}>문의관리
                            </button>
                            <button type={"button"} className={`btn ${view=="memberView"? "active":""}`}
                                    onClick={() => {
                                        setView("memberView");
                                    }}>회원관리
                            </button>
                            <button type={"button"}  className={`btn ${view=="itemView"? "active":""}`}
                                    onClick={() => {
                                        setView("itemView");
                                    }}>상품관리
                            </button>
                        </div>
                    </div>
                </div>

                <div className={"listSection border"} style={styleAdmin.view}>
                    {
                        view=="itemView"?
                            <ItemView /> : view=="memberView"?
                                <MemberView /> :
                                <QuestionView />
                    }
                </div>

            </div>
            <Footer/>
        </div>
    </>;
    return div;
}

export default Admin;