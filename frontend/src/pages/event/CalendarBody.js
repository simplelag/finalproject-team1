import React, {useEffect, useState} from "react";

function CalendarBody(props) {

    const {totalDate, year, month, today} = props;
    // const lastDate = totalDate.indexOf(1);
    // const startDate = totalDate.indexOf(1, 7);
    //
    // const [holiday, setHoliday] = useState([0]);
    //
    // const findToday = totalDate.indexOf(today);
    const getMonth = new Date().getMonth() + 1;

    useEffect(() => {

    }, []);

    return (
        <form className={"container"}>
            {
                totalDate.map((day, index) => {
                    return (
                        <div className={"date"}>
                            {day}
                        </div>
                    )
                })
            }
        </form>
    )
}

export default CalendarBody;