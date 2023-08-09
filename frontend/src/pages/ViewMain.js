import React from "react";
import Header from "./mainPages/Header";
import Footer from "./mainPages/Footer";
import ViewMainList from "./ViewMainList";

function ViewMain(props) {

    return (
        <div>
            <Header />
            <h2>{props.mainTitle}</h2>
            <ViewMainList />
            <Footer />
        </div>
    )
}

export default ViewMain;