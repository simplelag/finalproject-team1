import React, {useState} from "react";
import Navbar from "./Navbar";
import { BsCart2,BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Header(props) {

    const [bookSearch, setBookSearch] = useState([]);
    const [search, setSearch] = useState("");

    const navi = useNavigate();

    // 검색값 변경
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const onClickSearch = (e) => {
        axios.get("http://localhost:8080/search", {
            params: {
                SearchType: "Title",
                SearchValue: search
            }
        })
            .then(res => {
                setBookSearch(res.data);
                console.log(res.data)
                navi("/view", {state: {value: search, data: res.data.item, total: res.data.totalResults}});
            })
            .catch(err => {
                alert("검색 실패")
            })
    }

    return (
        <header>
            <div className={'container my-3'}>
                <div className="d-flex">
                    <h2><a href={"/"}>HOME</a></h2>
                    <input type={'search'} className={'form-control justify-content-center'} onChange={onChangeSearch}/>
                    <button type={'submit'} className={'btn justify-content-center'} onClick={onClickSearch}>검색</button>
                    <button type={'button'} className={'btn justify-content-end'}><BsCart2 /></button>
                    <button type={'button'} className={'btn justify-content-end'}><BsFillPersonFill /></button>
                </div>
            </div>
            <Navbar />
        </header>
    )
}

export default Header;