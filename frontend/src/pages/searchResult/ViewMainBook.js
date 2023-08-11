import React from "react";

const style = {
    box: {
        width: '152px',
        height: '215px',
    },
    img: {
        width: '152px',
        height: '215px'
    }
}

function ViewMainBook(props) {

    return (
        <div>
            <div className={'row'}>
                <div className={'col-sm-auto m-3'} style={style.box}>
                    <img src={'/image/1.png'} style={style.img} />
                </div>
                <div className={'col-sm my-3'} id={''}>
                    <div id={''}>
                        <a href={'#'} className={''}>책제목(더미)</a>
                        <span className={'ms-2'}>소제목(더미)</span>
                    </div>
                    <div>
                        <span>
                            {/*지은이 그림 옮긴이 등 받아오는 api정보에 맞게 a태그가 추가될 필요가 있어보임*/}
                            <a href={'#'} className={''}>지은이</a> |
                            <span className={''}> 출판일</span>
                        </span>
                    </div>
                    <div className={'d-flex'}>
                        <table className={'table mt-5'}>
                            <thead>
                            <tr className={'text-center'}>
                                <th>새책 정가</th>
                                <th>중고최저가</th>
                                <th>중고최고가</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={'text-center'}>
                                <td>0000원</td>
                                <td>0000원</td>
                                <td>0000원</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={'col-sm-auto text-center my-3'}>
                    <button type={'button'} className={'btn btn-dark'} name={''}>중고도서보기</button>
                    <br/>
                    <button type={'button'} className={'btn btn-dark my-2'} name={''}>장바구니 담기</button>
                    <br/>
                    <button type={'button'} className={'btn btn-dark'} name={''}>판매하기</button>
                </div>
            </div>
        </div>
    )
}

export default ViewMainBook;