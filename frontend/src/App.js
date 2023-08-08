import './App.css';
import Main from "./pages/Main";
import ViewMain from "./pages/ViewMain";
import BoardMain from "./pages/BoardMain";
import BoardWrite from "./pages/BoardWrite";
import BoardDetail from "./pages/BoardDetail";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    const id = sessionStorage.getItem("id");
    console.log(`App에서 가져온 session id: ${id}`);
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
