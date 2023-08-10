import React, {useState, useEffect} from 'react';
import button from "bootstrap/js/src/button";
import axios from "axios";

// <Pagenation
//     setList={setBoardList} // 보여줄 게시글 리스트를 설정하는 setList에 원하는 useState를 넘겨줌
//     url={"/api/admin/getQuestions"} // 보여줄 게시글 리스트를 반환해주는 컨트롤러 주소(한번에 한페이지만 불러옴)
//     numberUrl={"/api/admin/getQuestionNumber"} // 보여줄 게시글 리스트의 총 개수를 반환해주는 컨트롤러 주소
//     howManyContentsInAPage={qNum} // 한 페이지당 보여줄 게시글 갯수
//     howManyPagesInABlock={size} // 한 번에 표시할 페이지 버튼 개수
//     searchType={["제목","내용","제목+내용","작성자"]} // 검색종류, 빈 배열이면 select 태그를 표시하지 않으며 검색내용은 content 라는 파라미터에 저장되어 서버 전달됨
// />

function Pagenation(props) {

    const url = props.url;
    const numberUrl = props.numberUrl;
    const howManyContentsInAPage = props.howManyContentsInAPage;
    const howManyPagesInABlock = props.howManyPagesInABlock;
    const searchType = props.searchType;
    let searchSelect = false;
    if(searchType.length != 0){searchSelect = true;}

    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [text, setText] = useState("");
    const [searchTypeNow, setSearchTypeNow] = useState(searchSelect? searchType[0] : "내용");
    // let searchTypeNow = searchSelect? searchType[0] : "내용";


    const [pageNow, setPageNow] = useState(1);
    const [howManyTotalContents, setHowManyTotalContents] = useState(0);
    let lastPage = Math.ceil(howManyTotalContents / howManyContentsInAPage)

    const setBoardList = props.setList;

    let firstPageAtThisBlock = Math.floor((pageNow - 1) / (howManyPagesInABlock)) * howManyPagesInABlock + 1;

    const [btns, setBtns] = useState([]);

    const howMany = () => {
        let result = 1;
        axios.get(numberUrl,{
            params:{
                title: title,
                name: name,
                content: content
            }
        })
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
            {
                params: {
                    page: page - 1,
                    size: howManyContentsInAPage,
                    sort: "boardPk,DESC",
                    title: title,
                    name: name,
                    content: content
                }
            })
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
        console.log("============== search ===============");
        console.log(`searchTypeNow : ${searchTypeNow}`);
        console.log(`title : ${title}`);
        console.log(`content : ${content}`);
        console.log(`name : ${name}`);
    }, [pageNow, howManyTotalContents, title, name, content]);

    const setPageNowState = (item) => {
        if (item === "<") {
            setPageNow(firstPageAtThisBlock - howManyPagesInABlock)
        } else if (item === ">") {
            setPageNow(firstPageAtThisBlock + howManyPagesInABlock)
        } else {
            setPageNow(item)
        }
    }

    const handleTextChange = e => {
        setText(e.target.value);
    }

    const handleSearchTypeChange = e => {
        // searchTypeNow = e.target.value;
        setSearchTypeNow(e.target.value);

    }

    const doSearch = () => {

        switch (searchTypeNow) {
            case "제목": setTitle(text);setName("");setContent("");break;
            case "내용": setTitle("");setName("");setContent(text);break;
            case "제목+내용": setTitle(text);setName("");setContent(text);break;
            case "작성자": setTitle("");setName(text);setContent("");break;
        }
    }


    return (
        <div className={"d-flex justify-content-between"}>
            <div></div>
            <div>{
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
            }</div>
            <div>
                {searchSelect && <SearchSelect handleSearchTypeChange={handleSearchTypeChange} searchType={searchType}/>}
                <input type="text" value={text} onChange={handleTextChange}/>
                <button type={"button"} onClick={doSearch}>검색</button>
            </div>
        </div>
    )
}

function SearchSelect(props) {
    const handleSearchTypeChange = props.handleSearchTypeChange;
    const searchType = props.searchType;
    return (
        <select name="searchTypeSelect" id="searchTypeSelect" onChange={handleSearchTypeChange}>
            {
                searchType.map(item => {
                    return <option key={item} value={item}>{item}</option>
                })
            }
        </select>
    )
}

export default Pagenation;