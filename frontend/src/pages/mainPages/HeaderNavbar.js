import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

function HeaderNavbar(props) {

    const onClickBest = () => {

    }

    return (
        <Navbar expand="lg" className={"navbarMain"}>
            <Container>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse className={"collapsingNavbar"} id="basic-navbar-nav">
                    <Nav className={"mx-auto"}>
                        <Nav.Link href={"/best"} className={"menu"}>베스트셀러</Nav.Link>
                        <Nav.Link href={"/Oldbook"} className={"menu"}>새로 등록된 중고도서</Nav.Link>
                        <Nav.Link href={"/event"} className={"menu"}>이벤트</Nav.Link>
                        <Nav.Link href={"/board"} className={"menu"}>커뮤니티</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        // <nav className="navbar navbar-expand-lg">
        //     <div className="container">
        //         <button type={'button'} className={'btn me-5 navbar-toggler'} data-bs-toggle="collapse"
        //                 data-bs-target={"#navbarSupportedContent"}>
        //             <span className={"navbar-toggler-icon"}></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        //                 <li className="nav-item mx-3">
        //                     <a className="nav-link" href="/best">베스트셀러</a>
        //                 </li>
        //                 <li className="nav-item mx-3">
        //                     <a className="nav-link" href="#">새로 등록된 중고도서</a>
        //                 </li>
        //                 <li className="nav-item mx-3">
        //                     <a className="nav-link" href="#">이벤트</a>
        //                 </li>
        //                 <li className="nav-item mx-3">
        //                     <a className="nav-link" href="/board">커뮤니티</a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    )
}

export default HeaderNavbar;