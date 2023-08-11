import React from "react";

function Navbar(props) {

    const onClickBest = () => {

    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <button type={'button'} className={'btn me-5'}>목록</button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="/best">베스트셀러</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="#">새로 등록된 중고도서</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="#">이벤트</a>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link" href="/board">커뮤니티</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;