import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./routes/AddUser";
import Dashboard from "./routes/Dashboard";



ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store } >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={  <Dashboard/> }/>
                    <Route path="Dashboard" element={ <Dashboard/> }/>
                    <Route path="AddUser" element={ <AddUser/> }/>c
                </Routes>
            </BrowserRouter>,
        </Provider>
    </React.StrictMode>,
    document.getElementById( 'root' )
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
