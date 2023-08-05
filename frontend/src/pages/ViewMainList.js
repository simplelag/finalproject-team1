import React from "react";
import ViewMainBook from "./ViewMainBook";


function ViewMainList(props) {

    return (
        <div className={'container my-5'}>
            <div>
                <span>'?' 검색결과 총 ?개</span>
                <div className={'my-3'}>
                    <a href={'#'} className={'me-3'}>인기순</a>
                    <a href={'#'}>신상품순</a>
                    <select className={'form-select form-select-sm'}>
                        <option value={'5'}>5개씩 보기</option>
                        <option value={'10'}>10개씩 보기</option>
                    </select>
                </div>
            </div>
            <ViewMainBook />
            <ViewMainBook />
            <ViewMainBook />
            <ViewMainBook />
            <ViewMainBook />
        </div>
    )
}

export default ViewMainList;