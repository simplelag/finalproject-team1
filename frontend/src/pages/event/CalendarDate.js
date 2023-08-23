import React, {useState} from "react";

function CalendarDate(props) {

    const {lastDate, startDate, day, findToday, year, month, index} = props;

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
        <div>
            <form onClick={() => setModal(true)}>

            </form>
        </div>
    )
}

export default CalendarDate;