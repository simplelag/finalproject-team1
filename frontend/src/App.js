import './App.css';
import Main from "./pages/mainPages/Main";
import BoardMain from "./pages/board/BoardMain";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ViewMainList from "./pages/searchResult/ViewMainList";
import ViewBestList from "./pages/searchResult/ViewBestList";
import Admin from "./pages/admin/Admin";
import QuestionDetail from "./pages/admin/QuestionDetail";
import SellerPage from "./pages/seller/SellerPage";
import BookDetailPage from "./pages/seller/BookDetailPage";
import Join from "./pages/member/Join";
import JoinMember from "./pages/member/JoinMember";
import CheckLogin from "./pages/member/CheckLogin";
import MyLogin from "./pages/member/MyLogin";
import MyLoginUpdate from "./pages/member/MyLoginUpdate";
import ShoppingBasket from "./pages/seller/ShoppingBasket";
import ViewOldBookList from "./pages/searchResult/ViewOldBookList";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/sellerPage"} element={<SellerPage />} />
                <Route path={"/bookDetailPage"} element={<BookDetailPage />}/>
                <Route path={"/ShoppingBasket"} element={<ShoppingBasket />}/>
                <Route path={"/"} element={<Main />} />
                <Route path={"/board"} element={<BoardMain />} />
                <Route path={"/board/write"} element={<BoardWrite />} />
                <Route path={"/board/:boardPk"} element={<BoardDetail />} />
                <Route path={"/view"} element={<ViewMainList />} />
                <Route path={"/best"} element={<ViewBestList />} />
                <Route path={"/OldBook"} element={<ViewOldBookList />} />
                <Route path={"/admin"} element={<Admin id={"admin"}/>} />
                <Route path={"/admin/question/:boardPk"} element={<QuestionDetail />} />
                <Route path={"/login"} element={<Join />} />
                <Route path={"/login/sign"} element={<JoinMember />}/>
                <Route path={"/login/main"} element={<CheckLogin />}/>
                <Route path={"/login/myLogin"} element={<MyLogin />}/>
                <Route path={"/login/myLogin/myUserUpdate"} element={<MyLoginUpdate />}/>
                {/*<Route path={"/chat"} element={<Chat />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
