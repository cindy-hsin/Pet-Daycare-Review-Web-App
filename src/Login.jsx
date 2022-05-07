import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Form, Input, Button, Tag } from 'antd';


export default function Login(props) {
    const [form] = Form.useForm();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submissionError, setSubmissionError] = useState({});

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
                // Here, we'll be redirected to <Home/> component, to show all entries.


                // After deployment:
                // '/' matches the '*' route and Node will server index.html,
                // which is translated from index.js.
                // So similarly, <Router> in index.js determines that we'll be 
                // redirected to <Home/>
                navigate('/');
            })
            .catch(error => {
                console.log("Login.jsx: authenticateUser failed. Error: ", error.response);
                return setSubmissionError(error.response);
            });
    }


    return (
        <div className="central-form">
        <Form form={form} layout="vertical" >
            <Form.Item label="Username" name="username"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}>  
                <Input  onChange={e => setUsername(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Password" name="password"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}>  
                <Input.Password  onChange={e => setPassword(e.target.value)}/>
            </Form.Item>

            

            <div>
                {Object.entries(submissionError).map(([key, value]) => (
                    (key === "customMessage"|| key === "data" || key === "status" || key==="statusText") && 
                        (<Tag color="error" className="full-width" key={key}>
                            {value}
                        </Tag>)
                ))}
            </div>

            

            <Form.Item>
                <Button className="float-right" htmlType='submit' type="primary" onClick={authenticateUser}>Login</Button>
            </Form.Item>
        </Form>
        </div>
    )
}