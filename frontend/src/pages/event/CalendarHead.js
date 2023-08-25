import React from "react";

function CalendarHead(props) {
    const {year, month, todayClick} = props;
    const Day = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className={"container mt-5"}>
            <nav className={"d-flex justify-content-between"}>
                <div style={{fontSize: 24}}>
                    <strong>{year}년 {month}월</strong>
                </div>
                <div className={""}>
                    <button className={"btn btn-sm btn-outline-dark"} onClick={() => {props.setMonth(month - 1)}}>이전</button>
                    <button className={"btn mx-2 btn-outline-dark"} onClick={() => {todayClick()}}>오늘</button>
                    <button className={"btn btn-sm btn-outline-dark "} onClick={() => {props.setMonth(month + 1)}}>다음</button>
                </div>
            </nav>
            <table className={"table mt-3 mb-0"}>
                <thead>
                <tr className={"text-center table-dark"}>
                    {
                        Day.map((date, index) => {
                            return <th key={index} style={{color: date === "토" ? "blue" : "" || date === "일" ? "red" : ""}}>{date}</th>
                        })
                    }
                </tr>
                </thead>
            </table>
        </div>
    )
}

export default CalendarHead;