import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css'
import SellerPage from "./pages/SellerPage";
import ShoppingBasket from "./pages/ShoppingBasket";
import BookDetailPage from "./pages/BookDetailPage";
import OldBookList from "./pages/OldBookList";
import Main from "./pages/Main";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Main/>
        {/*<BookDetailPage/>*/}
        {/*<OldBookList/>*/}
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
