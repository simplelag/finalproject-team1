import React, {useState, useEffect} from 'react';

function QuestionOpenLink(props) {
    const open = (e)=> {
    const option = `width=${800}, 
    height=${540}, 
    top=${(window.screen.height - 540)/2 }, 
    left=${(window.screen.width - 800)/2 }`
        window.open(`/question/write`, "_blank", option);
    }
    return (
        <button type={"button"} className={"btn btn-purple"} onClick={open}>문의</button>
    );
}

export default QuestionOpenLink;