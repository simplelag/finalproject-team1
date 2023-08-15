import React, {useState} from "react";
import Navbar from "./Navbar";
import { BsCart2,BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const style = {
    img: {
        width: "100px",
        height: "100px"
    }
}

function Header(props) {

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
                SearchValue: search,
                SearchSort: "Accuracy",
                MaxResults: "10"
            }
        })
            .then(res => {
                navi("/view", {state: {value: search, data: res.data.item, total: res.data.totalResults}});
            })
            .catch(err => {
                alert("검색 실패")
            })
    }

    const onClickMyPage = () => {
        if (sessionStorage.getItem("id") != null) {
            navi("/login/myLogin")
        }
        else {
            navi("/login")
        }
    }

    return (
        <header>
            <div className={'container my-3'}>
                <div className="">
                    <h2><a href={"/"}><img src={"/image/mainLogo.png"} style={style.img}/></a></h2>
                    <input type={'search'} className={'form-control'} onChange={onChangeSearch}/>
                    <button type={'submit'} className={'btn'} onClick={onClickSearch}>검색</button>
                    <button type={'button'} className={'btn'}><BsCart2 /></button>
                    <button type={'button'} className={'btn'} onClick={onClickMyPage}><BsFillPersonFill /></button>
                </div>
            </div>
            <Navbar />
        </header>
    )
}

export default Header;