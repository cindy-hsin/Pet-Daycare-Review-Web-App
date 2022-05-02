import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router';

import {
  LoginOutlined,
  UserAddOutlined,
  GroupOutlined,
  FormOutlined,
} from "@ant-design/icons";

import "./index.css";

import { Menu, Avatar } from "antd";
import appLogo from "./assets/appLogo.png";

const { SubMenu } = Menu;

export default function NavBar() {
    const [userName, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(function() {
        Axios.get('/api/user/isLoggedIn')
            .then(response => {setUsername(response.data.username); console.log("username: ", response.data.username)})
            .catch(error => console.log("User is not logged in"));
    }, [])
    // const userName = "abc";  
    // For inital testing: null -> show "Log In, Sign Up"; "xxx" -> show Create Entry, Profile button

    function logout() {
        // console.log("log out!");
        Axios.post('/api/user/logout')
        .then(response => {
            navigate('/')
        })
        .catch(error => console.log("Error logging out"));
    }

    return(
            <Menu selectedKeys={"logo"} mode="horizontal" theme="dark" >
                <Menu.Item className="unhoverable-menu-item">
                    <a href="/">
                        <Avatar src={appLogo} shape="square" /> &nbsp; Daycare Review App
                    </a>
                </Menu.Item>
                
                {userName ? (   // TODO: Need to adjust render condition?? 
                    // <div className="float-right">
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
                        <SubMenu
                        className="float-right"
                        key="SubMenu"   //TODO: Need to save Avatar into an user object when login.
                        icon={<Avatar src={appLogo} shape="circle" />}
                        title={" " + userName}   //TODO: Need to save userName into an user object when login.
                        > 
                            {/*TODO: Add a userPosts page? Modify the href link!!*/ }
                            <Menu.Item key="userPosts" icon={<GroupOutlined />}>
                                <a href="/user/posts">User Posts</a>
                            </Menu.Item>

                            <Menu.Item
                                key="logout"
                                icon={<LoginOutlined />}
                                onClick={logout}
                            >
                                Logout
                            </Menu.Item>
                        </SubMenu>
                    </>
                ) : (
                    // <div className="float-right">
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
                        key="logout"
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