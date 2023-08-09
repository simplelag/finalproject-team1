import React, {useEffect, useState} from 'react' ;
import axios from "axios";
import Header from "./mainPages/Header";
import Footer from "./mainPages/Footer";


function SellerPage() {
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [generatedHtml, setGeneratedHtml] = useState('');
    const onChange = (e) => {
        setText(e.target.value);
        setName(e.target.value);
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
                console.log(itemList[0].title)
                let tag = `<div class=\"mt-4\">`
                tag += `<h4>상품 기본 정보</h4>`
                tag += " <div class=\"card mb-3 mt-3\">"
                tag += `<div/>`
                tag += "<div class=\"row g-0\">";
                tag += "<div class=\"col-md-10\">";
                tag += `<p class=\"card-text\">제목:${itemList[0].title}\</p>`;
                tag += `<p class=\"card-text\">저자:${itemList[0].authors}</p>`;
                tag += `<p class=\"card-text">출판사:${itemList[0].publisher}</p>`;
                tag += `<p class=\"card-text">isbn:${itemList[0].isbn}</p>`;
                tag += `<p class=\"card-text">출판사:${itemList[0].contents}</p>`;
                tag += "</div>";
                tag += "<div class=\"col-md-2\">";
                tag += `<img src= ${itemList[0].thumbnail} alt=\"사진 출력될 자리\" class=\"img-fluid rounded-start text-end \" style="width: 250px"/>`;
                tag += "</div>";
                tag += `</div>`;
                tag += `<div class="mt-3 p-2" style="">`;
                tag += `<h4>가격 정보</h4>`;
                tag += `<p>정가 : ${itemList[0].price} </p>`;
                tag += ` <form>`;
                tag += `<div class="row">`;
                tag += `<div class="col-sm-2">`;
                tag += ` <label>중고판매가 :</label>`;
                tag += `</div>`;
                tag += `<div class="col-sm-3">`;
                tag += `<input type="text" class="form-control"/>`;
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
                tag += `<textarea name="explain" id="explain" cols="30" rows="5"></textarea>`;
                tag += ` <label class="form-label">도서 상태</label>`;
                tag += ` <input type="text" class="form-control"/>`;
                tag += ` </form>`;
                tag += `</div>`;
                tag += `<div class="text-center">`;
                tag += `<button type="submit" class="btn btn-dark"><p class="text-white mt-2">등록하기</p>`;
                tag += `</button>`;
                tag += `</div>`;
                setGeneratedHtml(tag);
            })
            .catch((error) => {
                console.error('API 연결 중 문제 발생', error);
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
            <Footer/>
        </main>
    )
        ;
}

export default SellerPage;