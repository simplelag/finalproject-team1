import './App.css';
import Main from "./pages/Main";
import ViewMain from "./pages/ViewMain";
import BoardMain from "./pages/BoardMain";
import BoardWrite from "./pages/BoardWrite";
import BoardDetail from "./pages/BoardDetail";


function App() {
    return (
        <div className={'container my-4'}>
            {/*<Main />*/}
            {/*<ViewMain />*/}
            {/*<BoardMain />*/}
            {/*<BoardWrite />*/}
            <BoardDetail />
        </div>
    );
}

export default App;
