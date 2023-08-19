import React from 'react';
import PurchaseMain from "./PurchaseMain";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";

function PurchaseList(props) {

    return (
        <div>
            <Header />
            <h1 className={'text-center mt-4'}>구매 페이지</h1>
            <div className={`container my-4`}>
                <PurchaseMain />
            </div>
            <Footer />
        </div>
    )
}

export default PurchaseList;