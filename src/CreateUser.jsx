import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


export default function CreateUser(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // useNavigate hook: For redirect.
    const navigate = useNavigate();

    function createNewUser() {
        Axios.post('/api/user', {username, password})
            .then(response => {
                console.log("Created user");
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.log(error)
                if (error.response) {
                    console.log(error.response.data)
                    if (error.response.data.message) {
                        console.log(error.response.data.message)
                    }
                }
            });
    }

    return (
        <div>
            <h1> Create User</h1>
            <div>
                <h5>Username</h5>
                <input name="username" value={username} onChange={
                    e => setUsername(e.target.value)
                }></input>
            </div>
            
            <div>
                <h5>Password</h5>
                {/* use type='password' to hide the password when displayed */}
                <input type='password' name="password" value={password} onChange={
                    e => setPassword(e.target.value)
                }></input>
            </div>

            <button onClick={createNewUser}>Create User</button>
        </div>

    )
    
}