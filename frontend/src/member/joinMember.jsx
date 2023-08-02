import React from 'react';
function joinMember(props) {

    return (
        <div className={'container my-3'}>
            <div className={'row'}>
                <div className={'col-sm-6 mx-auto'}>
                    <div className={'my-3'}>
                        <label htmlFor={'id'} className={'form-label'}>아이디 : </label>
                        <input type={'text'} className={'form-control'} id={'id'} />
                    </div>
                    <div className={'my-3'}>
                        <label htmlFor={'password'} className={'form-label'}>비밀번호 : </label>
                        <input type={'password'} className={'form-control'} id={'password'} />
                    </div>
                    <div className={'my-3'}>
                        <label htmlFor={'passwordRe'} className={'form-label'}>비밀번호 확인 : </label>
                        <input type={'password'} className={'form-control'} id={'passwordRe'} />
                    </div>
                    <div className={'d-flex my-3'}>
                        <label htmlFor={'email'} className={'form-label'}>이메일 : </label>
                        <input type={'text'} className={'form-control'} id={'email'} />
                        <select className={'form-select'}>
                            <option value={'naver.com'}>naver.com</option>
                            <option value={'daum.net'}>daum.net</option>
                            <option value={'nate.com'}>nate.com</option>
                        </select>
                    </div>
                    <div className={'d-flex my-3'}>
                        <select className={'form-select'}>
                            <option value={'010'}>010</option>
                            <option value={'011'}>011</option>
                            <option value={'012'}>012</option>
                        </select>
                        <input type={'text'} className={'form-control'} />
                    </div>
                    <div className={'my-3'}>
                        <input type={'text'} className={'form-control'} placeholder={'주소'} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default joinMember;