import logo from './logo.svg';
import './App.css';
import axios from "axios";

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
    </div>
  );
}

export default App;
