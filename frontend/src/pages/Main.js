import React, {useState, useEffect} from 'react';
import axios from "axios";

function Main(props) {
    const apiTest = () => {
        axios.get('http://localhost:8080/main.api')
            .then(res => {
                alert(`수신된 데이터 : ${res.data}`);
            })
            .catch(err => {
                    alert(err);
                }
            )
    }

    return (
        <div>
            <p>mainPage</p>
            <button type={"button"} className={'btn btn-primary me-3'} onClick={apiTest}>main.api</button>
        </div>
    );
}

export default Main;