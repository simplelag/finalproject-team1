import React from 'react';
import PurchaseMain from "./PurchaseMain";

function PurchaseList(props) {

    return (
        <div>
            <h1 className={'text-center'}>구매 페이지</h1>
            <div className={`container my-4`}>
                <PurchaseMain />
            </div>
        </div>
    )
}

export default PurchaseList;