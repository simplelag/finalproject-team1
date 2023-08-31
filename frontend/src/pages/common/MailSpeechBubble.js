import React, {useState, useEffect, Fragment, useRef} from 'react';

function MailSpeechBubble(props) {
    const id = props.id;
    const item = props.item;
    const prevItem = props.prev;
    const nextItem = props.next;

    return (
        <li>
            <div className={id == item.mailFromId ? "bubble-me" : "bubble-other"}>
                <div>
                    {prevItem.mailFromName == item.mailFromName ?
                        "" :
                        <div className={"name"}>
                            <span>{item.mailFromName}</span><br/>
                        </div>
                    }
                    <div className={"content-read"}>
                        <div className={"read"}>
                            <span>{item.mailUnread == 0 ? "읽음" : ""}</span>
                        </div>
                        <div className={"content " + (item.mailUnread == 0 ? "" : "unread")}>
                            <span>
                                {item.mailContent.split("\n").map((line) => {
                                    return (
                                        <span>
                                            {line}
                                            <br/>
                                        </span>
                                    );
                                })}
                            </span>
                        </div>
                    </div>
                    {
                        nextItem.mailDatetime == item.mailDatetime ? ""
                            :
                            <div className={"datetime"}>
                                <span className={"date"}>{item.mailDatetime.split(" ")[0]+" "}</span>
                                <span className={"time"}>{item.mailDatetime.split(" ")[1]}</span>
                            </div>
                    }
                </div>
            </div>
        </li>
    );
}

export default MailSpeechBubble;