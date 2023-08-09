import React from 'react';
import {Link, useNavigate} from "react-router-dom";

function CheckLogin(props) {

    const navi = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("grade");
        // 일단은 로그인 페이지로 이동
        navi("/");
    }

    return (
        <div>
            <p><span>{sessionStorage.getItem("name")}</span>님 반갑습니다.</p>
            <button type={"button"} className={"btn btn-primary"} onClick={handleLogout} >로그아웃</button>
            <Link to={'/myLogin'} className={'btn btn-success ms-2'}>내 정보</Link>
        </div>
    )
}

export default CheckLogin;