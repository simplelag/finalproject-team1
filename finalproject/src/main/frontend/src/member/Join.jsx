import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import {Link} from "react-router-dom";

function join(props) {

    const [userId, setUserId] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]);
    const [isRemember, setIsRemember] = useState(false);

    useEffect(() => {
        if(cookies.rememberUserId !== undefined){
            setUserId(cookies.rememberUserId);
            setIsRemember(true);
        }
    }, []);

    const handleOnChange= (e) => {
        setIsRemember(e.target.checked);
        if (!e.target.checked) {
            removeCookie("rememberUserId");
        }
    }

    return (
        <div className={'container my-3'}>
            <div className={'row'}>
                <div className="col-sm-4 mx-auto">
                    <form action="/login" method="post">
                        <div className="my-3">
                            <label htmlFor="user-id" className="form-label">ID : </label>
                            <input type="text" className="form-control" id="user-id" name="username" placeholder="비밀번호를 입력하세요" />
                        </div>
                        <div className="my-3">
                            <label htmlFor="user-password" className="form-label">ID : </label>
                            <input type="password" className="form-control" id="user-password" name="password" placeholder="비밀번호를 입력하세요" />
                        </div>
                        <div>
                        <input type="checkbox" className="saveId-cb" id="saveId" name="saveId"
                            onChange={(e) => { handleOnChange(e); }} checked={isRemember} />
                        </div>
                        <div className="my-3 d-grid gap-3">
                            <button type={'submit'} className={'btn btn-primary'}>로그인</button>
                            <Link to={'/sign'} className={'btn btn-warning'}>회원가입</Link>
                            {/*<input type="hidden" th:name="${_csrf?.parameterName}" th:value="${_csrf?.token}">*/}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default join;