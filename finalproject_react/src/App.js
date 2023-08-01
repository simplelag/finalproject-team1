import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/hello')
        .then(response => response.text())
        .then(message => {
          setMessage(message);
        });
  },[])
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
