import React, {useEffect, useState} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardText} from "reactstrap"
import StarIcon from "./StarIcon";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import ReviewUpdate from "./ReviewUpdate";




function ReviewMain(props) {
    const location = useLocation();
    const navi = useNavigate();
    const [reviewPk, setReviewPk] = useState(0);
    const [reviewBookIsbn,setReviewBookIsbn] = useState(location.state.ISBN13);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starValue, setStarValue] = useState(1); // 초기값 1로 설정
    const [reviewTitle,setreviewTitle] = useState("");
    const [reviewContent,setreviewContent] =useState("");
    const[buyerId,setBuyerId]  = useState(sessionStorage.getItem("id"));
    const[buyerName,setBuyerName] = useState(sessionStorage.getItem("name"));
    const[updateReviews,setupdateReviews] = useState([]);
    const[allReviews,setAllReviews] = useState([]);
    const[reViewrId,setReviewrId]= useState("");
    const[reViewrName,setReviewrName] = useState("");
    const[isEditMode, setIsEditMode] = useState(false);
    const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
    const [selectReviewData, setSelectedReviewData] =useState({
        reviewTitle: " ",
        reviewContent: "",
    });

    useEffect( () => {
        console.log(reviewBookIsbn);
            axios.get("http://localhost:8080/responseReview", {
                params: {
                        ISBN13 : reviewBookIsbn
                }
            })
                .then(res => {
                    console.log(res.data)
                    setAllReviews(res.data)
                    setreviewTitle(res.data.bookReviewTitle);
                    setreviewContent(res.data.bookReviewContent);
                    setReviewrName(res.data.bookReviewBuyerId);
                    setReviewrId(res.data.bookReviewBuyerName);
                })
                .catch(err => {
                    console.error(err);
                });
        },[reviewBookIsbn]);

    const toggleModal = () => {
        if(sessionStorage.getItem("id") === null){
            alert("로그인 해주세요!")
            navi("/login")
        }
        else {
            setIsEditMode(false); // 수정 모드 상태 재설정
            setSelectedReviewIndex(null); // 선택한 인덱스 초기화
            setSelectedReviewData({
                reviewTitle: "",
                reviewContent: ""
            });
            setIsModalOpen(!isModalOpen);
        }
    }

    const handleEditReview = (index) =>{
        const reviewToedit = allReviews[index];
        setSelectedReviewIndex(index);
        setSelectedReviewData({
            reviewTitle: reviewToedit.bookReviewTitle,
            reviewContent: reviewToedit.bookReviewContent,
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };
    const handleStarClick = (value) => {
        setStarValue(value);
    };
    const handleStartHover = (value) =>{
        setStarValue(value);
    }
    const onChangeContent = (e) =>{
        setreviewContent(e.target.value);
    };
    const reset = () => {
        setreviewTitle("");
        setreviewContent("");
        setStarValue(1);
    }
    const onChangeTitle = (e) =>{
        setreviewTitle(e.target.value)
    }
    const deleteReview = (index) =>{
        axios.delete("http://localhost:8080/deleteReview",{
            params: {
                bookReviewPk: allReviews[index].bookReviewPk
            }
            })
            .then(res => {
                alert("삭제를 완료하였습니다.")
                const updateallReview = allReviews.filter(Review => Review.bookReviewPk !== allReviews[index].bookReviewPk);
                setAllReviews(updateallReview);
            })
    }
    const updateReview = (index) =>{
            axios.get("http://localhost:8080",{
                params:{
                    bookReviewPk: allReviews[index].bookReviewPk
                }
            })
                .then(res =>{

                })
    }


    const save= () =>{
        const requestData ={
            bookReviewBuyerId: buyerId,
            bookReviewBuyerName: buyerName,
            bookReviewGrade: starValue,
            bookReviewTitle: reviewTitle,
            bookReviewContent: reviewContent,
            bookReviewIsbn13: reviewBookIsbn,
        }
        if (isEditMode) {
            // 수정 모드일 경우 기존 리뷰 업데이트
            axios.put(`http://localhost:8080/updateReview/${allReviews[selectedReviewIndex].bookReviewPk}`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // 성공 처리
                    alert("리뷰 수정 성공!");
                    // 수정한 데이터로 allReviews 배열 업데이트
                    const updatedReviews = [...allReviews];
                    updatedReviews[selectedReviewIndex] = {
                        ...updatedReviews[selectedReviewIndex],
                        ...requestData
                    };
                    setAllReviews(updatedReviews);
                    setIsEditMode(false);
                    setSelectedReviewIndex(null);
                    setSelectedReviewData({
                        reviewTitle: "",
                        reviewContent: ""
                    });
                    toggleModal(); // 모달 닫기
                })
                .catch(error => {
                    // 에러 처리
                    console.log(error);
                });
        } else {
            // 수정 모드가 아닐 경우 새 리뷰 작성
            axios.post("http://localhost:8080/saveReview", requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    // 성공 처리
                    alert("리뷰 작성 성공!");
                    // 새 데이터로 allReviews 배열 업데이트
                    setAllReviews([...allReviews, requestData]);
                    toggleModal(); // 모달 닫기
                })
                .catch(error => {
                    // 에러 처리
                    console.log(error);
                });
        }


        // axios.post("http://localhost:8080/saveReview",requestData,{
        //     headers:{
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(response => {
        //         alert("리뷰 작성 성공!")
        // })
        //     .catch(error =>{
        //         console.log(error);
        //     })
    }

    return (
        <div className="row justify-content-md-center" id="reviewDiv">
            <div className="d-flex justify-content-end" style={{ marginBottom: "-2rem", zIndex: 1000 }}>
                <button id="writeReviewBtn" className="btn btn-dark" type="button" onClick={toggleModal}>
                    리뷰작성
                </button>
            </div>
            <p className="h5 my-4 mt-0 w-100 sub-title">리뷰</p>
            <div id="reviewSpace" className="col-11 d-flex flex-wrap justify-content-start align-items-center mb-5">
                {allReviews.length === 0? (
                    <p >리뷰가 없네요! 첫번쨰 리뷰어가 되어보는건 어떨까요?</p>
                ): (
                    allReviews.map((Review,index) => {

                        return(
                                <Card key={Review.id} className="mt-3 my-2 ms-3" style={{ width: "300px" }}>
                                    <CardBody>
                                        <div className="d-flex justify-content-between align-items-center">
                                        <CardTitle tag="h5" className="mb-2">
                                            {Review.bookReviewTitle}
                                        </CardTitle>
                                            <div>
                                                <span>{Review.bookReviewBuyerName}</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <CardText>{Review.bookReviewContent}</CardText>
                                        <div className="d-flex justify-content-left align-items-center">
                                            <div className="ms-2">
                                                <StarIcon starNum={Review.bookReviewGrade} size={14} />
                                            </div>
                                        </div>
                                        {Review.bookReviewBuyerId === sessionStorage.getItem("id")? (
                                            <div className="d-flex justify-content-end">
                                                <button className="btn btn-dark" onClick={() => handleEditReview(index)}>수정</button>
                                                <button className="btn btn-danger ms-2" onClick={() => deleteReview(index)}>삭제</button>
                                            </div>
                                        ): (
                                            <div>
                                            </div>
                                        )}
                                    </CardBody>
                                </Card>
                            )
                        })
                )}
            </div>
            {isEditMode ? (
                <ReviewUpdate
                    isOpen={isModalOpen}
                    toggle={toggleModal}
                    selectedReviewData={selectReviewData}
                    onChangeTitle={onChangeTitle}
                    onChangeContent={onChangeContent}
                    onSaveEdit={save}
                />
                ):(
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>리뷰 작성</ModalHeader>
                    <ModalBody>
                                <form id="review">
                                    <p>별점</p>
                                    <div id="stars" className="d-flex align-items-center justify-content-center ">
                                        <div id="starShow" className="d-flex align-items-center" style={{ position: "relative" }}>
                                            <div style={{position:"absolute",zIndex: 1}}>
                                                <StarIcon starNum={starValue} size={48}/>
                                        </div>
                                            <div id="starBtn" className="btn-group d-flex align-items-center" style={{ position: "absolute", zIndex: 2 }}>
                                                {Array.from({ length: 10 }, (_, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        style={{width:"24px",height:"48px",border:"none", opacity:"0%",zIndex:"2000",top:"20px"}}
                                                        className={`${index + 1 <= starValue ? "active" : ""}`}
                                                        value={index + 1}
                                                        onClick={() => handleStarClick(index + 1)}
                                                        onMouseEnter={() => handleStartHover(index +1)}
                                                        onMouseLeave={() => handleStartHover(starValue)}
                                                    >
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <br/>
                                    </div>
                                    <label htmlFor="title" className="form-label">제목</label>
                                    <input className="form-control" id="title" type="text" name="reviewTitle" onChange={onChangeTitle} required />
                                    <label htmlFor="content" className="form-label">내용</label>
                                    <textarea name="reviewContent" id="content" rows="5" className="form-control w-100" onChange={onChangeContent} required></textarea>
                                </form>
                    </ModalBody>
                    <ModalFooter>
                                <button type="button" className="btn btn-dark" id="submitBtn" data-bs-dismiss="modal" onClick={save}>확인</button>
                                <button type="reset" className="btn btn-dark" id="erase" onClick={reset}>지우기</button>
                            </ModalFooter>
                </Modal>
            )}
        </div>
    );
}

export default ReviewMain;