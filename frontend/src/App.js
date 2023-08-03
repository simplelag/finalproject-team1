import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";

function App() {
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
