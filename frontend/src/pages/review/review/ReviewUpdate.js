import React,{useEffect, useState} from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

function ReviewUpdate({
    isOpen,toggle,selectedReviewData,onChangeTitle,onChangeContent,onSaveEdit
}
)

{

    return(
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>리뷰 수정</ModalHeader>
            <ModalBody>
                <form id="editReview">
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
    )
}
export default  ReviewUpdate
