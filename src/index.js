import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import CreateEntry from './CreateEntry';
import UpdateEntry from './UpdateEntry';
import Entry from './Entry';
import LogIn from './LogIn';
import SignUp from './SignUp';


ReactDOM.render(    
    <BrowserRouter>
    <NavBar />
    <Routes>
        <Route path={"/"} element={<Home />}/>
        <Route path={"/entries/new"} element={<CreateEntry />}/>
        <Route path={"/entries/edit/:entryId"} element={<UpdateEntry />}/>
        <Route path={"/entries/:entryId"} element={<Entry />}/>
        <Route path={"/login"} element={<LogIn/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
        {/*TODO: Add a page to show user's entries*/} 
        {/* <Route paht={"user/entries"} element={}/> */}
    </Routes>
    </BrowserRouter>
    ,
    document.getElementById('root')
);


