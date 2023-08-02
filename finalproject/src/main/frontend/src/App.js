import logo from './logo.svg';
import './App.css';
import axios from "axios";
import MainHome from "./MainHome";

function App() {
  return (
    <div>
      <button type={'button'}onClick={() =>{
          axios.get('http://localhost:8080/hello')
              .then(res =>{
                  alert(`통신성공\n${res.data}`);
              })
              .catch(err =>{
                  alert('통신 실패');
              })
      }}>확인</button>

        <MainHome />
    </div>
  );
}

export default App;
