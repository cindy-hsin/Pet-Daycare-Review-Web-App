import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Entry from './Entry';
import Login from './Login';
import CreateUser from './CreateUser';
import Header from './Header';

ReactDOM.render(    
    <BrowserRouter>
    <Header />
    <Routes>
        <Route path={"/"} element={<App />}/>
        <Route path={"/entries/:entryId"} element={<Entry />}/>
        <Route path={"/login"} element={<Login />}/>
        <Route path={"/createUser"} element={<CreateUser />}/>
    </Routes>
    </BrowserRouter>
    ,
    document.getElementById('root')
);


