import React from "react";

function CalendarHead(props) {
    const {year, month, todayClick} = props;
    const Day = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <form className={"container"}>
            <nav className={"d-flex"}>
                <div>
                    {year}년 {month}월
                </div>
                <div className={""}>
                    <button className={"btn btn-sm"} onClick={() => {props.setMonth(month - 1)}}>이전</button>
                    <button className={"btn btn-sm"} onClick={() => {todayClick()}}>오늘</button>
                    <button className={"btn btn-sm"} onClick={() => {props.setMonth(month + 1)}}>다음</button>
                </div>
            </nav>
                {
                    Day.map((item, index) => {
                        return (
                            <table className={"table"}>
                                <tr>
                                    <th key={index}>{item}</th>
                                </tr>
                            </table>
                        )
                    })
                }
        </form>
    )
}

export default CalendarHead;