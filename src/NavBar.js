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
import defaultAvatar from "./assets/defaultUserAvatar.png";

const { SubMenu } = Menu;

export default function NavBar() {
    const [username, setUsername] = useState(null);
    const [avatar, setAvatar] = useState(null);


    const navigate = useNavigate();
    // console.log("NavBar re-renderd. username: ", username);

    useEffect(function() {
        // console.log("Axios.get/...isLoggedIn, username: ", username);
        Axios.get('/api/users/isLoggedIn')
            .then(response => {
                setUsername(response.data.username); 
                setAvatar(response.data.avatar);
                // console.log("username: ", response.data.username, "avatar: ", response.data.avatar);
            })
            .catch(error => console.log("User is not logged in. Error: ", error.response.data));
    })

    function logout() {
        console.log("log out!");
        Axios.post('/api/users/logout')
        .then(response => {
            // console.log("Got response from backend")
            setUsername(null);
            // console.log("After setUsername(null)");
            navigate('/')
            // console.log("After navigate('/')");
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
                
                {username ? (   // TODO: Need to adjust render condition?? 
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
                        key="SubMenu"   //TODO: Avatar src: Need to adjust render condition?? 
                        icon={<Avatar src={avatar ? avatar : defaultAvatar} shape="circle" />}
                        title={" " + username}   //TODO: Need to save username into an user object when login.
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