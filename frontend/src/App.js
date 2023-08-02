import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";

function App() {
    const id = sessionStorage.getItem("id");
    console.log(`App에서 가져온 session id: ${id}`);
    return (
        <div className={'container my-4'}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
