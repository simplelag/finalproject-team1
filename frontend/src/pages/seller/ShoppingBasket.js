import React from 'react';

function ShoppingBasket() {

    return (
        <main className={"container"}>
            <div className={"p-2"}>
                <h4>장바구니</h4>
                <input className={"form-check-input"} type={"checkbox"} value={""} id={"checkbox"}/>
                <label className={"form-check-label ms-2"} for={"checkbox"}>전체 선택</label>
                <table className={"table table-bordered mt-3"}>
                    <tbody>
                    <tr>
                        <th className={"text-center"}>
                            <input type="checkbox" name={"allSelect"}/>
                        </th>
                        <th className={"text-center"}>상품명</th>
                        <th className={"text-center"}>가격</th>
                        <th className={"text-center"}>수량</th>
                    </tr>
                    </tbody>
                </table>
                <table className={"table table-borderless"}>
                    <tr>
                        <td className={"text-center"}>
                            <input type="checkbox" name={"Selectone"}/>
                        </td>
                        <td><a href="#" title={"비가 오면 열리는 상점"}>
                            <img src="#" alt="이미지가 들어갈 자리"/>
                        </a>
                        </td>
                        <td>
                            <span>
                                <a href="#">[국내도서] 비가 오면 열리는 상점
                                </a>
                            </span>
                        </td>
                        <td>
                            "정가:"
                            <s>16,800</s>
                            <br/>
                            "판매가:"
                            <span class={"p-1"}>15,120</span>
                            "원"
                        </td>
                        <td className={"text-center"}>
                            <div className={"row"}>
                                <div className={"col-sm-2"}>
                                    <input type="text" className={"form-control"}
                                           style={{height: "20px", width: "30px"}}/>
                                </div>
                                <div className={"col-sm-2 ms-2"}>
                                    <p>개</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div className={"text-center"}>
                <button type={"submit"} className={"btn btn-success"}><h4>주문하기</h4></button>
            </div>
        </main>
    )
}

export default ShoppingBasket;