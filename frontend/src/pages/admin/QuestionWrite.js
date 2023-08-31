import React, {useState, useEffect, useRef} from 'react';
import BoardComment from "../board/BoardComment";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Header from "../mainPages/Header";
import Footer from "../mainPages/Footer";

function QuestionWrite(props) {

    const [title, setTitle] = useState('');
    const [name, setName] = useState(sessionStorage.getItem("name"));
    const [id, setId] = useState(sessionStorage.getItem("id") || "");
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('관리자문의');
    const [isAble, setIsAble] = useState(false);
    const [file, setFile] = useState(null);

    // 파일을 state에 담는법( e.target.files[0] )
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    useEffect(() => {
        if (title != "" && content != "") {
            setIsAble(true)
        }
    }, [title, content]);


    const save = (e) => {

        if (isAble && id != "") {
            axios.post('http://localhost:8080/question/write', null, {
                params: {
                    boardCategory: category,
                    boardTitle: title,
                    boardWriterId: id,
                    boardWriterName: name,
                    boardContent: content,
                }
            })
                .then((res) => {
                    alert("문의가 등록되었습니다")
                    // 문의글 등록에 성공하면 그다음에 파일을 등록하는 순서임(파일이랑 문의글을 동시에 보내는게 아님)
                    // 문의글등록 성공시 서버에서 boardPk가 리턴되게 만들었음

                    // FormData 객체를 생성
                    const formData = new FormData();
                    // FormData 객체에 file state를 추가한다
                    formData.append('file', file);

                    // Axios를 사용하여 서버로 POST 요청을 보낸다
                    axios.post(`/uploadImg/${res.data}`, formData, {
                        // multipart/form-data이기때문에 헤더를 추가한다
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                        .then((response) => {
                            // 서버 응답을 처리한다
                            // 성공시 창이 닫히게 설정함
                            console.log('파일 업로드 성공', response.data);
                            window.close();
                        })
                        .catch((error) => {
                            // 오류 처리
                            console.error('파일 업로드 실패', error);
                        });
                })
                .catch(() => {
                    alert("문의등록 오류")
                })
        }
        else{
            alert("로그인해주세요");
        }
    }

    const fileInputRef = useRef(null); // 파일 입력(input) 요소에 대한 참조

    return (
        <div>
            <div className={'container my-5'}>
                <div className={'row'}>
                    <h3>관리자 문의</h3>
                    <div className={'my-3'}>
                        <input type={'text'} className={'form-control'} value={title} onChange={onChangeTitle}
                               placeholder={'문의 제목을 입력하세요'}/>
                        <input type={'hidden'} className={'form-control'} value={name}/>
                        <input type={'hidden'} className={'form-control'} value={id}/>
                    </div>
                    <div className={'my-3'}>
                        <textarea className={'form-control'} rows={10} value={content} onChange={onChangeContent}
                                  placeholder={'문의 내용을 입력하세요'}></textarea>
                    </div>
                    <input type="file" name="file" id="file" onChange={handleFileChange} />
                    <div className={'d-flex justify-content-end'}>
                        <button disabled={!isAble} type={'button'} className={'btn'} onClick={save}>등록</button>
                    </div>
                </div>
            </div>
        </div>
)

}

export default QuestionWrite;