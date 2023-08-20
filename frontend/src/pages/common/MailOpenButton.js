import React, {useState, useEffect} from 'react';
import axios from "axios";

function MailOpenButton(props) {
    const purchasePk = props.purchasePk;
    const [unreadCount, setUnreadCount] = useState(0);


    const countUnread = () => {
        axios.get("/api/mail/getUnreadCount",
            {
                params: {
                    purchasePk: purchasePk,
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
        window.open(`/mail/${purchasePk}`, "_blank", option);
        setUnreadCount(0);
    }

    return (
        <div>
            <button type={"button"} onClick={open}>메일 {purchasePk}</button>
            {unreadCount == 0 ? "" :
                <span>미확인: {unreadCount}</span>
            }
        </div>

    );
}

export default MailOpenButton;