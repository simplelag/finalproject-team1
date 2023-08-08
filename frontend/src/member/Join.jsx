import React, {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import {Link} from "react-router-dom";

function Join(props) {

    const [userId, setUserId] = useState('');

    const [cookies, setCookies, removeCookies] = useCookies(['rememberUserId']);

    const [isRemember, setIsRemember] = useState(false);

    useEffect(() => {
        if(cookies.rememberUserId !== undefined){
            setUserId(cookies.rememberUserId);
            setIsRemember(true);
        }
    }, [cookies]);

    const handleId = (e) => { setUserId(e.target.value)}

    // 아이디 저장 체크박스가 바뀔 때 작동하는거라서 id만 바꾸고 로그인을 시도하면 저장되지 않음
    // 이벤트를 제대로 작동할 위치를 찾지 못함
    // 체크박스에서는 true, false만 해주고, 로그인 버튼에서 isRemember를 보고 쿠기를 수정함 
    const handleOnChange= (e) => {
        setIsRemember(e.target.checked);
    }

    const buttonOnClick = (e) => {
        // 나중에 로그인 성공했을 때만 하도록 저장하도록 하기
        if(isRemember){
            setCookies('rememberUserId', userId);
        } else if (!isRemember) {
            removeCookies("rememberUserId");
        }
    }

    return (
        <div className={'container my-3'}>
            <div className={'row'}>
                <div className="col-sm-4 mx-auto">
                    <form action="/login" method="post">
                        <div className="my-3">
                            <label htmlFor="userId" className="form-label">ID : </label>
                            <input type="text" className="form-control" id="userId" name="userId" value={userId} placeholder="아이디를 입력하세요" onChange={handleId}/>
                        </div>
                        <div className="my-3">
                            <label htmlFor="user-password" className="form-label">Password : </label>
                            <input type="password" className="form-control" id="user-password" name="password" placeholder="비밀번호를 입력하세요" />
                        </div>
                        <div>
                        <input type="checkbox" className="saveId" id="saveId" name="saveId"
                            onChange={ handleOnChange } checked={isRemember} /> 아이디 저장
                        </div>
                        <div className="my-3 d-grid gap-3">
                            <button type={'submit'} className={'btn btn-primary'} onClick={buttonOnClick}>로그인</button>
                            <Link to={'/sign'} className={'btn btn-warning'}>회원가입</Link>
                            {/*<input type="hidden" th:name="${_csrf?.parameterName}" th:value="${_csrf?.token}">*/}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Join;