import React, {Fragment, useEffect, useState} from "react";
import ViewMainBook from "./ViewMainBook";
import {useLocation, useNavigate} from "react-router-dom";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import axios from "axios";
import async from "async";
import Pagenation from "../common/Pagenation";


function ViewMainList(props) {

    const location = useLocation();
    const navi = useNavigate();


    const [search, setSearch] = useState(location.state.value);
    const [sort, setSort] = useState('Accuracy');
    const [viewNum, setViewNum] = useState("10");
    const [nowPage, setNowPage] = useState("1")


    const [bookList, setBookList] = useState(location.state.data);
    const [btnList, setBtnList] = useState([]);

    let lastPage = Math.ceil(location.state.total/viewNum);
    let firstViewBtn = Math.floor((nowPage -1) / 5) * 5 + 1;

    // 버튼 생성
    const btnCreate = () => {
        let btnArray = [];
        if (firstViewBtn != 1) {
            btnArray.push("이전")
        }
        for (let i = firstViewBtn; i < firstViewBtn + 5; i++) {
            btnArray.push(i);
            if (i >= lastPage) {
                break;
            }
            if (i == firstViewBtn + 5 - 1) {
                btnArray.push("다음")
            }
        }
        setBtnList(btnArray);
    }

    // 버튼 이벤트 핸들러
    const nowBtn = (item) => {
        if (item === "이전") {
            setNowPage(firstViewBtn - 5);
        }
        else if (item === "다음") {
            setNowPage(firstViewBtn + 5);
        }
        else {
            reloadingList(item);
        }
    }

    // api
    const reloadingList = (page) => {
        axios.get("http://localhost:8080/search", {
            params: {
                StartNum: page,
                SearchType: "Title",
                SearchValue: search,
                SearchSort: sort,
                MaxResults: viewNum
            }
        })
            .then(res => {
                setBookList(res.data.item)
            })
            .catch(err => {
                alert("Btn Err")
            })
    };


    // 카테고리 분류
    const onClickSort = (e) => {
        setSort(e.target.value)
        onClickCategory(location.state.value, e.target.value, viewNum);
    }

    const onClickCategory = (search, sort, viewNum) => {
        axios.get("http://localhost:8080/search", {
            params: {
                SearchType: "Title",
                SearchValue: search,
                SearchSort: sort,
                MaxResults: viewNum,
                StartNum: "1",
            }
        })
            .then(res => {
                setBookList(res.data.item)
            })
            .catch(err => {
                alert("검색 실패")
            })
    }

    const onChangeViewNum = (e) => {
        setViewNum(e.target.value)
        onClickCategory(location.state.value, sort, e.target.value)
    }

    // 페이지 로딩시 버튼생성
    useEffect(() => {
        btnCreate();
    },[nowPage])

    return (
        <Fragment>
            <Header />
            <div className={'container'}>

                <div className={"mt-5"}>
                    <span>"{location.state.value}" 검색결과 총 {location.state.total}개</span>
                    <div className={'my-3'}>
                        <button type={"button"} className={'btn'} value={"Accuracy"} onClick={onClickSort}>정확도순</button>
                        <button type={"button"} className={'btn'} value={"PublishTime"} onClick={onClickSort}>출간일순</button>
                        <button type={"button"} className={'btn'} value={"Title"} onClick={onClickSort}>상품명순</button>
                        <select value={viewNum} defaultValue={viewNum} onChange={onChangeViewNum} className={'form-select form-select-sm my-2'}>
                            <option value={"10"}>10개씩 보기</option>
                            <option value={"20"}>20개씩 보기</option>
                        </select>
                    </div>
                </div>
                {
                    bookList.map(item => {
                        return (
                            <ViewMainBook data={item}/>
                        )
                    })
                }
                <div className={"text-center"}>
                    {
                        btnList.map(item => {
                            return (
                                <button key={item} onClick={() => {nowBtn(item)}} className={"btn"}>{item}</button>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default ViewMainList;