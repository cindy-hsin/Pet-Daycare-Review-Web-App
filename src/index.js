import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import CreateEntry from './CreateEntry';
import Entry from './Entry';
import Login from './Login';
import SignUp from './SignUp';
import Layout from './Layout';

ReactDOM.render(    
    <Layout>
    <BrowserRouter>
    <Routes>
        <Route path={"/"} element={<Home />}/>
        <Route path={"/entries/new"} element={<CreateEntry />}/>
        <Route path={"/entries/:entryId"} element={<Entry />}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/signup"} element={<SignUp/>}/>
        {/* for testing purposes */}
        {/*TODO: Add a page to show user's entries*/} 
        {/* <Route paht={"user/entries"} element={}/> */}
    </Routes>
    </BrowserRouter>
    </Layout>
    ,
    document.getElementById('root')
);


