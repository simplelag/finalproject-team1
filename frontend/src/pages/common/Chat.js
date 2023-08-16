import React, { useState, useEffect } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

// npm install stompjs sockjs-client
// npm i net -S
const Chat = () => {
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const socket = new SockJS('/ws');
        const stomp = Stomp.over(socket);
        stomp.connect({}, () => {
            setStompClient(stomp);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const sendWebSocketMessage = () => {
        if (stompClient) {
            stompClient.send('/app/hello', {}, message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendWebSocketMessage}>Send Message</button>
        </div>
    );
};

export default Chat;
