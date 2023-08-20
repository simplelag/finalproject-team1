import React, {useState, useEffect, useRef, Fragment} from 'react';
import SockJS from 'sockjs-client'
import MailSpeechBubble from "./MailSpeechBubble";
import {useParams} from "react-router-dom";
import axios from "axios";

const Stomp = require('stompjs');

// npm install stompjs sockjs-client
// npm i net -S

// https://fgh0296.tistory.com/search/sockJS

// stompClient.connected: ture/false

const Mail = (props) => {
    const params = useParams();
    const [content, setContent] = useState("");
    const [id, setId] = useState(sessionStorage.getItem("id") || "admin");
    const [name, setName] = useState(sessionStorage.getItem("name") || "adminName");

    const [itemNumber, setItemNumber] = useState(params.purchasePk || "-1");
    const channel = useRef([]);
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const [messages, setMessages] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [mC, setMC] = useState(0);

    const styleMail = {
        width: "auto",
        height: "100vh",
        position: "relative"
    }

    const styleBubbles = {
        width: "100%",
        overflowY: "scroll",
        overflowWrap: "anywhere",
        position: "absolute",
        bottom: "64px",
        top: "0px"
    }

    const styleTextArea = {position: "absolute", bottom: "0px"}


    useEffect(() => {
        document.title = "상품 문의";


        // 최초 stompClient 객체가 null이라면 "/ws"와 연결한다
        if (!stompClient) {
            console.log("stompClient is null");
            // "/ws" : 연결할 프로토콜의 URI
            const sockJs = new SockJS("/ws");
            // stomp 프로토콜 위에서 sockJS가 작동되도록 클라이언트를 생성
            const stomp = Stomp.over(sockJs);
            // 이러고 나면 stompClient로 서버연결, 메세지전송, 구독 등의 기능을 구현함
            setStompClient(stomp);
        }
            // stompClient 객체가 존재한다면 현재 purchasePk값을 서버로보내 구독한다(메세지를 수신가능한 상태로 만든다)
            // 이 else문의 원래의도:
            // 메일버튼을 눌러서 메일창이 열리면 서버와 연결되는게 아니라
            // 로그인 하자마자 서버랑 연결되게 만들어서
            // 채팅창이 열리면 시간이 오래걸리는 연결과정을 건너뛰고 바로 구독 단계로 넘어갈수 있게끔 하려했으나
            // 잘안돼서 이 if문은 바로 건너뛰게됨..
            // 원래라면 stompClient의 default값으로 sesssionStorage등에 저장된 stomp값을 설정하려했음
            // 하지만 storage에 object를 저장하는경우 메소드를 사용할수 없게되어 stompClient.subscribe(..)가 불가능
            // App.js 단계에서 useState를 만들어서 stompClient를 props로 넘겨줄려고해도
        // 라우터로 props를 전달해줄수가없음(전달해줘도 컴포넌트에서는 null로 받게됨)
        else {

            subscribe();
            setIsConnected(true);
        }


        axios.get(`/api/mail/getMessages`,
            {
                params: {purchasePk: itemNumber}
            })
            .then((resp) => {
                setMessages(resp.data);
                setMC(messages);

            })
            .catch(() => {
                window.location.reload()
            })


        // useEffect(()=>{},[])이면 창이 닫힐때 return을 실행하므로
        // 창이 닫히면 모든 구독을 끊는다(메세지를 안받는 상태로 만든다)
        return () => {
            if (stompClient && stompClient.connected) {
                channel.current.map(item => {
                    item.unsubscribe()
                });
            }
        };
    }, [])

    useEffect(() => {
        if (stompClient) {
            // 서버에 연결하기 위해 서버에 CONNECT 프레임을 전송
            // 연결성공시 서버로부터 연결이 되었다는 CONNECT 응답 프레임이 온다
            stompClient.connect({}, () => {
                // 연결 완료시 실행되는 콜백 함수
                console.log("연결성공");

                axios.get(`/api/mail/getMessages`,
                    {
                        params: {purchasePk: itemNumber}
                    })
                    .then((resp) => {
                        setMessages(resp.data);
                        setMC(messages);

                    })
                    .catch(() => {
                        window.location.reload()
                    })
                subscribe();
                setIsConnected(true);
            })
        }

        return () => {
            if (stompClient && stompClient.connected) {
                channel.current.map(item => {
                    item.unsubscribe()
                });
            }
        };
    }, [stompClient]);


    const send = () => {
        const messageFrame = {
            mailFromId: id,
            mailFromName: name,
            mailContent: content,
            mailPurchasePk: itemNumber
        }
        //메세지 전송
        // 첫번째 인자: SEND 프레임을 전송할 때 필요한 URI
        // 두 번째 인자: 헤더 설정
        // 세 번재 인자: 보낼 데이터

        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/message/${itemNumber}`, {}, JSON.stringify(messageFrame));
            setContent("");
        } else {
            setIsConnected(false);
            window.location.reload();
        }
    };

    const messageRead = (mailPk) => {
        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/message/read/${itemNumber}`, {}, JSON.stringify(mailPk))
        }
    }

    const writeContent = (e) => {
        setContent(e.target.value);
    };


    const subscribe = () => {

        if (stompClient && stompClient.connected) {
            channel.current.push(stompClient.subscribe(
                // 구독할 URI
                `/topic/${itemNumber}`,
                // 구독 후 실행될 콜백함수, 구독이후 메세지를 수신받을 때마다
                // 아래 콜백 함수가 실행됨
                (frame) => {
                    if (frame.headers["content-type"] == "application/json") {
                        setReceivedMessage(JSON.parse(frame.body));
                    } else if (frame.headers["content-type"] == "text/plain;charset=UTF-8") {
                        const tempList = [frame.body.substring(4), ...readPkList];
                        setReadPkList(tempList);
                    }
                }));
        }
    }
    const [readPkList, setReadPkList] = useState([]);

    useEffect(() => {

        if (receivedMessage) {
            setMessages([...messages, receivedMessage]);
            setMC(mC + 1);
        }
    }, [receivedMessage]);

    useEffect(() => {
        const tempList = [...readPkList]
        tempList.map((readPk) => {
            readCheck(readPk);
            tempList.splice(tempList.indexOf(readPk), 1);
        });
        // setReadPkList(tempList);
    }, [readPkList]);


    const readCheck = (pk) => {
        let tempJsons = [...messages];
        if (tempJsons) {
            for (let i = tempJsons.length; i--; i >= 0) {
                if (tempJsons[i].mailFromId == id && parseInt(tempJsons[i].mailUnread) > 0) {
                    tempJsons[i].mailUnread--;
                    console.log(`${tempJsons[i].mailPk} 읽음 처리`);
                } else if (tempJsons[i].mailFromId == id && parseInt(tempJsons[i].mailUnread) == 0) {
                    break;
                }
            }
        }
        setMessages(tempJsons);
    }


    const messagesRef = useRef(null);

    // jsons가 변경될 때마다 스크롤 위치를 최하단으로 조절
    useEffect(() => {
        scrollToBottom();
        let tempJsons = [...messages];
        if (tempJsons) {
            for (let i = tempJsons.length; i--; i >= 0) {
                if (tempJsons[i].mailFromId != id && parseInt(tempJsons[i].mailUnread) > 0) {
                    console.log(`새로운 메세지: ${tempJsons[i].mailPk}`);
                    messageRead(tempJsons[i].mailPk);
                    tempJsons[i].mailUnread--;
                } else if (tempJsons[i].mailFromId != id && parseInt(tempJsons[i].mailUnread) == 0) {
                    break;
                }
            }
        }
    }, [messages]);

    // 스크롤 위치를 최하단으로 조절하는 함수
    const scrollToBottom = () => {
        if (messagesRef.current) {
            const {scrollHeight, clientHeight} = messagesRef.current;
            messagesRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    return (
        <div style={styleMail}>
            <div style={styleBubbles} ref={messagesRef}>
                <ul className={"list-unstyled"}>
                    {
                        messages.map((item, index) => {
                            const prev = {
                                mailFromName: index == 0 ? "" : messages[index - 1].mailFromName
                            }
                            const next = {
                                mailDatetime: index == messages.length - 1 ? "" : messages[index + 1].mailDatetime
                            }
                            return (
                                <MailSpeechBubble key={item.mailPk + "/" + item.mailUnread} id={id} item={item}
                                                  prev={prev} next={next}/>
                            )
                        })
                    }
                </ul>
            </div>

            <div className={"w-100 input-group"} style={styleTextArea}>
                <textarea
                    id={"content"}
                    value={content}
                    onChange={writeContent}
                    className={"form-control"}
                    style={{height: "4em", resize: "none"}}
                />
                <button type={"button"} onClick={send} disabled={!isConnected}
                        className={"btn btn-outline-dark"}>
                    {isConnected ? "전송" : "연결중"}
                </button>
            </div>
        </div>
    );


};

export default Mail;
