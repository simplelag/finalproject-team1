import React, {useState, useEffect} from 'react';
import button from "bootstrap/js/src/button";
import axios from "axios";
import collapse from "bootstrap/js/src/collapse";

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