import React, {useState, useEffect} from 'react';
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

function Admin(props) {
    // const id = props.id;
    // axios.get("/")
    alert("admin");
    return (
        <div>
            {/*<Header />*/}
            <div className={"container"}>
                <div className={"adminInfo"}>
                    <h3>관리자 정보</h3>
                    <p>ID </p>
                    <p>이름 </p>
                    <p>등급 </p>
                </div>
            </div>
            {/*<Footer />*/}
        </div>
    );
}

export default Admin;