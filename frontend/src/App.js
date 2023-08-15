import './App.css';
import Main from "./pages/mainPages/Main";
import BoardMain from "./pages/board/BoardMain";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SellerPage from "./pages/seller/SellerPage";
import BookDetailPage from "./pages/seller/BookDetailPage";
import ViewMainList from "./pages/searchResult/ViewMainList";
import ShoppingBasket from "./pages/seller/ShoppingBasket";
import OldBookList from "./pages/seller/OldBookList";
import Join from "./member/Join";
import JoinMember from "./member/JoinMember";
import CheckLogin from "./member/CheckLogin";
import MyLogin from "./member/MyLogin";
import MyLoginUpdate from "./member/MyLoginUpdate";
import React from "react";


function ViewBestList() {
    return null;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/ShoppingBasket"} element={<ShoppingBasket/>}/>
                <Route path={"/SellerPage"} element={<SellerPage />} />
                <Route path={"/BookDetailPage"} element={<BookDetailPage />}/>
                <Route path={"/BookDetailPage"} element={<BookDetailPage/>}/>
                <Route path={"/"} element={<Main />} />
                <Route path={"/board"} element={<BoardMain />} />
                <Route path={"/board/write"} element={<BoardWrite />} />
                <Route path={"/board/:boardPk"} element={<BoardDetail />} />
                <Route path={"/view"} element={<ViewMainList />} />
                <Route path={"/best"} element={<ViewBestList />} />
                <Route path={"/OldBookList"} element={<OldBookList/>}/>
                <Route path={'/login'} element={<Join />}></Route>
                <Route path={'/login/sign'} element={<JoinMember />} />
                <Route path={'/login/main'} element={<CheckLogin />} />
                <Route path={'/login/myLogin'} element={<MyLogin />} />
                <Route path={'/login/myLoginUpdate'} element={<MyLoginUpdate />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
