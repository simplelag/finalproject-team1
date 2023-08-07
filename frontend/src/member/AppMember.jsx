import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JoinMember from "./JoinMember";
import Join from "./Join";

function AppMember(props) {

    return (
        <div className={'container'}>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route index element={<Join />}></Route>
                        <Route path={'/sign'} element={<JoinMember />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AppMember;