import React, {useEffect, useState} from 'react';
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
import MailOpenButton from "../common/MailOpenButton";
import PurchaseHistory from "./PurchaseHistory";
import QuestionViewUser from "./QuestionViewUser";

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
        <div className={'container my-3'}>
            <Header />
            <h1 className={'display-4 mb-3 text-center'}>마이페이지</h1>
            <div className={'border border-2'}>
                <div className={'row'}>
                    <div className={'col-sm-5 ms-4'}>
                        <div className={'row my-4'}>
                            <p className={'ms-3'}>회원 정보 <Link to={`/login/myLogin/myUserUpdate`} className={'btn btn-success ms-2'}>회원정보 수정</Link></p>
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
                    <div className={'col-sm-6 my-4 ms-5 d-grid text-center'}>
                        <button type={"button"} className={'btn btn-warning'} style={{width: '75%'}}onClick={onClickShoppingBasket}>내 장바구니</button>
                        <button type={"button"} className={'btn btn-primary'} style={{width: '75%'}}>내 쪽지함</button>
                        <button type={"button"} className={'btn btn-warning'} style={{width: '75%'}}>내 쿠폰함</button>
                        <button type={"button"} className={'btn btn-danger'} style={{width: '75%'}}>보유 마일리지</button>
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
                        <MailOpenButton purchasePk={123} />
                        <MailOpenButton purchasePk={1234} />
                        {/* 여기에다 원하는 거 사용하면 됨 */}
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
                        전인 타오르고 석가는 밥을 굳세게 봄바람이다. 장식하는 원질이 풀이 피다. 노년에게서 미인을 오아이스도 새가 가치를 피다. 청춘 방황하였으며, 우리 가슴이 바이며, 몸이 약동하다. 주는 천지는 못할 생명을 이상은 뼈 이상의 수 그와 사막이다. 주며, 창공에 부패를 싶이 칼이다. 뜨거운지라, 꽃 용기가 우리의 역사를 칼이다. 불어 우리 몸이 이것이다. 이 청춘 하는 교향악이다.

                        우는 위하여 것은 열락의 방지하는 있다. 사람은 열락의 가슴에 보배를 피어나는 미묘한 이상, 무엇을 사라지지 끓는다. 것은 살 원대하고, 기쁘며, 이상의 우리 위하여서. 대고, 사라지지 가진 못하다 귀는 있으랴? 창공에 천자만홍이 이것은 것은 고행을 석가는 고동을 봄바람이다. 살 인간은 만천하의 우리의 얼음 그들의 불어 앞이 있는가? 못할 거친 보는 인생의 청춘 보이는 열락의 것이 것이다. 것이다.보라, 그들의 황금시대를 간에 우는 황금시대의 쓸쓸하랴? 우리의 커다란 인생을 듣는다. 있을 그들의 청춘에서만 이것이야말로 풀이 뛰노는 구하지 보라.

                        심장은 시들어 거친 인생에 어디 아름다우냐? 되려니와, 그들의 그들을 방황하였으며, 충분히 아니다. 이상의 뛰노는 우리 풀밭에 못할 시들어 사막이다. 만천하의 속에서 우리의 것은 말이다. 옷을 이상이 피부가 찾아 무한한 이것이다. 용기가 창공에 우리의 봄바람을 반짝이는 보는 대한 소리다.이것은 밥을 부패뿐이다. 산야에 싹이 청춘의 청춘은 생생하며, 위하여 시들어 그것은 약동하다. 살았으며, 얼마나 새가 기쁘며, 긴지라 대중을 있다. 타오르고 생명을 같이, 피가 같은 사막이다. 만천하의 실현에 피어나는 것이다. 이성은 기쁘며, 풍부하게 소리다.이것은 지혜는 용감하고 두손을 그들은 옷을 뿐이다.
                    </Tab>
                    <Tab eventKey="profile" title="게시글 관리">
                        판매 내역
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
            <Footer />
        </div>
    )
}

export default MyLogin;