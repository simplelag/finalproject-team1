import React, {useEffect, useState} from 'react' ;
import axios from "axios";
import Header from "./mainPages/Header";
import Footer from "./mainPages/Footer";
import {useNavigate} from "react-router-dom";


function SellerPage() {
    const [text, setText] = useState('');
    let [booktitle,setbooktitle] = useState('');
    let [authors,setauthors] = useState('');
    let [publisher,setpublisher] = useState('');
    let [isbn,setisbn] = useState('');
    let [bookprice,setbookprice] = useState('');
    let [saleprice,setsaleprice] = useState('');
    let [thumbnail,setthumbnail] = useState('');
    let [status , setstatus] = useState('');
    let [explain, setexplain] = useState('');

    const navi = useNavigate();


    const [generatedHtml, setGeneratedHtml] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
    }
    const booknamesearch = () => {
        search();
    }

    const search = () => {
        //     axios 사용하여 카카오 api와 연결
        axios.get(`https://dapi.kakao.com/v3/search/book?sort=accuracy&size=1&query=${text}`, {headers: {Authorization: "KakaoAK b8e55ccaf5d6a1f95fcd8d593bbade59"}})
            .then((response) => {
                console.log(response.data.documents)
                const itemList = response.data.documents
                booktitle = itemList[0].title;
                authors = itemList[0].authors;
                publisher = itemList[0].publisher;
                isbn = itemList[0].isbn;
                bookprice = itemList[0].price
                thumbnail = itemList[0].thumbnail
                let tag = `<div class=\"mt-4\">`
                tag += `<h4>상품 기본 정보</h4>`
                tag += " <div class=\"card mb-3 mt-3\">"
                tag += `<div/>`
                tag += "<div class=\"row g-0\">";
                tag += "<div class=\"col-md-10\">";
                tag += `<p class=\"card-text\">제목:${booktitle}\</p>`;
                tag += `<p class=\"card-text\">저자:${authors}</p>`;
                tag += `<p class=\"card-text">출판사:${publisher}</p>`;
                tag += `<p class=\"card-text">isbn:${isbn}</p>`;
                tag += `<p class=\"card-text">줄거리:${itemList[0].contents}</p>`;
                tag += "</div>";
                tag += "<div class=\"col-md-2\">";
                tag += `<img src= ${thumbnail} alt=\"사진 출력될 자리\" class=\"img-fluid rounded-start text-end \" style="width: 250px"/>`;
                tag += "</div>";
                tag += `</div>`;
                tag += `<div class="mt-3 p-2" style="">`;
                tag += `<h4>가격 정보</h4>`;
                tag += `<p>정가 : ${bookprice} </p>`;
                tag += ` <form>`;
                tag += `<div class="row">`;
                tag += `<div class="col-sm-2">`;
                tag += ` <label>중고판매가 :</label>`;
                tag += `</div>`;
                tag += `<div class="col-sm-3">`;
                tag += `<input type="text" value="saleprice" class="form-control"/>`;
                tag += `</div>`;
                tag += `</div>`;
                tag += `</form>`;
                tag += `</div>`;
                tag += `<div class="mt-3 p-2">`;
                tag += `<h4>공급 정보</h4>`;
                tag += `<form>`;
                tag += `<label class="form-label">출고지</label>`;
                tag += `<input type="text" class="form-control"/>`;
                tag += `</form>`;
                tag += `</div>`;
                tag += `<div class="mt-3 p-2 ">`
                tag += ` <h4>상품 설명/유의사항</h4>`;
                tag += `<form>`;
                tag += `<textarea name="explain" id="explain" cols="30" rows="5" value={explain} onChange={onChange}></textarea>`;
                tag += ` <label class="form-label">도서 상태</label>`;
                tag += ` <input type="text" class="form-control" value={status} onchange={onchange}/>`;
                tag += `</form>`;
                tag += `</div>`;
                setGeneratedHtml(tag);
            })
            .catch((error) => {
                console.error('API 연결 중 문제 발생', error);
            });
    }
    const postinfo = () =>{
        axios.post('http://localhost:8080/bookInfo',null,{
            params:{
                bookcoverUrl: thumbnail,
                booktitle: booktitle,
                bookAuthor: authors,
                bookstandardPrice: bookprice,
                bookIsbn: isbn,

            }
        })
            .then(() => {
                navi("/main/board");
            })
            .catch((error) =>{
            console.error("데이터 송신 중 오류 발생",error)
        });
    }
    return (

        <main className={"container"}>
            <div>
                <Header/>
                <form>
                    <label className={"form-label"}>
                        <h4>도서 검색</h4>
                        <input type="text" className={"form-control"} value={text}
                               onChange={onChange}/>
                    </label>
                    <button type={"button"}className={"ms-3 btn btn-primary"}
                            onClick={search}>검색
                    </button>
                </form>
            </div>
            <div dangerouslySetInnerHTML={{__html: generatedHtml}}/>
           <div className="text-center">
            <button type="submit" className="btn btn-dark"><p className="text-white mt-2" onClick={postinfo}>등록하기</p>
            </button>
            </div>
            <Footer/>
        </main>
    )
        ;
}

export default SellerPage;