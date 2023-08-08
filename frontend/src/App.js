import './App.css';
import Main from "./pages/mainPages/Main";
import ViewMain from "./pages/ViewMain";
import BoardMain from "./pages/board/BoardMain";
import BoardWrite from "./pages/board/BoardWrite";
import BoardDetail from "./pages/board/BoardDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/main"} element={<Main />} />
                <Route path={"/main/board"} element={<BoardMain />} />
                <Route path={"/main/board/write"} element={<BoardWrite />} />
                <Route path={"/main/board/:boardPk"} element={<BoardDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
