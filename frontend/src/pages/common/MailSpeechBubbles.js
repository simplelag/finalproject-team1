import React, {useState, useEffect, Fragment} from 'react';

function MailSpeechBubbles(props) {
    const [myId, setMyId] = useState(props.myId);
    const [jsons, setJsons] = useState(props.jsons);

    jsons.map((item,index)=>{console.log(item.mailContent)});

    return (
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
    );
}

export default MailSpeechBubbles;