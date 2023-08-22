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
import PurchaseList from "./pages/purchase/PurchaseList";
import ShoppingBasket from "./pages/seller/ShoppingBasket";

import ViewOldBookList from "./pages/searchResult/ViewOldBookList";

import BoardUpdate from "./pages/board/BoardUpdate";
import Mail from "./pages/common/Mail";



function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main />} />
                <Route path={"/board"}>
                    <Route index element={<BoardMain />} />
                    <Route path={"write"} element={<BoardWrite />} />
                    <Route path={"update"} element={<BoardUpdate />} />
                    <Route path={":boardPk"} element={<BoardDetail />} />
                </Route>
                <Route path={"/bookDetailPage"} element={<BookDetailPage />}/>
                <Route path={"/view"} element={<ViewMainList />} />
                <Route path={"/best"} element={<ViewBestList />} />
                <Route path={"/OldBook"} element={<ViewOldBookList />} />
                <Route path={"/sellerPage"} element={<SellerPage />} />
                <Route path={"purchase"} element={<PurchaseList />} />
                <Route path={"/ShoppingBasket"} element={<ShoppingBasket />}/>
                <Route path={"/login"}>
                    <Route index element={<Join />} />
                    <Route path={"sign"} element={<JoinMember />}/>
                    <Route path={"main"} element={<CheckLogin />}/>
                    <Route path={"myLogin"} element={<MyLogin />}/>
                    <Route path={"myLogin/myUserUpdate"} element={<MyLoginUpdate />}/>
                </Route>
                <Route path={"admin"}>
                    <Route index element={<Admin id={"admin"}/>} />
                    <Route path={"question/:boardPk"} element={<QuestionDetail />} />
                </Route>
                <Route path={"/mail/:purchasePk"} element={<Mail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
