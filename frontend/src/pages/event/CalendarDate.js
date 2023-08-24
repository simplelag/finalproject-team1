import React, {useState} from "react";
import EventModal from "./EventModal";

function CalendarDate(props) {

    const {lastDate, startDate, day, findToday, year, month, idx} = props;

    const [input, setInput] = useState({});
    const [eventList, setEventList] = useState([]);
    const [modal, setModal] = useState(false);

    let dateKey = `${month}` + `${day}`;

    const registerEvent = (event) => {
        setEventList([...eventList, event]);
        setInput('');
        setModal(false);
    }


    return(
        <li className={"pt-2"} style={{position: "relative", width: "14.2857%", height: "130px" , float: "left", listStyle: "none",
            color: idx < lastDate || (idx > startDate - 1 && startDate > 0) ? "grey" : "black",
            backgroundColor: idx < lastDate || (idx > startDate - 1 && startDate > 0) ? "rgba(0, 0, 0 , 0.1)" : "rgba(0, 0, 0, 0.01)",
            }} >
            <span className={"p-2"}
                  style={{backgroundColor: findToday ? "rgba(255, 0, 0, 0.6)" : "", borderRadius: "50%",
                  color: (idx === 6) ? "blue" : "" || (idx === 13) ? "blue" : "" || (idx === 20) ? "blue" : "" ||
                  (idx === 27) ? "blue" : "" || (idx < startDate && idx === 34 || (idx === 34 && startDate === -1)) ? "blue" : "" ||
                  (idx < startDate && idx === 41 || (idx === 41 && startDate === -1)) ? "blue" : "" ||
                  (idx === 0 && lastDate === 0) ? "red" : "" ||
                  (idx === 7) ? "red" : "" || (idx === 14) ? "red" : "" || (idx === 21) ? "red" : "" || (idx === 28) ? "red" : "" || (idx === 35) ? "red" : ""}}
                  onClick={() => setModal(true)}>{day}</span>
            {
                sessionStorage.getItem("grade") == "admin" && modal && <EventModal year={year} month={month} day={day} setModal={setModal}/>
            }
        </li>
    )
}

export default CalendarDate;