import './App.css';
import Main from "./pages/Main";
import ViewMain from "./pages/ViewMain";
import BoardMain from "./pages/BoardMain";
import BoardWrite from "./pages/BoardWrite";
import BoardDetail from "./pages/BoardDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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

            </Routes>
        </BrowserRouter>
    );
}

export default App;
