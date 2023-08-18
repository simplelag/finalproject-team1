import React, {useState, useEffect, useRef, Fragment} from 'react';
import SockJS from 'sockjs-client'
import MailSpeechBubble from "./MailSpeechBubble";
import {useParams} from "react-router-dom";
import axios from "axios";

const Stomp = require('stompjs');

// npm install stompjs sockjs-client
// npm i net -S

// https://fgh0296.tistory.com/search/sockJS

// WebSocket.CONNECTING (0): 연결이 수립 중인 상태
// WebSocket.OPEN (1): 연결이 성공적으로 열린 상태
// WebSocket.CLOSING (2): 연결이 닫히는 중인 상태
// WebSocket.CLOSED (3): 연결이 완전히 닫힌 상태
// stompClient.connected: ture/false

const Mail = () => {
    const params = useParams();
    const [content, setContent] = useState("hello");
    const [id, setId] = useState(sessionStorage.getItem("id") || "admin");
    const [name, setName] = useState(sessionStorage.getItem("name") || "adminName");

    const [itemNumber, setItemNumber] = useState(params.purchaseNumber || "-1");
    const channel = useRef([]);
    const [stompClient, setStompClient] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const [messages, setMessages] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [mC, setMC] = useState(0);


    useEffect(() => {
        // "/ws" : 연결할 프로토콜의 URI
        const sockJs = new SockJS("/ws");
        // stomp 프로토콜 위에서 sockJS가 작동되도록 클라이언트를 생성
        const stomp = Stomp.over(sockJs);
        // 이러고 나면 stompClient로 서버연결, 메세지전송, 구독 등의 기능을 구현함
        setStompClient(stomp);
        ;

        // 구독 끊기
        // return stompClient.subscribe("/sub",(frame)=>{}).unsubscribe();
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
                        {params:{purchasePk:itemNumber}
                        })
                        .then((resp)=>{
                            setMessages(resp.data);
                            setMC(messages);

                        })
                        .catch()
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
            stompClient.send(`/app/message/${itemNumber}`, {}, JSON.stringify(messageFrame))
        } else{
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

    const writeId = (e) => {
        setId(e.target.value);
    };

    const writeName = (e) => {
        setName(e.target.value);
    };


    const subscribe = () => {

        if (stompClient && stompClient.connected) {
            channel.current.push(stompClient.subscribe(
                // 구독할 URI
                `/topic/${itemNumber}`,
                // 구독 후 실행될 콜백함수, 구독이후 메세지를 수신받을 때마다
                // 아래 콜백 함수가 실행됨
                (frame) => {
                    if(frame.headers["content-type"]=="application/json"){
                        setReceivedMessage(JSON.parse(frame.body));
                    } else if(frame.headers["content-type"]=="text/plain;charset=UTF-8"){
                        const tempList = [frame.body.substring(4),...readPkList];
                        setReadPkList(tempList);
                    }
                }));
        }
    }
    const [readPkList, setReadPkList] = useState([]);

    useEffect(() => {
        console.log("메세지 수신");
        console.log(messages);
        if(receivedMessage){
            setMessages([...messages,receivedMessage]);
            setMC(mC+1);
        }
    }, [receivedMessage]);

    useEffect(() => {
        const tempList = [...readPkList]
        tempList.map((readPk) => {
            readCheck(readPk);
            tempList.splice(tempList.indexOf(readPk),1);
        });
        // setReadPkList(tempList);
    }, [readPkList]);


    const readCheck = (pk)=> {
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






    const quit = () => {
        if (stompClient && stompClient.connected) {
            channel.current.map(item => {
                item.unsubscribe()
            });
        }
    }

    const channeling = (e) => {
        setItemNumber(e.target.value);
    };

    const connection = () => {
        stompClient.connect({}, () => {
            console.log("연결 성공");
            setIsConnected(true);
        });
    }

    const messagesRef = useRef(null);

    // jsons가 변경될 때마다 스크롤 위치를 최하단으로 조절
    useEffect(() => {
        scrollToBottom();
        let tempJsons = [...messages];
        if(tempJsons){
            for(let i=tempJsons.length; i--; i>=0){
                if(tempJsons[i].mailFromId != id && parseInt(tempJsons[i].mailUnread) > 0){
                    console.log(`새로운 메세지: ${tempJsons[i].mailPk}`);
                    messageRead(tempJsons[i].mailPk);
                    tempJsons[i].mailUnread-- ;
                }
                else if(tempJsons[i].mailFromId != id && parseInt(tempJsons[i].mailUnread) == 0){ break; }
            }
        }
    }, [messages]);

    // 스크롤 위치를 최하단으로 조절하는 함수
    const scrollToBottom = () => {
        if (messagesRef.current) {
            const { scrollHeight, clientHeight } = messagesRef.current;
            messagesRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    return (
        <div className={"container m-5"}>

            {/*<MailSpeechBubbles key={mC} myId={id} jsons={messages} readJsons = {setMessages} messageRead={messageRead}/>*/}

            <div className={"container"} style={{height:"30em", overflow:"scroll"}} ref={messagesRef}>
                <ul>
                    {
                        messages.map((item, index) => {
                            return (
                                <MailSpeechBubble key={item.mailPk+"/"+item.mailUnread} id={id} item={item} />
                            )
                        })
                    }
                </ul>
            </div>


            <div>
                <label htmlFor="itemNumber">itemNumber </label>
                <input
                    id={"itemNumber"}
                    type="text"
                    value={itemNumber}
                    onChange={channeling}
                />
                <button onClick={subscribe}>Subscribe</button>
                <button onClick={quit}>Unsubscribe All</button>
            </div>
            <button onClick={connection}>Connect</button>
            <div>
                <div>
                    <label htmlFor="content">id </label>
                    <input
                        id={"content"}
                        type="text"
                        value={id}
                        onChange={writeId}
                    /><br/>
                    <label htmlFor="content">name </label>
                    <input
                        id={"content"}
                        type="text"
                        value={name}
                        onChange={writeName}
                    />
                </div>

                <label htmlFor="content">content </label>
                <input
                    id={"content"}
                    type="text"
                    value={content}
                    onChange={writeContent}
                />
                <button onClick={send} disabled={!isConnected}>
                    {isConnected ? "Send Message" : "연결중"}
                </button>

            </div>




        </div>
    );
};

export default Mail;
