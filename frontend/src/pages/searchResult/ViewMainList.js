import React, {useEffect, useState} from "react";
import ViewMainBook from "./ViewMainBook";
import {useLocation} from "react-router-dom";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import axios from "axios";


function ViewMainList(props) {

    const [best, setBest] = useState([])

    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8080/api', {
            params: {
                Type: "Bestseller"
            }
        })
            .then(res => {
                setBest(res.data);
            })
    }, [])

    console.log(best)


    return (
        <div className={'container'}>
            <Header />
            <div className={"mt-5"}>
                <span>"{location.state.value}" 검색결과 총 ?개</span>
                <div className={'my-3'}>
                    <a href={'#'} className={'me-3'}>인기순</a>
                    <a href={'#'}>신상품순</a>
                    <select className={'form-select form-select-sm my-2'}>
                        <option value={'10'}>10개씩 보기</option>
                        <option value={'5'}>5개씩 보기</option>
                    </select>
                </div>
            </div>
            {
                 location.state.data.map(item => {
                    return (
                        <ViewMainBook key={item.isbn13} data={item}/>
                    )
                })
            }
            <Footer />
        </div>
    )
}

export default ViewMainList;