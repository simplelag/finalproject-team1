import React, {useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";

function BoardDetail(props) {



    return (
        <div>
            <Header />
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-sm-10 mx-auto'}>
                            <table className={'table'}>
                                <tr>
                                    <td>말머리</td>
                                    <td>제목</td>
                                </tr>
                                <tr>
                                    <td>글쓴이</td>
                                    <td>댓글수</td>
                                    <td>조회수</td>
                                    <td>조회수</td>
                                </tr>
                                <tr className={''}>
                                    <textarea rows={10} className={'form-control'}></textarea>
                                </tr>
                                <div className={'d-flex justify-content-center'}>
                                    <button type={'button'} className={'btn'} onClick={''}>추천</button>
                                </div>
                            </table>
                            <button type={'button'} className={'btn'}>목록</button>
                            <a href={'#'} className={'btn'}>글작성</a>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default BoardDetail;