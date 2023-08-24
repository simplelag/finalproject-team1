import React, {useEffect, useState} from "react";
import CalendarHead from "./CalendarHead";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import CalendarBody from "./CalendarBody";

function EventCalendar(props) {

    let DATE = new Date();
    const Year = DATE.getFullYear();
    const Month = DATE.getMonth() + 1;

    const [month, setMonth] = useState(Month);
    const [year, setYear] = useState(Year);
    const [totalDate, setTotalDate] = useState([]);

    const onChangeDate = (month) => {
        // 지난달 마지막날
        let prevDate = new Date(Year, month - 1, 0).getDate();
        let prevDay = new Date(Year, month -1, 0).getDay();

        // 이번달 마지막날
        let nextDate = new Date(Year, month, 0).getDate();
        let nextDay = new Date(Year, month, 0).getDay();

        let pre = [];
        // 지난달 마지막날 계산
        if (prevDay !== 6) {
            for (let i = 0; i < prevDay + 1; i++) {
                pre.unshift(prevDate - i);
            }
        }

        let next = [];
        //이번달 마지막날 계산
        for (let i = 1; i < 7 - nextDay; i++) {
            if (i === 0) {
                return next;
            }
            next.push(i);
        }

        let now = [];
        now = [...Array(nextDate + 1).keys()].splice(1);

        // 합치기
        return  pre.concat(now, next);
    }

    // useEffect(() => {
    //     setTotalDate(onChangeDate())
    // }, []);

    useEffect(() => {
        setTotalDate(onChangeDate(month))
    }, [month])

    const [today, setToday] = useState(0);

    const todayClick = () => {
        let Today = new Date().getDate();
        let monthClick = new Date().getMonth() + 1;

        setMonth(monthClick);
        setToday(Today);
    }

    return (
        <div>
            <Header />

            <CalendarHead year={year} month={month} setMonth={setMonth} todayClick={todayClick} />
            <CalendarBody year={year} month={month} today={today} totalDate={totalDate}/>

            <Footer />
        </div>
    )

}

export default EventCalendar;