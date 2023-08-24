import React, {useState, useEffect} from 'react';

function MailListOpenButton(props) {
    const open = (e) => {
        // 사이즈 지정해서 열기
        const option = `width=${800}, height=${600}, top=${e.clientY - 300}, left=${e.clientX + 50}`
        window.open(`/mail/list`, "_blank", option);
    }

    return (
        <div className={'d-grid text-center'}>
            <button type={"button"} className={"btn btn-primary"} style={{width:'75%'}} onClick={open}>내 쪽지함</button>
        </div>

    );
}

export default MailListOpenButton;