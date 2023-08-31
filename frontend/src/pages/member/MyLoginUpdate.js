import React, {Fragment, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useDaumPostcodePopup} from "react-daum-postcode";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";

function MyLoginUpdate(props) {

    const navi = useNavigate();

    // 아이디
    const [userId, setUserId] = useState(sessionStorage.getItem("id"));

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

    // 회원 정보가 적혀있어야 함
    useEffect(e => {
        axios.get(`http://localhost:8080/login/myLogin/myUserUpdate`,{
            params:{
                userId : userId
            }
        })
            .then(res => {
                setPassword(res.data[0].memberPassword)
                setPasswordRe(res.data[0].memberPassword)
                setName(res.data[0].memberName);


                // 이메일
                let idx = res.data[0].memberEmail.indexOf('@');
                let emailCheck = res.data[0].memberEmail.substring(idx);
                let emailFirst = '';
                if(emailCheck === '@naver.com' || emailCheck === '@daum.net' || emailCheck === '@nate.com' || emailCheck === '@bict.co.kr' ){
                    emailFirst = res.data[0].memberEmail.substring(0,idx);
                    setEmailFlag(false);
                    setEmailTest(true)
                }else{
                    emailFirst = res.data[0].memberEmail;
                    emailCheck = '';
                }
                setEmailFirst(emailFirst)
                setEmailLast(emailCheck)

                // 전화번호
                let phone = res.data[0].memberPhone;
                let pIdx = phone.indexOf('-')
                let pIdx2 = phone.indexOf('-', pIdx+1)
                const phoneFirst = phone.substring(0, pIdx)
                const phoneMiddle = phone.substring(pIdx+1, pIdx2)
                const phoneLast = phone.substring(pIdx2+1)

                setPhoneFirstNumber(phoneFirst)
                setPhoneMiddleNumber(phoneMiddle)
                setPhoneLastNumber(phoneLast)
                
                // 주소
                const memberAddress = res.data[0].memberAddress;
                let addCheck1 = memberAddress.indexOf('/');
                let addCheck2 = memberAddress.indexOf('/', addCheck1+1);
                const zonecode = memberAddress.substring(0,addCheck1)
                const address = memberAddress.substring(addCheck1+1, addCheck2)
                const addDetail = memberAddress.substring(addCheck2+1)

                setZoneCode(zonecode)
                setRoadAddress(address)
                setRoadAddressDetail(addDetail)
            })
    }, [])

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
                value = e.target.value.replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "")
                return value;
                break;
            }
            case 3:{
                // 특수문자 제한
                value = e.target.value.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi, "")
                return value;
                break;
            }
            case 4:{
                // 한글, 숫자만 입력
                value = e.target.value.replace(/[^^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9]/g, "")
                return value;
                break;
            }
            case 5:{
                // 숫자만 입력
                value = e.target.value.replace(/[^0-9]/g, "")
                return value;
                break;
            }
        }
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
        setEmailFlag(e.target.value === '' ? true : false)
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

    // 회원가입 버튼 클릭 시
    const btnUpdateMember = (e) => {

        if(password === '' || passwordRe === ''){
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
        }else if(nameCheck){
            alert("닉네임이 중복입니다.");
        } else if(!emailTest){
            alert("이메일의 형식이 올바르지 않습니다.")
        }
        else if(password === passwordRe) {
            axios.post("http://localhost:8080/sign/signup",null, {
                params: {
                    userId: userId,
                    password: password,
                    name: name,
                    email: emailFirst + emailLast,
                    phone: phoneFirstNumber + '-' + phoneMiddleNumber + '-' + phoneLastNumber,
                    address: zoneCode + '/' + roadAddress + '/' + roadAddressDetail,
                    authority: sessionStorage.getItem("grade") || "user"
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
            <div className={'container my-3'}>
                <h1 className={'display-4 mb-3 text-center'}>회원정보 수정</h1>
                <div className={'row'}>
                    <div className={'col-sm-8 mx-auto'}>
                        <div className={'form-group d-flex'}>
                            <div className={'col-sm-2 d-flex justify-content-center'}>
                                <label htmlFor={'id'} className={'form-label align-self-center mt-1'}>아이디</label>
                            </div>
                            <div className={'col-sm-5'}>
                                <input type={'text'} className={'form-control'} id={'id'} value={userId} disabled={true}/>
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
                                <input type={'text'} className={'form-control'} id={'phoneMiddleNumber'} value={phoneMiddleNumber} onChange={handlePhoneMiddle}/>
                            </div>
                            <div className={'form-label align-self-center mt-1'}>-</div>
                            <div className={'col-sm-2'}>
                                <input type={'text'} className={'form-control'} id={'phoneLastNumber'} value={phoneLastNumber}
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
                        <div className={'col-sm-5 mt-5 mx-auto d-grid gap-3'}>
                            <button type={'button'} className={'btn btn-primary'} onClick={btnUpdateMember}>내 정보 수정</button>
                            <Link to={'/login/myLogin'} className={'btn btn-warning'}>취소</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default MyLoginUpdate;