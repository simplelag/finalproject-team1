import React, {useState, useEffect} from 'react';

function MailOpenButton(props) {
    const purchasePk = props.purchasePk;
    // 사이즈 지정해서 열기
    function open(){
        window.open(`/mail/${purchasePk}`, "_blank", "width=600, height=800");
    }
    return (
        <button type={"button"} onClick={open} >메일 {purchasePk}</button>
    );
}

export default MailOpenButton;