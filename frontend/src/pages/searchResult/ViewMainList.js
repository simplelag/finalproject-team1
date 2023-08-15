import React, {useEffect, useState} from "react";
import ViewMainBook from "./ViewMainBook";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import axios from "axios";
import async from "async";


function ViewMainList(props) {

    const location = useLocation();
    const navi = useNavigate();

    const [search, setSearch] = useState(location.state.value);
    const [sort, setSort] = useState('Accuracy');
    const [viewNum, setViewNum] = useState("10");

    const onClickSort = (e) => {
        setSort(e.target.value)
        onClickCategory(location.state.value, e.target.value, "10");
    }


    const onClickCategory = (search, sort, viewNum) => {
        axios.get("http://localhost:8080/search", {
            params: {
                SearchType: "Title",
                SearchValue: search,
                SearchSort: sort,
                MaxResults: viewNum
            }
        })
            .then(res => {
                navi("/view", {state: {value: search, data: res.data.item, total: res.data.totalResults}});
            })
            .catch(err => {
                alert("검색 실패")
            })
    }

    const onChangeViewNum = (e) => {
        onClickCategory(location.state.value, sort, e.target.value)
    }

    return (
        <div className={'container'}>
            <Header />
            <div className={"mt-5"}>
                <span>"{location.state.value}" 검색결과 총 {location.state.total}개</span>
                <div className={'my-3'}>
                    <button type={"button"} className={'btn'} value={"Accuracy"} onClick={onClickSort}>정확도순</button>
                    <button type={"button"} className={'btn'} value={"PublishTime"} onClick={onClickSort}>출간일순</button>
                    <button type={"button"} className={'btn'} value={"Title"} onClick={onClickSort}>상품명순</button>
                    <select value={viewNum} onChange={onChangeViewNum} className={'form-select form-select-sm my-2'}>
                        <option value={"10"}>10개씩 보기</option>
                        <option value={"20"}>20개씩 보기</option>
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