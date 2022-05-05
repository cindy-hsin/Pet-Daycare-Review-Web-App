import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router';

import {
  LoginOutlined,
  UserAddOutlined,
  FormOutlined,
} from "@ant-design/icons";

import "./index.css";

import { Menu, Avatar } from "antd";
import appLogo from "./assets/appLogo.png";
import defaultAvatar from "./assets/defaultUserAvatar.png";

const { SubMenu } = Menu;

export default function NavBar() {
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);

    const navigate = useNavigate();

    useEffect(function() {
        Axios.get('/api/users/isLoggedIn')
            .then(response => {
                setUsername(response.data.username); 
                setAvatar(response.data.avatar);
            })
            .catch(error => console.log("User is not logged in. Error: ", error.response.data));
    })

    function logout() {
        console.log("log out!");
        Axios.post('/api/users/logout')
        .then(response => {
            setUsername(null);
            navigate('/')
        })
        .catch(error => console.log("Error logging out"));
    }

    return(
            <Menu selectedKeys={"logo"} mode="horizontal" theme="dark" >
                <Menu.Item className="unhoverable-menu-item">
                    <a href="/">
                        <Avatar src={appLogo} shape="square" size="large"/> &nbsp; Dog Daycare Review
                    </a>
                </Menu.Item>

                {username ? (
                    <>
                        <div className="float-right">
                            <Menu.Item
                                className="float-right"
                                key="newPost"
                                icon={<FormOutlined />}
                                >
                                    <a href="/entries/new">Create New Entry</a>
                                </Menu.Item>
                        </div>
                        <Menu.Item
                            className="float-right"
                            key="logout"
                        >
                            <a href="/entries/new">Create New Entry</a>
                        </Menu.Item>

                         <Menu.Item
                            key="logout"
                            icon={<LoginOutlined />}
                            onClick={logout}
                        >
                            Logout
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item
                            className="float-right"
                            key="login"
                            icon={<LoginOutlined />}
                        >
                            <a href="/login">Log In</a>
                        </Menu.Item>

                        <Menu.Item
                            className="float-right"
                            key="signup"
                            icon={<UserAddOutlined />}
                        >
                            <a href="/signup">Sign Up</a>
                        </Menu.Item>
                    </>
                )
                }
            </Menu>
    )

}