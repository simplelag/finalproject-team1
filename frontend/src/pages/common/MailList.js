import React, {useState, useEffect} from 'react';
import axios from "axios";
import MailOpenButton from "./MailOpenButton";

function MailList(props) {
    const [listAsSeller, setListAsSeller] = useState([]);
    const [listAsBuyer, setListAsBuyer] = useState([]);

    const style = {
        width:"90%",
        textAlign:"left",
        padding:"0.4rem 1rem",
        margin:"0.4rem"
    }

    useEffect(() => {
        axios.get("/api/mail/getMailList", {
            params: {
                id: sessionStorage.getItem("id")
            }
        })
            .then((res)=>{
                setListAsBuyer(res.data.asBuyer);
                setListAsSeller(res.data.asSeller);

            })
    },[])
    return (
        <div className={"my-4 mx-3 d-flex w-100 justify-content-around"}>
            <div className={"w-50"}>
                <h5>판매</h5>
                <ul className={"list-unstyled"}>
                    {
                        listAsSeller.map((item,index)=>{
                            return(
                                <li>
                                    <MailOpenButton room={item.room} title={item.title} name={item.name} style={style}/>
                                </li>)
                        })
                    }
                </ul>
            </div>
            <div className={"w-50"}>
                <h5>구매</h5>
                <ul className={"list-unstyled"}>
                    {
                        listAsBuyer.map((item,index)=>{
                            return(
                                <li>
                                    <MailOpenButton room={item.room} title={item.title} name={item.name} style={style}/>
                                </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default MailList;