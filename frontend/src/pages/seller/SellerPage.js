import React, {useEffect, useState} from 'react' ;
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";




function SellerPage() {

    const [text,setText] =useState('');
    const[bookList,setBookList] = useState([]);

    const[salePrice,setsalePrice] = useState('');
    const[discription,setdiscription] = useState('');
    const[postPrice,setpostPrice] = useState(0);
    const[bookTitle,setbookTitle] =useState('');
    const[bookISBN,setbookISBN] = useState(0);
    const[bookCover,setbookCover] = useState('');
    const[sellerId,setsellerId]  = useState('testSellerId');
    const[sellerName,setSellerName] = useState('testSellerName');
    const[bookPrice,setbookPrice] = useState(0);
    const[bookPieces,setbookPieces] = useState(1);
    const[bookGrade,setbookGrade] = useState(0);

    const onChangetext = (e) =>{
        setText(e.target.value);
    }
    const onChangePrice = (e) =>{
        setbookPrice(e.target.value);
    }
    const onChangediscription = (e) =>{
        setdiscription(e.target.value);
    }
    const onChangeGrade = (e) =>{
        setbookGrade(e.target.value);
    }
    const search = () => {
            axios.get('http://localhost:8080/searchNoType', {
                params: {
                    SearchType : text
                }
            })
                .then(res => {
                    setBookList(res.data);
                    console.log(bookList)
                    setbookTitle(res.data[0].title)
                    setbookISBN(res.data[0].isbn13)
                    setbookCover(res.data[0].cover)
                })
        };
    const save = () =>{
        const requestData ={
            saleBookId: bookISBN,
            saleImgSrc: bookCover,
            saleSellerId: sellerId,
            saleSellerName: sellerName,
            saleBookPrice: bookPrice,
            salePostPrice: postPrice,
            saleBookPieces: bookPieces,
            bookGrade: bookGrade,
            saleDiscription: discription,
            saleBookTitle: bookTitle,
        }

        axios.post("http://localhost:8080/sellBookInfo", requestData, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // 성공적으로 등록되었을 때의 처리
                console.log("등록이 완료되었습니다.", response);
            })
            .catch(error => {
                // 등록 중에 오류가 발생했을 때의 처리
                console.error("등록 중 오류 발생:", error);
            });
    }


    return (

        <main className={"container"}>
            <Header/>
            <div className={"mt-5"}>
                <form>
                    <label className={"form-label"}>
                        <h4>도서 검색</h4>
                        <input type="text" className={"form-control"} value={text} onChange={onChangetext}/>
                    </label>
                    <button type={"button"} className={"ms-3 btn btn-primary"} onClick={search}>검색</button>
                </form>
            </div>

                {bookList.map(item => {
                    return(
                        <div className={"mt-4"}>
                        <div className={"card mb-3 mt-3"}>
                            <div className={"row g-0"}>
                                <div className={"col-md-8"}>
                                    <h5 className={"card-title"}>도서상품 기본정보</h5>
                                    <p className={"card-text"}>제목: {item.title}</p>
                                    <p className={"card-text"}>저자: {item.author}</p>
                                    <p className={"card-text"}>ISBN: {item.isbn13}</p>
                                    <p className={"card-text"}>출판사:{item.publisher} </p>
                                    <p className={"card-text"}>출간일:{item.pubdate}</p>
                                    <p className={"card-text"}>페이지 수:{item.itempage}</p>
                                    <p className={"card-text"}>정가 :{item.priceStandard} </p>
                                </div>
                                <div className={"col-md-4"}>
                                    <img src={item.cover} alt="사진 출력될 자리" className={"img-fluid rounded-start"}/>
                                </div>
                            </div>
                        </div>
                        </div>
                    )
                })}
                <h4>상품 기본 정보</h4>


            <div className={"mt-3 p-2"}>
                <h4>가격 정보</h4>

                <form>
                    <div className={"row"}>
                        <div className={"col-sm-2"}>
                            <label>중고판매가 :</label>
                        </div>
                        <div className={"col-sm-3"}>
                            <input type="text" className={"form-control"} value={bookPrice} onChange={onChangePrice}/>
                        </div>
                    </div>
                </form>
            </div>

            <div className={"mt-3 p-2"}>
                <h4>공급 정보</h4>
                <form>
                    <label className={"form-label"}>출고지</label>
                    <input type="text" className={"form-control"}/>
                </form>
            </div>

            <div className={"mt-3 p-2"}>
                <h4>상품 설명/유의사항</h4>
                <form>
                    <textarea name="explain" id="explain" cols="30" rows="5" value={discription} onChange={onChangediscription}></textarea>
                    <label className={"form-label"}>도서 상태</label>
                    <input type="text" className={"form-control"} onChange={onChangeGrade} value={bookGrade}/>
                </form>
            </div>
            <div className={"mt-3 p-2 "}>
                <form>

                </form>
            </div>
            <div className={"text-center"}>
                <button type={"submit"} className={"btn btn-dark"}><p className={"text-white mt-2"} onClick={save}>등록하기</p></button>
            </div>
            <Footer/>
        </main>

    );
}

export default SellerPage;