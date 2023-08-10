import React from 'react';

function OldBookList() {

    return (
        <div className={"container"}>
        <div className={"row"}>
            <div className={"col-sm-2"}>
                <a href="#">
                    <img src="#" alt="이미지 나오는 곳"/>
                </a>
            </div>
            <div className={"col-sm-3"}>
                <ul style={{listStyleType:"none"}}>
                    <li>
                    <p><strong>[중고] 책 이름</strong></p>
                    </li>
                    <li>
                        <p style={{fontSize:"9pt"}}>평균 출고일 n일 이내</p>
                    </li>
                </ul>
            </div>
            <div className={"col-sm-1"}>
                <p>등급</p>
            </div>
            <div className={"col-sm-2"}>
                <span>"판매가격"</span>
            </div>
            <div className={"col-sm-2"}>
                <span>"판매자 이름"</span>
            </div>
            <div className={"col-sm-2"}>
                <a href="#"className={"btn btn-link bg-dark"} style={{fontSize:"10pt",color:"white",textDecoration:"none",width:"100pt"}}>장바구니 담기</a>
                <a href="#"className={"btn btn-link bg-dark"} style={{fontSize:"10pt",color:"white",textDecoration:"none", width:"100pt"}}>바로 구매</a>
                <a href="#"className={"btn btn-link bg-dark"} style={{fontSize:"10pt",color:"white",textDecoration:"none", width:"100pt"}}>보관함 담기</a>

            </div>
        </div>
        </div>
    )
}

export default OldBookList;