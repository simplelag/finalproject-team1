import React, {useState, useEffect, useRef} from 'react';
import button from "bootstrap/js/src/button";
import axios from "axios";

// <Pagenation
//     setList={setBoardList} // 보여줄 게시글 리스트를 설정하는 setList에 원하는 useState를 넘겨줌
//     url={"/api/admin/getQuestions"} // 보여줄 게시글 리스트를 반환해주는 컨트롤러 주소(한번에 한페이지만 불러옴)
//     numberUrl={"/api/admin/getQuestionNumber"} // 보여줄 게시글 리스트의 총 개수를 반환해주는 컨트롤러 주소
//     howManyContentsInAPage={qNum} // 한 페이지당 보여줄 게시글 갯수
//     howManyPagesInABlock={size} // 한 번에 표시할 페이지 버튼 개수
//     searchType={["제목","내용","제목+내용","작성자"]} // 검색종류, 빈 배열이면 select 태그를 표시하지 않으며 검색내용은 content 라는 파라미터에 저장되어 서버 전달됨
//     order={"boardPk,DESC"} // 정렬방법
// />

function Pagenation(props) {
    // props로 넘어온 데이터들
    const url = props.url;
    const numberUrl = props.numberUrl;
    const howManyContentsInAPage = props.howManyContentsInAPage;
    const howManyPagesInABlock = props.howManyPagesInABlock;
    const searchType = props.searchType;
    const order = props.order;
    // 페이지네이션 컴포넌트 외부에 게시글 같은리스트가 표시될 것인데,
    // 그 리스트를 서버에서 불러와서 배열 state에 저장해야할거 아님?
    // 그때 사용되는 set 함수, props로 넘어와야함
    const setBoardList = props.setList;

    // 검색칸 왼쪽에 제목,내용 등 검색옵션 select를 넣을것인지, 처음에는 false
    let searchSelect = false;
    // props.searchType 의 길이가 0이 아니면 검색옵션이 있는 것이므로 true
    if(searchType.length != 0){searchSelect = true;}

    // title, name, content : 검색 기능을 위해 만든 state
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    // 검색창에 써넣은 텍스트가 우선은 text 라는 state에 저장됨
    const [text, setText] = useState("");

    // 현재 설정된 검색 타입, 검색옵션 배열이 넘어왔으면 맨처음 옵션으로 설정하고, 옵션 배열이 안넘어왔으면 "내용"으로 설정함
    const [searchTypeNow, setSearchTypeNow] = useState(searchSelect? searchType[0] : "내용");

    // pageNow : 현재페이지, 기본값 1
    const [pageNow, setPageNow] = useState(1);

    // 불러올 게시글 등의 개수가 총 몇개인지, 총 페이지수를 계산하기위해 사용, 페이지를 옮길 때마다 새로 로드됨
    const [howManyTotalContents, setHowManyTotalContents] = useState(0);

    // 마지막 페이지 계산 : 총 게시글 수 / 한 페이지당 게시글 수 를 올림한 정수
    let lastPage = Math.ceil(howManyTotalContents / howManyContentsInAPage);

    // 한번에 표시되는 페이지가 [ 1 2 3 4 5 > ] 이런식이라면 firstPageAtThisBlock은 1임
    // [ < 6 7 8 9 10 > ] 이면 firstPageAtThisBlock은 6임
    let firstPageAtThisBlock = Math.floor((pageNow - 1) / (howManyPagesInABlock)) * howManyPagesInABlock + 1;

    // [ 1 2 3 4 5 > ] 이런식의 페이지네이션 버튼들을 저장하는 배열,
    // 위 경우 배열에 1, 2, 3, 4, 5, > 이렇게 문자 6개가 저장됨
    const [btns, setBtns] = useState([]);

    // 총 게시글 등의 개수를 서버에서 불러오는 함수,
    // 개수를 불러오면 howManyTotalContents에 저장하고
    // lastPage를 새로 계산함
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

    // 리스트를 불러오는 함수,
    // page, size, sort를 넘겨주고 서버에서 Pageable 객체를 매개변수라고 받는다고만 설정하면
    // 자동으로 페이지대로 리스트를 불러와줌
    // title, name, content는 검색을 위해서 보내주는 값임
    // 검색옵션이 없는 경우 검색을하면 기본적으로 content라는 파라미터에 담겨져 보내짐
    const getList = () => {

        let page = pageNow;

        axios.get(url,
            {
                params: {
                    page: page - 1,
                    size: howManyContentsInAPage,
                    sort: order,
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

    // 페이지버튼배열 ( [1,2,3,4,5,>] ) 을 설정하는 함수
    // 이전페이지(<), 다음페이지(>) 버튼을 넣을것인지 마지막페이지이후로는 버튼을 안만들것인지 등을 계산해서
    // btns state에다 저장함
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

    // 페이지가 바뀌거나, 총 게시글 개수가 불러와지거나, 검색버튼을 눌러서 title, name, content 등에 text가 설정될 때
    // 실행되는 useEffect
    useEffect(() => {
        howMany();
        firstPageAtThisBlock = Math.floor((pageNow - 1) / (howManyPagesInABlock)) * howManyPagesInABlock + 1;
        getList();
        pageBtnArrSet();

    }, [pageNow, howManyTotalContents, title, name, content]);

    // 현재 페이지를 설정하는 함수,
    // 예를들어서 2 버튼을 누르면 pageNow state가 2로 설정되고
    // > 버튼을 누르면 pageNow state가 1 + 5 인 6이됨(다음 페이지블락의 첫번째 페이지)
    const setPageNowState = (item) => {
        if (item === "<") {
            setPageNow(firstPageAtThisBlock - howManyPagesInABlock)
        } else if (item === ">") {
            setPageNow(firstPageAtThisBlock + howManyPagesInABlock)
        } else {
            setPageNow(item)
        }
    }

    // 검색입력칸에 텍스트를 쓰면 그대로 text state에 저장해주는 함수
    const handleTextChange = e => {
        setText(e.target.value);
    }

    // 검색옵션 select를 선택하면 searchTypeNow state를 그걸로 설정해주는 함수
    const handleSearchTypeChange = e => {
        setSearchTypeNow(e.target.value);

    }

    // 검색버튼을 누르면 실행되는 함수
    // 예를들어 "내용"을 선택하고 검색입력칸에 "문의"를 입력한 다음에 검색 버튼을 누르면
    // switch case문에 의해 case "내용" : 코드가 실행되고
    // content state를 "문의"로 설정하고 나머지 title, name state는 빈 문자열로 설정
    // useEffect에 의해 이 함수가 실행되면 곧바로 새로운 리스트가 불러와짐
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