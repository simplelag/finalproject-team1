import React, {useState, useEffect, Fragment} from 'react';
import axios from "axios";

function MailOpenButton(props) {
    const style = props.style || {fontSize:"10pt"}
    const styleUnread = {
        borderRadius:"50%",
        background:"#e43",
        color:"white",
        padding:"0rem 0.4rem",
        float:"right"
    };
    const room = props.room;
    const title = props.title || "";
    const name = props.name || "";
    const [unreadCount, setUnreadCount] = useState(0);
    const [id, setId] = useState(sessionStorage.getItem("id") || null);


    const countUnread = () => {
        axios.get("/api/mail/getUnreadCount",
            {
                params: {
                    room: room,
                    id: sessionStorage.getItem("id") || ""
                }
            }
        )
            .then((resp) => {
                setUnreadCount(resp.data)
            })
            .catch()
    }

    useEffect(() => {
        countUnread();
    }, []);


    const open = (e) => {
        // 사이즈 지정해서 열기
        const option = `width=${400}, height=${465}, top=${e.clientY - 300}, left=${e.clientX + 50}`
        window.open(`/mail/${room}`, "_blank", option);
        setUnreadCount(0);
    }

    return (
        <Fragment>
            {
                id &&
                <div>
                    <button style={style} type={"button"} onClick={open} className={"chattingBtn btn btn-outline-purple"}>
                        {title && <span>{title}<br/></span>}
                        <span>
                    {name}
                            {unreadCount == 0 ? "" :
                                <span style={styleUnread}>{unreadCount}</span>
                            }
                </span>
                    </button>
                </div>
            }
        </Fragment>
    );
}

export default MailOpenButton;