import React, {useState, useEffect} from 'react';
import button from "bootstrap/js/src/button";
import axios from "axios";

// <Pagenation
//     setList={setBoardList} // 보여줄 게시글 리스트를 설정하는 setList에 원하는 useState를 넘겨줌
//     url={"/api/admin/getQuestions"} // 보여줄 게시글 리스트를 반환해주는 컨트롤러 주소(한번에 한페이지만 불러옴)
//     numberUrl={"/api/admin/getQuestionNumber"} // 보여줄 게시글 리스트의 총 개수를 반환해주는 컨트롤러 주소
//     howManyContentsInAPage={qNum} // 한 페이지당 보여줄 게시글 갯수
//     howManyPagesInABlock={size} // 한 번에 표시할 페이지 버튼 개수
// />

function Pagenation(props) {


    const url = props.url;
    const numberUrl = props.numberUrl;
    const howManyContentsInAPage = props.howManyContentsInAPage;
    const howManyPagesInABlock = props.howManyPagesInABlock;
    const [pageNow, setPageNow] = useState(1);
    const [howManyTotalContents, setHowManyTotalContents] = useState(0);
    let lastPage = Math.ceil(howManyTotalContents / howManyContentsInAPage)

    const setBoardList = props.setList;

    let firstPageAtThisBlock = Math.floor((pageNow - 1) / (howManyPagesInABlock)) * howManyPagesInABlock + 1;

    const [btns, setBtns] = useState([]);

    const howMany = () => {
        let result = 1;
        axios.get(numberUrl)
            .then(res => {
                result = res.data;
                setHowManyTotalContents(result);
                lastPage = Math.ceil(howManyTotalContents / howManyContentsInAPage);
            })
            .catch()
    }
    const getQuestions = () => {

        let page = pageNow;

        axios.get(url,
            {params: {page: page - 1, size: howManyContentsInAPage, sort: "boardPk,DESC"}})
            .then(res => {
                setBoardList(res.data);
            })
            .catch()
    }

    const pageBtnArrSet = () => {
        let pageBtnArray = [];
        if (firstPageAtThisBlock != 1) {
            pageBtnArray.push("<");
        }
        for (let i = firstPageAtThisBlock;
             i < firstPageAtThisBlock + howManyPagesInABlock;
             i++) {
            pageBtnArray.push(i);
            if (i >= lastPage) {
                break;
            }
            if (i == firstPageAtThisBlock + howManyPagesInABlock - 1) {
                pageBtnArray.push(">");
            }
        }
        setBtns(pageBtnArray);
    }

    useEffect(() => {
        howMany();
        firstPageAtThisBlock = Math.floor((pageNow - 1) / (howManyPagesInABlock)) * howManyPagesInABlock + 1;
        getQuestions();
        pageBtnArrSet();

    }, [pageNow, howManyTotalContents]);

    const setPageNowState = (item) => {
        if (item === "<") {
            setPageNow(firstPageAtThisBlock - howManyPagesInABlock)
        } else if (item === ">") {
            setPageNow(firstPageAtThisBlock + howManyPagesInABlock)
        } else {
            setPageNow(item)
        }
    }

    return (
        btns.map(item => {
            return (
                <button
                    key={item}
                    onClick={() => {
                        setPageNowState(item)
                    }}
                    className={"btn" + (item == pageNow ? " active" : "")}
                >{item}</button>
            )
        })
    )
}

export default Pagenation;