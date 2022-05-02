import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import {Form, Input, Button} from 'antd';


export default function CreateUser(props) {
    const [form] = Form.useForm();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");

    // useNavigate hook: For redirect.
    const navigate = useNavigate();

    function createNewUser() {
        Axios.post('/api/users', {username, password})
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
                <Input placeholder="ABC" onChange={e => setUsername(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Password" name="password"
                    rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}>  
                <Input placeholder="777777" onChange={e => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item label="Image URL" name="image">  
                <Input.TextArea placeholder="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theverge.com%2F2019%2F5%2F6%2F18531287%2Fpokemon-neuroscience-visual-cortex-brain-information&psig=AOvVaw1eWRzo-cb5_ikD_CNCPPKr&ust=1651548760409000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMii0tvwv_cCFQAAAAAdAAAAABAP"
                        onChange={e => setImage(e.target.value)}/>
            </Form.Item>

            <Form.Item>
                <Button className="float-right" htmlType='submit' type="primary" onClick={createNewUser}>Sign Up</Button>
            </Form.Item>
        </Form>
        </div>
    )
    
}