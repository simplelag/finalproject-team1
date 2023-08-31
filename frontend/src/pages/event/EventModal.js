import React from "react";

function EventModal(props) {


    return (
        <div>
            <div>{props.year}년 {props.month}월 {props.day}일</div>
            <div>
                <textarea className={"form-control"} />
            </div>
            <button className={"btn"}>저장</button>
            <button type={"button"} className={"btn"} onClick={() => {props.setModal(false)}}>닫기</button>
        </div>
    )
}

export default EventModal