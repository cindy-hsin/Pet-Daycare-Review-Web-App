import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {Form, Input, Button, Tag} from 'antd';

const avatarUrlPlaceholder = "https://www.mockofun.com/wp-content/uploads/2019/12/circle-image.jpg";

export default function CreateUser(props) {
    const [form] = Form.useForm();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [submissionError, setSubmissionError] = useState({});
    console.log("Signup.jsx rendred, submissionError:", submissionError);

    // useNavigate hook: For redirect.
    const navigate = useNavigate();

    function createNewUser() {
        Axios.post('/api/users', {username, password, avatar})
            .then(response => {
                console.log("Created user");
                console.log(response.data);
                navigate('/');
            })
            .catch(error => {
                console.log("SignUp.jsx: createNewUser failed. Error: ", error.response);
                return setSubmissionError(error.response);
            });
    }

    return (
        <div className="central-form">
        <Form form={form} layout="vertical" >
        <h1 className='central-text'>Sign up for free</h1>
            <Form.Item label="Username" name="username"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your username!',
                        },
                      ]}>  
                <Input onChange={e => setUsername(e.target.value)}/>
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

            <Form.Item label="Profile Image URL" name="avatar">  
                <Input.TextArea placeholder= {avatarUrlPlaceholder}
                        onChange={e => setAvatar(e.target.value)}/>
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
                <Button className="float-right" htmlType='submit' type="primary" onClick={createNewUser}>Sign Up</Button>
            </Form.Item>
        </Form>
        </div>
    )
    
}