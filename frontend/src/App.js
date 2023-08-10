import './App.css';
import Main from "./pages/mainPages/Main";
import ViewMain from "./pages/ViewMain";
import BoardMain from "./pages/board/BoardMain";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./pages/admin/Admin";
import QuestionDetail from "./pages/admin/QuestionDetail";
import SellerPage from "./pages/seller/SellerPage";
import BookDetailPage from "./pages/seller/BookDetailPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/admin"} element={<Admin id={"admin"}/>} />
                <Route path={"/admin/question/:boardPk"} element={<QuestionDetail />} />
                <Route path={"/"} element={<Main />} />
                <Route path={"/main/board"} element={<BoardMain />} />
                <Route path={"/SellerPage"} element={<SellerPage />} />
                <Route path={"/main/board/write"} element={<BoardWrite />} />
                <Route path={"/main/board/:boardPk"} element={<BoardDetail />} />
                <Route path={"/BookDetailPage"} element={<BookDetailPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
