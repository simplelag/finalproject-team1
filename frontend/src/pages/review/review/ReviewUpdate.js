import React,{useEffect, useState} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import StarIcon from "./StarIcon";

function ReviewUpdate(props){
    const {
    isOpen,toggle,selectedReviewData,onChangeTitle,onChangeContent,onSaveEdit,starValue,onStarClick,bookReviewPk
} = props;


    return(
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>리뷰 수정</ModalHeader>
            <ModalBody>
                <form id="editReview">
                    <p>별점</p>
                    <div id="stars" className="d-flex align-items-center justify-content-center  mt-3">
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
                                        onClick={() => onStarClick(index + 1)} // 별점 변경 이벤트 호출
                                        onMouseEnter={() => onStarClick(index +1)}
                                        onMouseLeave={() => onStarClick(starValue)}
                                    >
                                    </button>
                                ))}
                            </div>
                        </div>
                        <br/>
                    </div>
                    <label htmlFor="editTitle" className="form-label">새 제목</label>
                    <input
                        className="form-control"
                        id="editTitle"
                        type="text"
                        name="editReviewTitle"
                        placeholder={selectedReviewData.reviewTitle}
                        onChange={onChangeTitle}
                    ></input>

                    <label htmlFor="editContent" className="form-label">새 내용</label>
                    <textarea
                        name="editReviewContent"
                        id="editContent"
                        rows="5"
                        className="form-control w-100"
                        onChange={onChangeContent}
                        required
                    >{selectedReviewData.reviewContent}</textarea>
                </form>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-dark" onClick={onSaveEdit}>수정 완료</button>
                <button type="button" className="btn btn-secondary" onClick={toggle}>취소</button>
            </ModalFooter>
        </Modal>
    );
}
export default  ReviewUpdate
