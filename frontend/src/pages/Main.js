import React, {useState, useEffect} from 'react';
import axios from "axios";

function Main(props) {
    const apiTest = () => {
        axios.get('/api/main',{ withCredentials: true })
            .then(res => {
                sessionStorage.setItem("id",res.data.id);
                alert(`수신된 데이터 : ${res.data.content}, id : ${res.data.id}`);
            })
            .catch(err => {
                    alert(err);
                }
            )
    }

    return (
        <div>
            <p>mainPage</p>
            <button type={"button"} className={'btn btn-outline-primary me-3'} onClick={apiTest}>main.api</button>
        </div>
    );
}

export default Main;