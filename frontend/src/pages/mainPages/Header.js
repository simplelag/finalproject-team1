import React from "react";
import Navbar from "./Navbar";
import { BsCart2,BsFillPersonFill } from "react-icons/bs";

function Header(props) {

    return (
        <header>
            <div className={'container'}>
                <div className="d-flex">
                    <h2><a href={"/main"}>HOME</a></h2>
                    <input type={'search'} className={'form-control justify-content-center'}/>
                    <button type={'submit'} className={'btn justify-content-center'}>검색</button>
                    <button type={'button'} className={'btn justify-content-end'}><BsCart2 /></button>
                    <button type={'button'} className={'btn justify-content-end'}><BsFillPersonFill /></button>
                </div>
            </div>

            <Navbar />
        </header>
    )
}

export default Header;