import React, {useState, useEffect, Fragment, useRef} from 'react';

function MailSpeechBubbles(props) {
    const [myId, setMyId] = useState(props.myId);
    const [jsons, setJsons] = useState(props.jsons);
    const readJsons = props.readJsons;

    const messagesRef = useRef(null);

    // 스크롤 위치를 최하단으로 조절하는 함수
    const scrollToBottom = () => {
        if (messagesRef.current) {
            const { scrollHeight, clientHeight } = messagesRef.current;
            messagesRef.current.scrollTop = scrollHeight - clientHeight;
        }
    };

    // jsons가 변경될 때마다 스크롤 위치를 최하단으로 조절
    useEffect(() => {
        scrollToBottom();
        let tempJsons = jsons;
        for(let i=tempJsons.length; i--; i>0){
            if(tempJsons[i].mailFromId != myId && parseInt(tempJsons[i].mailUnread) > 0){
                console.log(`새로운 메세지: ${tempJsons[i].mailPk}`)
                tempJsons[i].mailUnread = tempJsons[i].mailUnread-1;
            }
            else if(tempJsons[i].mailFromId != myId && parseInt(tempJsons[i].mailUnread) == 0){ break; }
        }
        readJsons(tempJsons);
    }, [jsons]);

    return (
        <div className={"container"} style={{height:"30em", overflow:"scroll"}} ref={messagesRef}>
            <ul>
                {
                    jsons.map((item, index) => {
                        return (
                            <li key={index}>
                                {(myId == item.mailFromId) ?
                                    <div className={"d-flex justify-content-end"}>
                                        <div className={"border"}>
                                            <p>
                                                {item.mailDatetime}
                                            </p>
                                            <p>
                                                {item.mailContent}
                                            </p>
                                            <p>나</p>
                                        </div>
                                    </div> :
                                    <div className={"d-flex justify-content-start"}>
                                        <div className={"border"}>
                                            <p>
                                                {item.mailDatetime}
                                            </p>
                                            <p>
                                                {item.mailContent}
                                            </p>
                                            <p>{item.mailFromName}</p>
                                        </div>
                                    </div>
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>

    );
}

export default MailSpeechBubbles;