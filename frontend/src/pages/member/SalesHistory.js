import React from 'react';

function SalesHistory(props) {

    return (
        <div className={'container my-4'}>
            <h1 className={'display-5 my-4 text-center'}>판매 내역 페이지</h1>
            <div className={'border border-2'}>
                <table className={'table table-hover table-striped'}>
                    <colgroup>
                        <col width={'10%'}/>
                        <col width={'70%'}/>
                        <col width={'15%'}/>
                        <col width={'15%'}/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>판매상태</th>
                        <th>상품명</th>
                        <th className={'text-center'}>가격</th>
                        <th className={'text-center'}>수량</th>
                    </tr>
                    </thead>
                    <tbody>
                    <td className={'text-center'}>판매중</td>
                    <td className={'align-self-center'}>마음의 지혜</td>
                    <td className={'align-self-center text-center'}>10000</td>
                    <td className={'align-self-center text-center'}>2</td>
                    {/* 일단은 이렇게 할거라고 해놓긴만 했음 */}
                    {/*{*/}
                    {/*    boardList.map(item => {*/}
                    {/*        return (*/}
                    {/*            <tr key={item.num}>*/}
                    {/*                <td>{item.num}</td>*/}
                    {/*                <td>*/}
                    {/*                    <Link to={`detailBoard?num=${item.num}`}>{item.title}</Link>*/}
                    {/*                </td>*/}
                    {/*                <td>{item.id}</td>*/}
                    {/*                <td>{item.postdate}</td>*/}
                    {/*                <td>{item.visitCount}</td>*/}
                    {/*            </tr>*/}
                    {/*        );*/}
                    {/*    })*/}
                    {/*}*/}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalesHistory;