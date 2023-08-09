import React, {useState} from 'react';
import {Link} from "react-router-dom";

function MyLogin(props) {

    const [grade, setGrade] = useState(sessionStorage.getItem("grade"));

    // 회원등급을 영어로 해서 한글로 설정하기
    switch (grade) {
        case "user" :
            setGrade("일반 사용자");
    }

    return (
        <div className={'container my-3'}>
            <h1 className={'display-4 mb-3 text-center'}>마이페이지</h1>
            <div className={'border border-2'}>
                <div className={'row'}>
                    <div className={'col-sm-5 ms-4'}>
                        <div className={'row my-4'}>
                            <p className={'ms-3'}>회원 정보 <Link to={'/login/myLoginUpdate'} className={'btn btn-success ms-2'}>회원정보 수정</Link></p>
                            <div className={'col-sm-4 text-center'}>
                                <p>아이디</p>
                                <p>닉네임</p>
                                <p>회원등급</p>
                            </div>
                            <div className={'col-sm-7 text-center'}>
                                <p>{sessionStorage.getItem("id")}</p>
                                <p>{sessionStorage.getItem("name")}</p>
                                <p>{grade}</p>
                            </div>
                        </div>
                    </div>
                    <div className={'col-sm-6 my-4 ms-5 d-grid text-center'}>
                        <button type={"button"} className={'btn btn-warning'} style={{width : '75%'}}>장바구니</button>
                        <button type={"button"} className={'btn btn-primary'} style={{width : '75%'}}>장바구니</button>
                        <button type={"button"} className={'btn btn-warning'} style={{width : '75%'}}>장바구니</button>
                        <button type={"button"} className={'btn btn-danger'} style={{width : '75%'}}>장바구니</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyLogin;