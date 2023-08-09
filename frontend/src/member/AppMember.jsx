import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JoinMember from "./JoinMember";
import Join from "./Join";
import CheckLogin from "./CheckLogin";
import MyLogin from "./MyLogin";
import MyLoginUpdate from "./MyLoginUpdate";

function AppMember(props) {

    return (
        <div className={'container'}>
            <BrowserRouter>
                <Routes>
                    <Route>
                        <Route path={'/login'} element={<Join />}></Route>
                        <Route path={'/login/sign'} element={<JoinMember />} />
                        <Route path={'/login/main'} element={<CheckLogin />} />
                        <Route path={'/login/myLogin'} element={<MyLogin />} />
                        <Route path={'/login/myLoginUpdate'} element={<MyLoginUpdate />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AppMember;