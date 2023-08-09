import './App.css';
import Main from "./pages/mainPages/Main";
import ViewMain from "./pages/ViewMain";
import BoardMain from "./pages/board/BoardMain";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SellerPage from "./pages/SellerPage";
import OldBookList from "./pages/OldBookList";
import BookDetailPage from "./pages/BookDetailPage";
import Admin from "./pages/admin/Admin";
import QuestionDetail from "./pages/admin/QuestionDetail";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/admin"} element={<Admin id={"admin"}/>} />
                <Route path={"/admin/question/:boardPk"} element={<QuestionDetail />} />
                <Route path={"/"} element={<Main />} />
                <Route path={"/main/board"} element={<BoardMain />} />
                <Route path={"/main/board/write"} element={<BoardWrite />} />
                <Route path={"/main/board/:boardPk"} element={<BoardDetail />} />
                <Route path={"/SellerPage"} element={<SellerPage />}/>
                <Route path={"/OldBookList"} element={<OldBookList />}/>
                <Route path={"/BookDetailPage"} element={<BookDetailPage />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
