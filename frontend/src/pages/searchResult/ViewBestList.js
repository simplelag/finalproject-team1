import React, {useEffect, useState} from "react";
import ViewMainBook from "./ViewMainBook";

import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import axios from "axios";


function ViewMainList(props) {

    const [best, setBest] = useState([]);
    const [viewNum, setViewNum] = useState("10");

    useEffect(() => {
        axios.get('http://localhost:8080/api', {
            params: {
                Type: "Bestseller",
                MaxResults: viewNum
            }
        })
            .then(res => {
                setBest(res.data.item);
            })
    }, [])

    const onChangeViewNum = (e) => {
        axios.get('http://localhost:8080/api', {
            params: {
                Type: "Bestseller",
                MaxResults: e.target.value
            }
        })
            .then(res => {
                setBest(res.data.item);
            })
    }

    return (
        <div className={'container'}>
            <Header />
            <div className={"mt-5"}>
                <span>"베스트셀러" 검색결과 총 0개</span>
                <div className={'my-3'}>
                    <a href={'#'} className={'me-3'}>인기순</a>
                    <a href={'#'}>신상품순</a>
                    <select value={viewNum} onChange={onChangeViewNum} className={'form-select form-select-sm my-2'}>
                        <option value={'10'}>10개씩 보기</option>
                        <option value={'20'}>20개씩 보기</option>
                    </select>
                </div>
            </div>
            {
                best.map(item => {
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