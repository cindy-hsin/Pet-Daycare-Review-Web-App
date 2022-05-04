import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import CreateEntry from './CreateEntry';
import UpdateEntry from './UpdateEntry';
import Entry from './Entry';
import Login from './Login';
import SignUp from './SignUp';
import Layout from './Layout';

ReactDOM.render(    
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route path={"/"} element={<Home />}/>
                <Route path={"/entries/new"} element={<CreateEntry />}/>
                <Route path={"/entries/edit/:entryId"} element={<UpdateEntry />}/>
                <Route path={"/entries/:entryId"} element={<Entry />}/>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/signup"} element={<SignUp />}/>
            </Routes>
        </Layout>
    </BrowserRouter>
    ,
    document.getElementById('root')
);


