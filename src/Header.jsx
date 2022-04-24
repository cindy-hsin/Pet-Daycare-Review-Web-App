import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
    console.log("Header is rendered!")
    const [username, setUsername] = useState(null);

    const navigate = useNavigate();
    useEffect(function(){
        Axios.get('/api/user/isLoggedIn')
            .then(response => {
                console.log("Get isLoggedin: ", response.data.username);
                console.log("Current username in Header component: ", username);
                setUsername(response.data.username);})
            .catch(error => console.log("User is not logged in"));
    });

    function logout(){
        Axios.post('/api/user/logout')
            .then(respone => {
               setUsername(null);
                navigate('/');
            })  // TODO: Why not need to set username back to null?
            .catch(error => console.log("Error logging out"));
    }

    if (username) {
        return (
            <h1>
                {username} is logged in.
                <button onClick={logout}>Logout</button>
            </h1>
        )
    }

    return (<a href='/login'><h1>Click here to log in</h1></a>)
}