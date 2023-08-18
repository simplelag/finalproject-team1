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
                console.log(res.data)
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
                console.log(res.data)
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
                <div className={'col-sm-auto m-3'} style={style.box}>
                    <img src={props.data.cover} style={style.img} onClick={onClickDetail} />
                </div>
                <div className={'col-sm my-3'} id={''}>
                    <div id={''}>
                        <a href={'#'} className={'text-decoration-none'} style={{color:"black"}} onClick={onClickDetail}>{props.data.title}</a>
                    </div>
                    <div>
                        <span>
                            <a href={'#'} className={'text-decoration-none'} style={{color:"black"}}>{props.data.author}</a> |
                            <span className={'ms-2'}>{props.data.pubDate}</span>
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
                                <td>{props.data.priceStandard}원</td>
                                <td>{lowPrice}원</td>
                                <td>{highPrice}원</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={'col-sm-auto text-center my-3'}>
                    <button type={'button'} className={'btn btn-dark'} name={''} onClick={onClickDetail}>중고도서보기</button>
                    <br/>
                    <br/>
                    <button type={'button'} className={'btn btn-dark'} name={''} onClick={onClickSell}>판매하기</button>
                </div>
            </div>
        </div>
    )
}

export default ViewMainBook;