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



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Main />} />
                <Route path={"/board"} element={<BoardMain />} />
                <Route path={"/board/write"} element={<BoardWrite />} />
                <Route path={"/board/:boardPk"} element={<BoardDetail />} />
                <Route path={"/view"} element={<ViewMainList />} />
                <Route path={"/best"} element={<ViewBestList />} />
                <Route path={"/admin"} element={<Admin id={"admin"}/>} />
                <Route path={"/admin/question/:boardPk"} element={<QuestionDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
