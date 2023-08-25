import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagenation from "../common/Pagenation";

function BoardHistory(props) {

    const [userId, setUserId] = useState(sessionStorage.getItem("id"))
    const [ myBoardList, setMyBoardList ] = useState([])

    // useEffect(() => {
    //     axios.get('http://localhost:8080/login/myLogin/myBoardList', {
    //         params:{
    //             userId: userId
    //         }
    //     })
    //         .then(res => {
    //             setMyBoardList(res.data)
    //         })
    // },[]);

    return (
        <div className={'container my-4'}>
            {/*<h1 className={'display-5 my-4 text-center'}>작성한 게시물</h1>*/}
            <div className={'border border-2'}>
                <table className={'table table-hover table-striped'}>
                    <colgroup>
                        <col width={'10%'}/>
                        <col width={'10%'}/>
                        <col width={'65%'}/>
                        <col width={'15%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th className={'text-center'}>글번호</th>
                        <th className={'text-center'}>말머리</th>
                        <th>제목</th>
                        <th className={'text-center'}>작성일</th>
                    </tr>
                    </thead>
                    <tbody>
                    { myBoardList.length==0?
                        <tr><td colSpan={4} className={"text-center"}>작성한 게시글이 없습니다.</td></tr> :
                        myBoardList.map(item => {
                            return (
                                <tr key={item.boardPk}>
                                    <td className={'text-center col-sm-1'}>{item.boardPk}</td>
                                    <td className={'text-center col-sm-1'}>{item.boardCategory}</td>
                                    <td><a href={"/board/"+item.boardPk} className={'text-decoration-none text-dark'}>{item.boardTitle}</a></td>
                                    <td className={'text-center col-sm-2'}>{item.boardDatetime}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <Pagenation
                // key={qNum}
                setList={setMyBoardList}
                url={`/login/myLogin/myBoardList?userId=${userId}`}
                numberUrl={`/login/myLogin/mySaleListCount?userId=${userId}`}
                howManyContentsInAPage={5}
                howManyPagesInABlock={5}
                searchType={[]}
                order={""}
                isSearchable={false}
            />
        </div>
    )
}

export default BoardHistory;