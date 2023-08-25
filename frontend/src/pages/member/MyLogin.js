import React, {Fragment, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import {Cookies} from "react-cookie";
import SalesHistory from "./SalesHistory";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import PurchaseHistory from "./PurchaseHistory";
import BoardHistory from "./BoardHistory";
import QuestionViewUser from "../admin/QuestionViewUser";
import MailListOpenButton from "../common/MailListOpenButton";
import ReviewHistory from "./ReviewHistory";



function MyLogin(props) {
    const navi = useNavigate();

    // 아이디
    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    // 등급
    const [grade, setGrade] = useState(sessionStorage.getItem("grade"));
    const onClickShoppingBasket = (e) =>{
        navi("/ShoppingBasket",{state:{userId}});
    }

    // 회원 탈퇴 시 쿠키 삭제
    const cookie = new Cookies()
    
    // modal 창 사용
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setPassword('');
        setShow(false)
    }
    const handleShow = () => setShow(true);
    // 회원 탈퇴 시 비밀번호 입력
    const [password, setPassword] = useState('');

    // 회원등급을 영어로 해서 한글로 설정하기
    // 다른 등급있으면 case로 해서 추가하기
    switch (grade) {
        case "user" :
            setGrade("일반 사용자");
    }

    const handlePW = (e) => {setPassword(e.target.value);}

    const handleWD = () => {
        axios.delete("http://localhost:8080/login/myLogin/withdraw",{
            params:{
                id : userId,
                password: password
            }
        })
            .then(res => {
                if(res.data > 0){
                    alert("회원을 탈퇴했습니다.")
                    cookie.remove('rememberUserId',{path: '/'})
                    navi('/login')
                }else if(res.data === 0){
                    alert("비밀번호가 틀렸습니다.");
                }
            })
    }

    return (
        <Fragment>
            <Header />
            <div className={'container my-3'}>
                <h1 className={'display-4 mb-3 text-center'}>마이페이지</h1>
                <div className={'border border-2'}>
                    <div className={'row d-flex justify-content-between'}>
                        <div className={'col-sm-5 ms-4'}>
                            <div className={'row my-4'}>
                                    <p className={'ms-3'}>회원 정보 <Link to={`/login/myLogin/myUserUpdate`} className={'btn btn-purple ms-2'}>수정</Link></p>
                                    <div className={'col-sm-4 text-center'}>
                                        <p>아이디</p>
                                        <p>닉네임</p>
                                        <p>회원등급</p>
                                    </div>

                                <div className={'col-sm-7 text-center'}>
                                    <p>{userId}</p>
                                    <p>{sessionStorage.getItem("name")}</p>
                                    <p>{grade}</p>
                                </div>
                            </div>
                        </div>
                        <div className={'col-sm-2 my-4 ms-5 d-grid text-center myPageBtns'}>
                            <button type={"button"} className={'btn btn-outline-purple'} onClick={onClickShoppingBasket}>장바구니</button>
                            <MailListOpenButton />
                            <button type={"button"} className={'btn btn-outline-purple'} >쿠폰함</button>
                            <button type={"button"} className={'btn btn-outline-purple'} >마일리지</button>
                        </div>
                    </div>
                </div>
                <div className={'my-5'}>
                    <Tabs
                        defaultActiveKey="home"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="home" title="주문 내역">
                            <PurchaseHistory />
                        </Tab>
                        <Tab eventKey="profile" title="판매 내역">
                            <SalesHistory/>
                        </Tab>
                        <Tab eventKey="longer-tab" title="문의 내역">
                            <QuestionViewUser id={userId}/>
                        </Tab>
                    </Tabs>
                </div>
                <div className={'my-5'}>
                    <Tabs
                        defaultActiveKey="home"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="home" title="리뷰 관리">
                            <ReviewHistory />
                        </Tab>
                        <Tab eventKey="profile" title="게시글 관리">
                            <BoardHistory />
                        </Tab>
                    </Tabs>
                </div>
                {/* 모달 창 */}
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>회원 탈퇴</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        정말 탈퇴하겠습니까?<br />
                        <div className={'d-flex'}>
                            <label htmlFor={'password'} className={'form-label'}  style={{width : '30%'}}>비밀번호 입력</label>
                            <input type={'password'} className={'form-control'} id={'password'} value={password} onChange={handlePW} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type={'button'} variant="primary" onClick={handleWD}>회원탈퇴</Button>
                        <Button variant="secondary" onClick={handleClose}>닫기</Button>
                    </Modal.Footer>
                </Modal>
                <div className={'d-flex justify-content-end'}>
                    <Button variant="primary" className={'btn btn-success'} onClick={handleShow}>회원 탈퇴</Button>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default MyLogin;