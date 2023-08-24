import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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

    const navi = useNavigate();
    const [highPrice,sethighPrice] = useState(0);
    const [lowPrice,setlowPrice] = useState(0);

    const onClickSell = (e) => {
        navi("/sellerPage", {state: {ISBN13: props.data.isbn13}});
    }

    const onClickDetail = (e) => {
        navi("/bookDetailPage", {state: {ISBN13: props.data.isbn13}})
    }
    useEffect(() => {
        axios.get("http://localhost:8080/highPrice",{
            params:{
                ISBN13:props.data.isbn13
            }
        })
            .then(res =>{
                if(res.data.length > 0 ) {
                    sethighPrice(res.data[0].saleBookPrice);
                }
                else{
                    sethighPrice("-");
                }
            })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/lowPrice",{
            params:{
                ISBN13:props.data.isbn13
            }
        })
            .then(res =>{
                if(res.data.length > 0 ) {
                    setlowPrice(res.data[0].saleBookPrice);
                }
                else{
                    setlowPrice("-");
                }
            })
    }, []);

    return (
        <div>
            <div className={'row'}>
                <div className={'col-sm-auto mt-3'}>
                    <p>{props.rank}.</p>
                </div>
                <div className={'col-sm-auto m-3'}>
                    <img src={props.data.cover} style={style.img} />
                </div>
                <div className={'col-sm my-3'} id={''}>
                    <div id={''}>
                        <a className={'text-decoration-none text-black'}>{props.data.title}</a>
                    </div>
                    <div>
                        <span>
                            <a className={'text-decoration-none text-black'}>{props.data.author}</a> |
                            <span className={'ms-2'}>{props.data.pubDate}</span>
                        </span>
                    </div>
                    <div className={'d-flex justify-content-between'}>

                        <table className={'table mt-5 mb-1 w-75'}>
                            <thead>
                            <tr className={'text-center table-secondary'}>
                                <th>새책 정가</th>
                                <th>중고최저가</th>
                                <th>중고최고가</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className={'text-center'}>
                                <td>{props.data.priceStandard}원</td>
                                <td>{lowPrice}원</td>
                                <td>{highPrice}원</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className={'text-center mb-1 d-flex flex-column justify-content-end'}>
                            <button type={'button'} className={'btn btn-outline-purple'} name={''} onClick={onClickDetail}>중고도서보기</button>
                            <button type={'button'} className={'btn btn-outline-purple mt-2'} name={''} onClick={onClickSell}>판매하기</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ViewMainBook;