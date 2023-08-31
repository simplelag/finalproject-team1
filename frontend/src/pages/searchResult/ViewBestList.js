import React, {Fragment, useEffect, useState} from "react";
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
                setViewNum(res.data.item.length)
            })
    }

    let i = 0;

    return (
        <Fragment>
            <Header />
            <div className={'container'}>
                <div className={"mt-5"}>
                    <span>"베스트셀러" 검색결과 총 {viewNum}개</span>
                    <div className={'my-3'}>
                        <select defaultValue={viewNum} onChange={onChangeViewNum} className={'form-select form-select-sm my-2'}>
                            <option value={'10'}>Top 10</option>
                            <option value={'20'}>Top 20</option>
                        </select>
                    </div>
                </div>
                {
                    console.log(best)
                }
                {
                    best.map(item => {
                        i++;
                        return (
                            <ViewMainBook key={item.isbn13} data={item} rank={i}/>
                        )
                    })
                }
            </div>
            <Footer />
        </Fragment>

    )
}

export default ViewMainList;