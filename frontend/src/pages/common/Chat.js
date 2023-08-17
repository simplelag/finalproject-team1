import React, {useState, useEffect, useRef} from 'react';
import SockJS from 'sockjs-client'
const Stomp = require('stompjs');

// npm install stompjs sockjs-client
// npm i net -S

// https://fgh0296.tistory.com/search/sockJS

const Chat = () => {
    const [text, setText] = useState("hello");
    // const [stompClient, setStompClient] = useState(
    //     // stomp 프로토콜 위에서 sockJS가 작동되도록 클라이언트를 생성
    //     // "/ws" : 연결할 프로토콜의 URI
    //     // 이러고 나면 stompClient로 서버연결, 메세지전송, 구독 등의 기능을 구현함
    //     Stomp.over(new SockJS("/ws"))
    // );
    const stompClient = useRef(Stomp.over(new SockJS("/ws")));


    useEffect(()=>{

        // 서버에 연결하기 위해 서버에 CONNECT 프레임을 전송
        // 연결성공시 서버로부터 연결이 되었다는 CONNECT 응답 프레임이 온다
        stompClient.current.connect({},()=>{
            // 연결 완료시 실행되는 콜백 함수
            console.log("연결성공");
            // 상대방에게 메세지를 보내거나 받아야 할 경우 특정 URI에 대해 구독해야함
            // 채팅방 입장시 해당 채팅방을 구독하는 것과 같음
            stompClient.current.subscribe(
                // 구독할 URI
                "/topic",
                // 구독 후 실행될 콜백함수, 구독이후 메세지를 수신받을 때마다
                // 아래 콜백 함수가 실행됨
                (frame)=>{
                    console.log(frame)
                });
        })

        // 구독 끊기
        // return stompClient.subscribe("/sub",(frame)=>{}).unsubscribe();
        return () => {
            if(stompClient.current.readyState === 1) {
                stompClient.current.unsubscribe();
            }
        }
    },[])



    const send = ()=>{
        const messageFrame = text
        //메세지 전송
        // 첫번째 인자: SEND 프레임을 전송할 때 필요한 URI
        // 두 번째 인자: 헤더 설정
        // 세 번재 인자: 보낼 데이터
        stompClient.current.send("/app/message",{},JSON.stringify(messageFrame))
    };

    const write = (e)=>{
        setText(e.target.value);
    };

    const subscribe = () => {
        stompClient.current.subscribe(
            // 구독할 URI
            "/topic",
            // 구독 후 실행될 콜백함수, 구독이후 메세지를 수신받을 때마다
            // 아래 콜백 함수가 실행됨
            (frame)=>{
                console.log(frame)
            });
    }

    const quit = () => {
            stompClient.current.unsubscribe();
        if(stompClient.current.readyState == 1) {
            stompClient.current.unsubscribe();
        }
    }

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={write}
            />
            <button onClick={send}>Send Message</button>
            <button onClick={stompClient.current.connect({},()=>{return null})}>Connect</button>
            <button onClick={subscribe}>Subscribe</button>
            <button onClick={quit}>Unsubscribe</button>
        </div>
    );
};

export default Chat;
