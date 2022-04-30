import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // useNavigate hook: For redirect.
    const navigate = useNavigate();

    function authenticateUser() {
        Axios.post('/api/users/authenticate', {username, password})
            .then(response => {
                console.log(response.data);
                // Redirect to '/' after successfully creating a new user.

                // In dev phase:
                // React and back-end runs on different server.
                // When ready to redirect to '/' from Login component,
                // we're already at front-end(localhost:3000/),
                // so <Router> in src/index.js will determine what will be the redirected page.
                // Here, we'll be redirected to <App/> component, to show all homes owned by current user.


                // After deployment:
                // '/' matches the '*' route and Node will server index.html,
                // which is translated from index.js.
                // So similarly, <Router> in index.js determines that we'll be 
                // redirected to <App/>
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

            <button onClick={authenticateUser}>Log in</button>
        </div>

    )
    
}