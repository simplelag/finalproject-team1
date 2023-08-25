import React, {Fragment, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import DaumPostcode, {useDaumPostcodePopup} from 'react-daum-postcode';
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";


function JoinMember(props) {

    const navi = useNavigate();

    // 아이디
    const [userId, setUserId] = useState('');
    // 중복 확인 버튼에서 사용 가능한 id가 나온 경우를 체크
    const [userIdCheck, setUserIdCheck] = useState('');

    // 비밀번호
    const[ password, setPassword] = useState('');
    const[ passwordRe, setPasswordRe] = useState('');

    // 이름
    const[name, setName] = useState('');
    // 이름 중복 체크
    const [nameCheck, setNameCheck] = useState(false);

    // 이메일
    const [emailFirst, setEmailFirst] = useState('');
    const [emailLast, setEmailLast] = useState('');
    // 이메일 직접 입력 시 input type을 email로 바꾸기 위해서
    const [emailFlag, setEmailFlag] = useState(true);
    // 이메일 검증
    const [emailTest, setEmailTest] = useState(false);

    // 폰 번호
    const [phoneFirstNumber, setPhoneFirstNumber] = useState('010');
    const [phoneMiddleNumber, setPhoneMiddleNumber] = useState('');
    const [phoneLastNumber, setPhoneLastNumber] = useState('');

    // 우편번호 및 주소
    const [zoneCode, setZoneCode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [roadAddressDetail, setRoadAddressDetail] = useState('');

    // 약관 동의
    const [isAgree, setIsAgree] = useState(false);

    // 최대 입력 수 제한, 특수문자 제한
    function stopText(e, maxValue, type){
        // 최대 입력 수 제한, 한글이 최대 입력 수 넘어가는 것도 제한
        let value = e.target.value.slice(0, maxValue);
        switch(type){
            case 1:{
                // 영문,숫자만 입력
                value = value.replace(/[^a-zA-Z0-9]/g, "")
                return value;
                break;
            }
            case 2:{
                // 한글만 입력
                value = value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "")
                return value;
                break;
            }
            case 3:{
                // 특수문자 제한
                value = value.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi, "")
                return value;
                break;
            }
            case 4:{
                // 한글, 숫자만 입력
                value = value.replace(/[^^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9]/g, "")
                return value;
                break;
            }
            case 5:{
                // 숫자만 입력
                value = value.replace(/[^0-9]/g, "")
                return value;
                break;
            }
        }
    }

    // 아이디
    const handleUserId = (e) => {
        // 영문,숫자만 사용
        const value = stopText(e,10,1);
        setUserId(value);
    }

    // 아이디 중복 체크
    const btnDoubleCheck = (e) => {
        axios.get("http://localhost:8080/sign/idCheck", {
            params:{
                userId : userId
            }
        })
            .then(res => {
                if(res.data == true){
                    alert("사용불가 id 입니다.")
                    setUserId('');
                }else{
                    alert("사용가능한 Id 입니다.")
                    setUserIdCheck(userId);
                }
            })
    }

    // 비밀번호랑 비밀번호 확인이랑 같은지 확인
    const handlePassword = (e) => {setPassword(e.target.value)}
    const handlePasswordRe = (e) => {setPasswordRe(e.target.value)}

    // 이름
    const handleName = (e) => {
        const name = stopText(e, 50, 3);
        setName(name);
    }

    // 이름 중복 체크
    const handleNameCheck = (e) => {
        axios.get("http://localhost:8080/sign/nameCheck",{
            params:{
                name : name
            }
        })
            .then(res => {
                if(res.data === true){
                    setNameCheck(true)
                }else{
                    setNameCheck(false)
                }
            })
            .catch(err => {
                console.log("닉네임 중복 체크 실패");
            })
    }

    // 이메일
    const handleEmailFirst= (e)=>{
        setEmailFirst(e.target.value);
    }

    const handleEmailLast = (e) => {
        setEmailFlag(e.target.value == '' ? true : false)
        setEmailLast(e.target.value);
    }

    // 다른 방법을 못 찾겠음
    // 이메일 첫번째 input 태그 검증
    const emailFirstVal = (e) => {
        let a = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if(emailFlag){
            // emailFlag === true => email
            if(a.test(emailFirst)) {
                setEmailTest(true);
            }else{
                setEmailTest(false);
            }
        }else if(!emailFlag){
            // emailFlag === false => text
            if(a.test(emailFirst)) {
                setEmailTest(false);
            }else{
                setEmailTest(true);
            }
        }
    }

    // 이메일 두번째 input 태그 검증
    const emailLastVal = (e) => {
        let a = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if(emailFlag){
            if(a.test(emailFirst)) {
                setEmailTest(true);
            }else{
                setEmailTest(false);
            }
        }else if(!emailFlag){
            if(a.test(emailFirst)) {
                setEmailTest(false);
            }else{
                setEmailTest(true);
            }
        }
    }

    // 휴대폰
    const handlePhoneFirst = (e) => setPhoneFirstNumber(e.target.value);
    const handlePhoneMiddle = (e) => {
        // 숫자만 입력
        const middle = stopText(e,4,5);
        setPhoneMiddleNumber(middle);
    }
    const handlePhoneLast = (e) => {
        // 숫자만 입력
        const last = stopText(e,4,5);
        setPhoneLastNumber(last);
    }

    // 우편번호 및 주소 검색
    // scriptUrl : Daum 우편번호 서비스의 스크립트 주소입니다. default값이 정해져있음
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    // 우편 번호 찾기 클릭 시 작동되는 것
    const open = useDaumPostcodePopup(scriptUrl);

    // 클릭 시 팝업창(검색창)
    const handleComplete = (data) => {
        let roadAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            roadAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        // 우편 번호
        setZoneCode(data.zonecode);
        // 도로명 주소(기본주소로 보통은 도로명 주소이지만 아닐 경우가 있음)
        setRoadAddress(roadAddress);
    };

    // 우편 번호 찾기 클릭 시 발생하는 이벤트
    const handleBtnZoneCode = () => {
        open({ onComplete: handleComplete });
    };

    // 상세주소 입력
    const handleRoadAddDetail = (e) => {
        const addDetail = stopText(e, 100, 4)
        setRoadAddressDetail(addDetail);
    }

    // 약관 동의
    const handleAgree = (e) => {
        if(isAgree == false){
            setIsAgree(true);
        }else{
            setIsAgree(false);
        }
    }

    // 회원가입 버튼 클릭 시
    const btnJoinMember = (e) => {
        if(userId === ''){
            alert("아이디를 입력하세요");
        }else if(password === '' || passwordRe === ''){
            alert("비밀번호를 입력하세요");
        } else if(name === ''){
            alert("닉네임을 입력하세요");
        } else if(emailFirst ==='' && emailLast === ''){
            alert("이메일을 입력하세요");
        }else if(phoneMiddleNumber === '' || phoneLastNumber === ''){
            alert("휴대전화 번호를 입력하세요");
        }else if(zoneCode === ''){
            alert("우편 번호 찾기를 누르세요");
        }else if(roadAddressDetail === ''){
            alert("상세주소를 입력하세요");
        } else if(!isAgree) {
            alert("약관에 동의해주세요");
        }else if(userIdCheck === '' || userId !== userIdCheck){
            alert("아이디 중복 확인을 해주세요");
        }else if(nameCheck){
            alert("닉네임이 중복입니다.");
        } else if(!emailTest){
            alert("이메일의 형식이 올바르지 않습니다.")
        }
        else if(userId === userIdCheck && password === passwordRe) {
            axios.post("http://localhost:8080/sign/signup", null, {
                params: {
                    userId: userId,
                    password: password,
                    name: name,
                    email: emailFirst + emailLast,
                    phone: phoneFirstNumber + '-' + phoneMiddleNumber + '-' + phoneLastNumber,
                    address: zoneCode + '/' + roadAddress + '/' + roadAddressDetail,
                    authority: "user"
                }
            })
                .then(res => {
                    navi('/login');
                })
        }
    }

    return (
        <Fragment>
            <Header />
            <h1 className={'display-4 mb-3 text-center'}>회원가입</h1>
            <div className={'row'}>
                <div className={'col-sm-8 mx-auto'}>
                    <div className={'form-group d-flex'}>
                        <div className={'col-sm-2 d-flex justify-content-center'}>
                            <label htmlFor={'id'} className={'form-label align-self-center mt-1'}>아이디</label>
                        </div>
                        <div className={'col-sm-5'}>
                            <input type={'text'} className={'form-control'} id={'id'} value={userId} onChange={handleUserId}/>
                        </div>
                        <div className={'col-sm-2'}>
                            <button type={'button'} className={'btn btn-primary ms-2'} onClick={btnDoubleCheck}>중복체크</button>
                        </div>
                    </div>
                    <div className={'form-group d-flex mt-3'}>
                        <div className={'col-sm-2 d-flex justify-content-center'}>
                            <label htmlFor={'password'} className={'form-label align-self-center mt-1'}>비밀번호</label>
                        </div>
                        <div className={'col-sm-5'}>
                            <input type={'password'} className={'form-control'} id={'password'} value={password} onChange={handlePassword}/>
                        </div>
                    </div>
                    <div className={'form-group d-flex mt-3'}>
                        <div className={'col-sm-2 d-flex justify-content-center'}>
                            <label htmlFor={'passwordRe'} className={'form-label align-self-top mt-1'}>비밀번호 확인</label>
                        </div>
                        <div className={'col-sm-5'}>
                            <input type={'password'} className={'form-control'} id={'passwordRe'} value={passwordRe} onChange={handlePasswordRe}/>
                            {password !== passwordRe ? <p className={'mt-1 text-danger'}>비밀번호가 같지 않습니다.</p> : null}
                        </div>
                    </div>
                    <div className={'form-group d-flex mt-3'}>
                        <div className={'col-sm-2 d-flex justify-content-center'}>
                            <label htmlFor={'name'} className={'form-label align-self-top mt-1'}>닉네임</label>
                        </div>
                        <div className={'col-sm-5'}>
                            <input type={'name'} className={'form-control'} id={'name'} value={name} onBlur={handleNameCheck} onChange={handleName}/>
                        </div>
                    </div>
                    <div className={'form-group d-flex mt-3'}>
                        <div className={'col-sm-2 d-flex justify-content-center'}>
                            <label htmlFor={'emailFirst'} className={'form-label align-self-center mt-1'}>이메일</label>
                        </div>
                        <div className={'col-sm-4'}>
                            <input type={emailFlag === true ? 'email' : 'text'} className={'form-control'} id={'emailFirst'} name={'emailFirst'} value={emailFirst} onBlur={emailFirstVal} onChange={handleEmailFirst}/>
                        </div>
                        <div className={'align-self-center mt-1'}>@</div>
                        <div className={'col-sm-4'}>
                            <select className={'form-select'} id={'emailLast'} onBlur={emailLastVal} onChange={handleEmailLast} value={emailLast}>
                                <option value={''}>직접 입력</option>
                                <option value={'@naver.com'}>naver.com</option>
                                <option value={'@daum.net'}>daum.net</option>
                                <option value={'@nate.com'}>nate.com</option>
                                <option value={'@bict.co.kr'}>bict.co.kr</option>
                            </select>
                        </div>
                    </div>
                    <div className={'form-group d-flex mt-3'}>
                        <div className={'col-sm-2 d-flex justify-content-center'}>
                            <label htmlFor={'phoneMiddleNumber'} className={'form-label align-self-center mt-1'}>전화번호</label>
                        </div>
                        <div className={'col-sm-3'}>
                            <select className={'form-select'} id={'phoneFirstNumber'} value={phoneFirstNumber} onChange={handlePhoneFirst}>
                                <option value={'010'}>010</option>
                                <option value={'011'}>011</option>
                                <option value={'012'}>012</option>
                            </select>
            <div className={'container my-3'}>
                <h1 className={'display-4 mb-3 text-center'}>회원가입</h1>
                <div className={'row'}>
                    <div className={'col-sm-8 mx-auto'}>
                        <div className={'form-group d-flex'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'id'} className={'form-label align-self-center mt-1'}>아이디</label>
                            </div>
                            <div className={'col-sm-5'}>
                                <input type={'text'} className={'form-control'} id={'id'} value={userId} onChange={handleUserId}/>
                            </div>
                            <div className={'col-sm-2'}>
                                <button type={'button'} className={'btn btn-primary ms-2'} onClick={btnDoubleCheck}>중복체크</button>
                            </div>
                        </div>
                        <div className={'form-group d-flex mt-3'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'password'} className={'form-label align-self-center mt-1'}>비밀번호</label>
                            </div>
                            <div className={'col-sm-5'}>
                                <input type={'password'} className={'form-control'} id={'password'} value={password} onChange={handlePassword}/>
                            </div>
                        </div>
                        <div className={'form-group d-flex mt-3'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'passwordRe'} className={'form-label align-self-top mt-1'}>비밀번호 확인</label>
                            </div>
                            <div className={'col-sm-5'}>
                                <input type={'password'} className={'form-control'} id={'passwordRe'} value={passwordRe} onChange={handlePasswordRe}/>
                                {password !== passwordRe ? <p className={'mt-1 text-danger'}>비밀번호가 같지 않습니다.</p> : null}
                            </div>
                        </div>
                        <div className={'form-group d-flex mt-3'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'name'} className={'form-label align-self-top mt-1'}>닉네임</label>
                            </div>
                            <div className={'col-sm-5'}>
                                <input type={'name'} className={'form-control'} id={'name'} value={name} onBlur={handleNameCheck} onChange={handleName}/>
                            </div>
                        </div>
                        <div className={'form-group d-flex mt-3'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'emailFirst'} className={'form-label align-self-center mt-1'}>이메일</label>
                            </div>
                            <div className={'col-sm-4'}>
                                <input type={emailFlag === true ? 'email' : 'text'} className={'form-control'} id={'emailFirst'} name={'emailFirst'} value={emailFirst} onBlur={emailFirstVal} onChange={handleEmailFirst}/>
                            </div>
                            <div className={'align-self-center mt-1'}>@</div>
                            <div className={'col-sm-4'}>
                                <select className={'form-select'} id={'emailLast'} onBlur={emailLastVal} onChange={handleEmailLast} value={emailLast}>
                                    <option value={''}>직접 입력</option>
                                    <option value={'@naver.com'}>naver.com</option>
                                    <option value={'@daum.net'}>daum.net</option>
                                    <option value={'@nate.com'}>nate.com</option>
                                    <option value={'@bict.co.kr'}>bict.co.kr</option>
                                </select>
                            </div>
                        </div>
                        <div className={'form-group d-flex mt-3'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'phoneMiddleNumber'} className={'form-label align-self-center mt-1'}>전화번호</label>
                            </div>
                            <div className={'col-sm-3'}>
                                <select className={'form-select'} id={'phoneFirstNumber'} value={phoneFirstNumber} onChange={handlePhoneFirst}>
                                    <option value={'010'}>010</option>
                                    <option value={'011'}>011</option>
                                    <option value={'012'}>012</option>
                                </select>
                            </div>
                            <div className={'form-label align-self-center mt-1'}>-</div>
                            <div className={'col-sm-2'}>
                                <input type={'text'} className={'form-control'} id={'phoneMiddleNumber'} minLength={4} maxLength={4} value={phoneMiddleNumber} onChange={handlePhoneMiddle}/>
                            </div>
                            <div className={'form-label align-self-center mt-1'}>-</div>
                            <div className={'col-sm-2'}>
                                <input type={'text'} className={'form-control'} id={'phoneLastNumber'} maxLength={4} value={phoneLastNumber}
                                       onChange={handlePhoneLast}/>
                            </div>
                        </div>
                        <div className={'form-group d-flex mt-3'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'postal'} className={'form-label align-self-top mt-1'}>우편번호</label>
                            </div>
                            <div className={'col-sm-2'}>
                                <input type={'text'} className={'form-control'} id={'postal'} value={zoneCode} readOnly={true}/>
                            </div>
                            <div className={'col-sm-2'}>
                                <button type={'button'} className={'btn btn-primary ms-2'} onClick={handleBtnZoneCode}>우편번호 찾기</button>
                            </div>
                        </div>
                        <div className={'d-flex me-3'}>
                            <div className={'col-sm-2'}></div>
                            <div className={'col-sm-7'}>
                                <input type={'text'} className={'form-control'} id={'address'} value={roadAddress} placeholder={'주소'} readOnly={true}/>
                                <input type={'text'} className={'form-control'} id={'addressDetail'} value={roadAddressDetail} onChange={handleRoadAddDetail} placeholder={'상세주소'}/>
                            </div>
                        </div>
                        <div className={'form-group d-flex mt-3'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label className={'form-label align-self-top'}>약관</label>
                            </div>
                            <div className={'col-sm-5'}>
                                <p>이러이러한 약관입니다.</p>
                            </div>
                            <div className={'col-sm-5'}>
                                <p>약간동의를 체크해주십시오 <input type={'checkbox'} value={isAgree} onChange={handleAgree}/></p>
                            </div>
                        </div>
                        <div className={'col-sm-5 mx-auto d-grid gap-3'}>
                            <button type={'button'} className={'btn btn-primary'} onClick={btnJoinMember}>회원가입</button>
                            <Link to={'/login'} className={'btn btn-warning'}>로그인 하러가기</Link>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </Fragment>

    )
}
export default JoinMember;