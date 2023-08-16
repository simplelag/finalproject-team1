import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useDaumPostcodePopup} from "react-daum-postcode";


function PurchaseImfor(props) {

    // 기존 배송지 disabled 확인
    const [oriButton, setOriButton] = useState(false)
    // 새 배송지 disabled 확인
    const [newButton, setNewButton] = useState(false)

    // 아이디
    const [userId, setUserId] = useState(sessionStorage.getItem("id"));

    // 우편번호 및 주소
    const [zoneCode, setZoneCode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [roadAddressDetail, setRoadAddressDetail] = useState('');

    // 폰 번호
    const [phoneFirstNumber, setPhoneFirstNumber] = useState('010');
    const [phoneMiddleNumber, setPhoneMiddleNumber] = useState('');
    const [phoneLastNumber, setPhoneLastNumber] = useState('');

    // 요청 메시지
    const [reqMessage, setReqMessage] = useState('')
    const [reqMessageSel, setReqMessageSel] = useState('')
    const [messageDis, setMessageDis] = useState(false)

    useEffect(e => {
        handleOriginalInfo()
    },[])

    // 기존 배송지 가져오기
    const handleOriginalInfo = (e) => {
        axios.get('http://localhost:8080/login/myLogin/myUserUpdate',{
            params:{
                userId : userId
            }
        })
            .then(res => {
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

                if(oriButton === false){
                    setOriButton(true)
                    setNewButton(false)
                }else{
                    setOriButton(false)
                    setNewButton(true)
                }
            })
    }

    // 새 배송지 가져오기
    const handleNewInfo = (e) => {
        setZoneCode('')
        setRoadAddress('')
        setRoadAddressDetail('')
        setPhoneMiddleNumber('')
        setPhoneLastNumber('')
        if(newButton === false){
            setOriButton(false)
            setNewButton(true)
        }else{
            setOriButton(true)
            setNewButton(false)
        }
    }

    // 아이디
    const handleReqMessage = (e) => setReqMessage(e.target.value)

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
        const addDetail = e.target.value.replace(/[^^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|0-9]/g, "")
        setRoadAddressDetail(addDetail);
    }

    // 휴대전화 번호
    const handlePhoneFirst = (e) => setPhoneFirstNumber(e.target.value)
    const handlePhoneMiddle = (e) => {
        let middle = e.target.value.replace(/[^0-9]/g, "")
        setPhoneMiddleNumber(middle)
    }
    const handlePhoneLast = (e) => {
        let last = e.target.value.replace(/[^0-9]/g, "")
        setPhoneLastNumber(last)
    }
    
    // 요청 메시지
    const handleReqMessageSel = (e) => {
        setReqMessageSel(e.target.value)
        setReqMessage(e.target.value)
        if (e.target.value !== '') {
            setMessageDis(true)
        } else {
            setMessageDis(false)
        }
    }

    return (
        <div>
            <p>배송 정보 입력</p>
            <div className={'border border-2 my-3'}>
                <div className={'d-flex mt-2'}>
                    <button type={'button'} className={'btn btn-success ms-2'} onClick={handleOriginalInfo} disabled={oriButton}>기존 배송지</button>
                    <button type={'button'} className={'btn btn-success ms-2'} onClick={handleNewInfo} disabled={newButton}>새 배송지</button>
                </div>
                <div className={'flex-row d-flex my-4'}>
                    <div className={'col-sm-2 text-center align-self-center'}>
                        <label htmlFor={'userId'} className={'form-label'}>주문자</label>
                    </div>
                    <div className={'col-sm-3'}>
                        <input type={'text'} className={'form-control'} id={'userId'} value={userId} disabled={true} />
                    </div>
                </div>
                <div className={'flex-row d-flex mt-4'}>
                    <div className={'col-sm-2 text-center'}>
                        <label htmlFor={'postal'} className={'form-label align-self-top mt-1'}>우편번호</label>
                    </div>
                    <div className={'col-sm-2'}>
                        <input type={'text'} className={'form-control'} id={'postal'} value={zoneCode} readOnly={true}/>
                    </div>
                    <div className={'col-sm-2'}>
                        <button type={'button'} className={'btn btn-primary ms-2'} onClick={handleBtnZoneCode}>우편번호 찾기</button>
                    </div>
                </div>
                <div className={'flex-row d-flex my-2'}>
                    <div className={'col-sm-2'}></div>
                    <div className={'col-sm-7'}>
                        <input type={'text'} className={'form-control'} id={'address'} placeholder={'주소'} value={roadAddress} readOnly={true}/>
                        <input type={'text'} className={'form-control my-1'} id={'addressDetail'} value={roadAddressDetail} onChange={handleRoadAddDetail} placeholder={'상세주소'}/>
                    </div>
                </div>
                <div className={'flex-row d-flex my-4'}>
                    <div className={'col-sm-2 text-center'}>
                        <label htmlFor={'phoneMiddleNumber'} className={'form-label align-self-center mt-1'}>전화번호</label>
                    </div>
                    <div className={'col-sm-2'}>
                        <select className={'form-select'} id={'phoneFirstNumber'} value={phoneFirstNumber} onChange={handlePhoneFirst}>
                            <option value={'010'}>010</option>
                            <option value={'011'}>011</option>
                            <option value={'012'}>012</option>
                        </select>
                    </div>
                    <div className={'align-self-center mt-1'}>-</div>
                    <div className={'col-sm-2'}>
                        <input type={'text'} className={'form-control'} id={'phoneMiddleNumber'} value={phoneMiddleNumber} onChange={handlePhoneMiddle} maxLength={4}/>
                    </div>
                    <div className={'form-label align-self-center mt-1'}>-</div>
                    <div className={'col-sm-2'}>
                        <input type={'text'} className={'form-control'} id={'phoneLastNumber'} value={phoneLastNumber} onChange={handlePhoneLast} maxLength={4} />
                    </div>
                </div>
                <div className={'flex-row d-flex my-4'}>
                    <div className={'col-sm-2 text-center'}>
                        <label htmlFor={'message'} className={'form-label align-self-top mt-1'}>요청사항</label>
                    </div>
                    <div className={'col-sm-4'}>
                        <textarea cols={90} rows={5} id={'message'} value={reqMessage} onChange={handleReqMessage}
                                  disabled={messageDis}/>
                        <select className={'form-select'} value={reqMessageSel} onInput={handleReqMessageSel}>
                            <option value={''}>직접입력</option>
                            <option value={'문앞에 나둬주세요'}>문앞에 나둬주세요</option>
                            <option value={'부재 시, 휴대폰으로 연락주세요.'}>부재 시, 휴대폰으로 연락주세요.</option>
                            <option value={'부재 시, 경비실에 맡겨주세요.'}>부재 시, 경비실에 맡겨주세요.</option>
                            <option value={'배송 전, 연락주세요.'}>배송 전, 연락주세요.</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* 결제 정보 확인*/}
            <p>결제 정보 확인</p>
            <div className={'border border-2 my-3'}>
                <div className={'row my-4'}>
                    <div className={'flex-row d-flex my-4'}>
                        <div className={'col-sm-2 text-center align-self-center'}>
                            <label htmlFor={'userId'} className={'form-label'}>주문 총액</label>
                        </div>
                        <div className={'col-sm-3'}>
                            <input type={'text'} className={'form-control'} id={'userId'}/>
                        </div>
                        <div className={'col-sm-2 text-center align-self-center'}>
                            <label htmlFor={'userId'} className={'form-label'}>마일리지 할인액</label>
                        </div>
                        <div className={'col-sm-3'}>
                            <input type={'text'} className={'form-control'} id={'userId'}/>
                        </div>
                    </div>
                    <div className={'flex-row d-flex my-4'}>
                        <div className={'col-sm-2 text-center align-self-center'}>
                            <label htmlFor={'userId'} className={'form-label'}>배송료</label>
                        </div>
                        <div className={'col-sm-3'}>
                            <input type={'text'} className={'form-control'} id={'userId'}/>
                        </div>
                        <div className={'col-sm-2 text-center align-self-center'}>
                            <label htmlFor={'userId'} className={'form-label'}>쿠폰 할인액</label>
                        </div>
                        <div className={'col-sm-3'}>
                            <input type={'text'} className={'form-control'} id={'userId'}/>
                        </div>
                    </div>
                    <div className={'flex-row d-flex my-4'}>
                        <div className={'col-sm-2 text-center align-self-center'}>
                            <label htmlFor={'userId'} className={'form-label'}>최종 금액</label>
                        </div>
                        <div className={'col-sm-3'}>
                            <input type={'text'} className={'form-control'} id={'userId'}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* 결제 수단 */}
            <p>결제 수단</p>
            <div className={'border border-2 my-3'}>
                <div className={'row ms-4 my-4'}>
                    <div className={'btn-group-vertical'}>
                        <div className={'my-2'}>
                            <input type="radio" className={'form-check-input'} name="payment" value="apple"/>
                            <label className={'form-check-label ms-3'} htmlFor={'payment1'}>신용카드</label>
                        </div>
                        <div className={'my-2'}>
                            <input type="radio" className={'form-check-input'} name="payment" value="apple"/>
                            <label className={'form-check-label ms-3'} htmlFor={'payment1'}>카카오 페이</label>
                        </div>
                        <div className={'my-2'}>
                            <input type="radio" className={'form-check-input'} name="payment" value="apple"/>
                            <label className={'form-check-label ms-3'} htmlFor={'payment1'}>네이버 페이</label>
                        </div>
                        <div className={'my-2'}>
                            <input type="radio" className={'form-check-input'} name="payment" value="apple"/>
                            <label className={'form-check-label ms-3'} htmlFor={'payment1'}>토스</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseImfor;