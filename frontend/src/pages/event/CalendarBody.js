import React, {useEffect, useState} from "react";
import data from "bootstrap/js/src/dom/data";
import CalendarDate from "./CalendarDate";

function CalendarBody(props) {

    const {totalDate, year, month, today} = props;
    const Day = ['일', '월', '화', '수', '목', '금', '토'];
    const lastDate = totalDate.indexOf(1);
    const startDate = totalDate.indexOf(1, 7);

    // const [holiday, setHoliday] = useState([0]);

    const findToday = totalDate.indexOf(today);
    const getMonth = new Date().getMonth() + 1;



    return (
        <div className={"container"}>
            <table className={"table"}>
                <tbody>
                <tr>
                    <td className={"p-0"}>
                        {
                            totalDate.map((days, index) => {
                                return (
                                    <CalendarDate
                                        key={index}
                                        idx={index}
                                        year={year}
                                        month={month}
                                        day={days}
                                        lastDate={lastDate}
                                        startDate={startDate}
                                        findToday={findToday === index && month === getMonth && findToday}
                                    />
                                )
                            })
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CalendarBody;