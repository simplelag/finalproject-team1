import React, {useState} from "react";
import HeaderNavbar from "./HeaderNavbar";
import {BsCart2, BsFillPersonFill} from "react-icons/bs";
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
                SearchValue: search,
                MaxResults: "10",
                SearchSort: "Accuracy",
                StartNum: "1"

            }
        })
            .then(res => {
                setBookSearch(res.data);
                console.log(res.data.item)
                navi("/view", {state: {value: search, data: res.data.item, total: res.data.totalResults}});
            })
            .catch(err => {
                alert("검색 실패")
            })
    }

    const onClickMyPage = () => {
        const grade = sessionStorage.getItem("grade");
        switch (grade) {
            case "admin":
                window.location = "/admin";
                break;
            case "user":
                window.location = "/login/myLogin";
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("grade");
        navi("/");
    }

    return (
        <header>
            <div className={'container my-3'}>
                <div className="d-flex align-items-end justify-content-between">
                    <a href={"/"}>
                        <img className={"headerLogo"} src="/image/logo3.png" alt="home"/>
                    </a>

                    <div className={"d-flex align-items-end ps-5"}>
                        <input type={'search'} className={'form-control'} onChange={onChangeSearch}/>
                        <button type={'submit'} className={'btn search'} onClick={onClickSearch}>검색</button>
                    </div>

                    {(sessionStorage.getItem("id") &&
                        <div className={"d-flex align-items-center loginBtns"}>
                            <span>{sessionStorage.getItem("name")} </span>
                            <button type={"button"} className={"btn"} onClick={handleLogout} >로그아웃</button>
                            <button type={'button'} className={'btn'}><BsCart2 className={"my-auto"}/></button>
                            <button type={'button'} className={'btn'} onClick={onClickMyPage}><BsFillPersonFill/></button>
                        </div>) ||
                        (<div>
                        <a href="/Login" className={"text-decoration-none text-black"}>로그인</a>
                    </div>)}


                </div>
            </div>
            <HeaderNavbar/>
        </header>
    )
}

export default Header;