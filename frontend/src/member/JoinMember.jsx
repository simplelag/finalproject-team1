import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import DaumPostcode, {useDaumPostcodePopup} from 'react-daum-postcode';
import axios from "axios";


function JoinMember(props) {

    const navi = useNavigate();
    const [inputs, setInputs] = useState('');

    // 아이디
    const [userId, setUserId] = useState('');

    // 비밀번호
    const[ password, setPassword] = useState('');
    const[ passwordRe, setPasswordRe] = useState('');
    // 비밀번호와 비밀번호 확인이 같을때만 넣을 것
    const[ passwordCheck, setPasswordCheck ] = useState('');

    // 이름
    const[name, setName] = useState('');

    // 이메일
    const [emailFirst, setEmailFirst] = useState('');
    const [emailLast, setEmailLast] = useState('');
    // param으로 합치기 떄문에 나중에 지울거임
    const [email, setEmail] = useState('');

    // 폰 번호
    const [phoneFirstNumber, setPhoneFirstNumber] = useState('010');
    const [phoneMiddleNumber, setPhoneMiddleNumber] = useState('');
    const [phoneLastNumber, setPhoneLastNumber] = useState('');
    // param으로 합치기 떄문에 나중에 지울거임
    const [phoneNumber, setPhoneNumber] = useState('');

    // 우편번호 및 주소
    const [zoneCode, setZoneCode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [roadAddressDetail, setRoadAddressDetail] = useState('');

    // 약관 동의
    const [isAgree, setIsAgree] = useState(false);

    // 이메일 합치기
    // 나중에 회원가입 누를 때 param으로 나중에 더하면 됨
    const handleEmailFirst= (e)=>{
        setEmailFirst(e.target.value);
        setEmail(emailFirst + emailLast);
    }
    const handleEmailLast = (e) => {
        setEmailLast(e.target.value);
        setEmail(emailFirst + emailLast);
    }
    
    // 휴대폰 합치기
    // 이메일이랑 똑같이 param으로 나중에 추가하면 됨
    const handlePhoneFirst = (e) => setPhoneFirstNumber(e.target.value);
    const handlePhoneMiddle = (e) => setPhoneMiddleNumber(e.target.value);
    const handlePhoneLast = (e) => setPhoneLastNumber(e.target.value);

    // 아이디 중복 체크
    const handleUserId = (e) => {setUserId(e.target.value);}

    // 이름
    const handleName = (e) => {setName(e.target.value);}

    const btnDoubleCheck = (e) => {
        axios.get("http://localhost:8080/sign/idCheck", {
            params:{
                userId : userId
            }
        })
            .then(res => {
                if(res.data == true){
                    alert("사용불가 id 입니다.")
                }else{
                    alert("사용가능한 Id 입니다.")
                }
            })
            .catch(err => {
                console.log("통신 실패");
            })
    }

    
    // 비밀번호랑 비밀번호 확인이랑 같은지 확인
    const handlePassword = (e) => {setPassword(e.target.value)}
    const handlePasswordRe = (e) => {setPasswordRe(e.target.value)}

    // 우편번호 및 주소 검색
    // 상세주소 입력
    const handleRoadAddDetail = (e) => {setRoadAddressDetail(e.target.value);}

    // scriptUrl : Daum 우편번호 서비스의 스크립트 주소입니다. default값이 정해져있음
    const scriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    // 우편 번호 찾기 클릭 시 작동되는 것
    const open = useDaumPostcodePopup(scriptUrl);

    // 클릭 시 팝업창(검색창)
    const handleComplete = (data) => {
        let roadAddress = data.address;
        let jibunAddress = data.jibunAddress;
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

    // 약관 동의
    const handleAgree = (e) => {
        if(isAgree == false){
            setIsAgree(true);
        }else{
            setIsAgree(false);
        }
    }

    // 특수문자 입력 금지
    // 미작동
    const onChange = (e) => {
        const { value } = e.target;
        // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
        const onlyNumber = value.replace(/[^0-9]/g, '');
        setInputs(onlyNumber);
    }
    
    // 특수문자, 문자 금지(숫자만 사용)


    // 회원가입 버튼 클릭 시
    const btnJoinMember = (e) => {
        // p태그로는 표시만 해주는 거기 때문에 정확한 확인을 못하므로 확인을 정확히 하는 것임
        if(password === passwordRe){
            setPasswordCheck(password);
        }
        if(!isAgree){
            alert("약관에 동의해주세요");
        }
        if(passwordCheck !== null && isAgree === true) {
            axios.put("http://localhost:8080/sign/singup", "null", {
                params: {
                    userId: userId,
                    password: passwordCheck,
                    name : name,
                    email: emailFirst + emailLast,
                    phone: phoneFirstNumber + '-' + phoneMiddleNumber + '-' + phoneLastNumber,
                    address: roadAddress + roadAddressDetail
                }
            })
                .then(res => {
                    console.log(res);
                    // navi('/login');
                })
                .catch(err => {
                    console.log("통신 실패");
                })
        }
    }

    return (
        <div className={'container my-3'}>
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
                            <label htmlFor={'name'} className={'form-label align-self-top mt-1'}>이름</label>
                        </div>
                        <div className={'col-sm-5'}>
                            <input type={'name'} className={'form-control'} id={'name'} value={name} onChange={handleName}/>
                        </div>
                    </div>
                    <div className={'form-group d-flex mt-3'}>
                        <div className={'col-sm-2 d-flex justify-content-center'}>
                            <label htmlFor={'emailFirst'} className={'form-label align-self-center mt-1'}>이메일</label>
                        </div>
                        <div className={'col-sm-4'}>
                            <input type={'text'} className={'form-control'} id={'emailFirst'} value={emailFirst} onChange={handleEmailFirst} />
                        </div>
                        <div className={'align-self-center mt-1'}>@</div>
                        <div className={'col-sm-4'}>
                            <select className={'form-select'} id={'emailLast'} onChange={handleEmailLast} value={emailLast}>
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
                        <Link to={'/'} className={'btn btn-warning'}>로그인 하러가기</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JoinMember;