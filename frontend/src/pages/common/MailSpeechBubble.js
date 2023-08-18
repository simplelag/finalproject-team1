import React, {useState, useEffect, Fragment, useRef} from 'react';

function MailSpeechBubble(props) {
    const id = props.id;
    const item = props.item;


    return (
        <li>
            {(id == item.mailFromId) ?
                <div className={"d-flex justify-content-end"}>
                    <span>{item.mailUnread}</span>
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
                    <span>{item.mailUnread}</span>
                </div>
            }
        </li>
    );
}

export default MailSpeechBubble;