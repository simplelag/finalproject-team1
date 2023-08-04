import React, {useState} from 'react' ;


function SellerPage() {
    const [inputValue, setInputValue] = useState('');

    const handleinputChange = (event) => {
        setInputValue(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <main className={"container"}>
            <div>
                <form onSubmit={handleSubmit}>
                    <label className={"form-label"}>
                        <h4>도서 검색</h4>
                        <input type="text" className={"form-control"} value={inputValue} onChange={handleinputChange}/>
                    </label>
                    <button type={"submit"} className={"ms-3 btn btn-primary"}>검색</button>
                </form>
            </div>
            <div className={"mt-4"}>
                <h4>상품 기본 정보</h4>
                <div className={"card mb-3 mt-3"}>
                    <div className={"row g-0"}>
                        <div className={"col-md-8"}>
                            <h5 className={"card-title"}>도서상품 기본정보</h5>
                            <p className={"card-text"}>제목</p>
                            <p className={"card-text"}>저자</p>
                            <p className={"card-text"}>ISBN</p>
                            <p className={"card-text"}>출판사</p>
                            <p className={"card-text"}>출간일</p>
                            <p className={"card-text"}>페이지 수</p>
                        </div>
                        <div className={"col-md-4"}>
                            <img src="..." alt="사진 출력될 자리" className={"img-fluid rounded-start"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"mt-3 p-2 bg-success"}>
                <h4>가격 정보</h4>
                <p>정가 : </p>

                <form>
                    <div className={"row"}>
                        <div className={"col-sm-2"}>
                            <label>중고판매가 :</label>
                        </div>
                        <div className={"col-sm-3"}>
                            <input type="text" className={"form-control"}/>
                        </div>
                    </div>
                </form>
            </div>

            <div className={"mt-3 p-2 bg-success"}>
                <h4>공급 정보</h4>
                <form>
                    <label className={"form-label"}>출고지</label>
                    <input type="text" className={"form-control"}/>
                </form>
            </div>

            <div className={"mt-3 p-2 bg-success"}>
                <h4>상품 설명/유의사항</h4>
                <form>
                    <textarea name="explain" id="explain" cols="30" rows="5"></textarea>
                    <label className={"form-label"}>도서 상태</label>
                    <input type="text" className={"form-control"}/>
                </form>
            </div>
            <div className={"mt-3 p-2 bg-success"}>
                <form>

                </form>
            </div>
            <div className={"text-center"}>
                <button type={"submit"} className={"btn btn-dark"}><p className={"text-white mt-2"}>등록하기</p></button>
            </div>
        </main>

    );
}

export default SellerPage;