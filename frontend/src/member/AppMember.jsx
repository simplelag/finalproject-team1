import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JoinMember from "./JoinMember";
import Join from "./Join";
import CheckLogin from "./CheckLogin";
import MyLogin from "./MyLogin";

function AppMember(props) {

    return (
        <div className={'container'}>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route index element={<Join />}></Route>
                        <Route path={'/sign'} element={<JoinMember />} />
                        <Route path={'/main'} element={<CheckLogin />} />
                        <Route path={'/myLogin'} element={<MyLogin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AppMember;