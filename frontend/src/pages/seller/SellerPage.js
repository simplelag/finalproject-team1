import React, {useEffect, useState} from 'react' ;
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";
import {useLocation, useNavigate} from "react-router-dom";


function SellerPage() {

    const location = useLocation();
    const navi = useNavigate();

    const [text, setText] = useState('');
    const [bookList, setBookList] = useState([]);
    const [salePrice, setsalePrice] = useState('');
    const [discription, setdiscription] = useState('');
    const [postPrice, setpostPrice] = useState(0);
    const [bookTitle, setbookTitle] = useState('');
    const [bookISBN, setbookISBN] = useState(0);
    const [bookCover, setbookCover] = useState('');
    const [sellerId, setsellerId] = useState(sessionStorage.getItem("id"));
    const [sellerName, setSellerName] = useState(sessionStorage.getItem("name"));
    const [bookPrice, setbookPrice] = useState(0);
    const [bookPieces, setbookPieces] = useState(1);
    const [bookGrade, setbookGrade] = useState(3);

    const onChangetext = (e) => {
        setText(e.target.value);
    }
    const onChangePrice = (e) => {
        setbookPrice(e.target.value);
    }
    const onChangediscription = (e) => {
        setdiscription(e.target.value);
    }
    const onChangeGrade = (e) => {
        setbookGrade(e.target.value);
    }
    const onChangePieces = (e) => {
        setbookPieces(e.target.value);
    }

<<<<<<< HEAD
    useEffect(() => {
        axios.get('http://localhost:8080/searchIsbn', {
            params: {
                ISBN13: location.state.ISBN13
            }
        })
            .then(res => {
                setBookList(res.data.item);
                console.log(res.data.item)
                setbookISBN(res.data.item[0].isbn13)
                setbookCover(res.data.item[0].cover)
                setbookTitle(res.data.item[0].title)
            })
    }, []);
=======
   useEffect(() => {
       axios.get('http://localhost:8080/searchIsbn', {
           params: {
               ISBN13: location.state.ISBN13
           }
       })
           .then(res => {
               setBookList(res.data.item);
               setbookISBN(res.data.item[0].isbn13)
               setbookCover(res.data.item[0].cover)
               setbookTitle(res.data.item[0].title)
           })
       },[]);
>>>>>>> origin/main

    const save = () => {
        const requestData = {
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
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // 성공적으로 등록되었을 때의 처리
                alert("판매등록 완료!")
                navi("/");
            })
            .catch(error => {
                // 등록 중에 오류가 발생했을 때의 처리
            });
    }


    return (
        <main className={"container"}>
            <Header/>
                <div className="mt-4">
                    {bookList.map((item) => (
                        <div className="card mb-3" key={item.isbn13}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src={item.cover}
                                        alt="사진 출력될 자리"
                                        className="img-fluid rounded-start"
                                        style={{height:"400px"}}
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">도서상품 기본정보</h5>
                                        <p className="card-text">제목: {item.title}</p>
                                        <p className="card-text">저자: {item.author}</p>
                                        <p className="card-text">ISBN: {item.isbn13}</p>
                                        <p className="card-text">출판사: {item.publisher}</p>
                                        <p className="card-text">출간일: {item.pubDate}</p>
                                        <p className="card-text">페이지 수: {item.itempage}</p>
                                        <p className="card-text">정가: {item.priceStandard}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            <h4>상품 기본 정보</h4>
            <div className={"mt-3"}>
                <form>
                    <div className={"row mt-3"}>
                        <div className={"col-sm-auto"}>
                            <label>중고판매가 :</label>
                        </div>
                        <div className={"col-sm-auto"}>
                            <input type="text" className={"form-control"} value={bookPrice} onChange={onChangePrice}/>
                        </div>
                        <div className={"col-sm-auto"}>
                            <label>판매 권수 :</label>
                        </div>
                        <div className={"col-sm-auto"}>
                            <input type="text" className={"form-control"} value={bookPieces} onChange={onChangePieces}/>
                        </div>
                    </div>
                </form>
            </div>

            <div className={"mt-3 p-2"}>
                <h4>상품 설명/유의사항</h4>
                <form>
                    <textarea name="explain" id="explain" cols="30" rows="5" value={discription}
                              onChange={onChangediscription}></textarea>
                    <br/>
                    <label className={"form-label"}>도서 상태</label>
                    <input type="text" className={"form-control"} onChange={onChangeGrade} value={bookGrade}
                           placeholder={"미입력시 가장낮은 등급인 3등급으로 입력됩니다."}/>
                </form>
            </div>
            <div className={"mt-3 p-2 "}>
                <form>

                </form>
            </div>
            <div className={"text-center"}>
                <button type={"submit"} className={"btn btn-dark"}><p className={"text-white mt-2"}onClick={save}>등록하기</p></button>
            </div>
            <Footer/>
        </main>

    );
}

export default SellerPage;