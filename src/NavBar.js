import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  LoginOutlined,
  UserAddOutlined,
  SettingOutlined,
  GroupOutlined,
  FormOutlined,
} from "@ant-design/icons";

import { Menu, Avatar } from "antd";
import appLogo from "./assets/appLogo.png";


const { SubMenu } = Menu;


export default function NavBar() {
    console.log("NavBar is rendered!");
    // const [username, setUsername] = useState(null);
    const userName = null;  // For inital testing: null -> show "Log In, Sign Up"; "xxx" -> show Create Entry, Profile button

    // TODO: fill the login, logout logic.
    function logout(){
        console.log("Log out!");
    }

    return(
        <div>
            <Menu selectedKeys={"logo"} mode="horizontal" theme="dark">
                <Menu.Item className="unhoverable-menu-item" key="appLogo">
                <a href="/">
                    <Avatar src={appLogo} shape="square" /> &nbsp; Daycare Review App
                </a>
                </Menu.Item>

                
                {userName ? (   // TODO: Need to adjust render condition?? 
                    <>
                        <Menu.Item
                        key="newPost"
                        icon={<FormOutlined />}
                        className="float-right"
                        >
                        <a href="/entries/new">Create New Entry</a>
                        </Menu.Item>

                        <SubMenu
                        key="SubMenu"   //TODO: Need to save Avatar into an user object when login.
                        icon={<Avatar src={appLogo} shape="circle" />}
                        title={" " + userName}   //TODO: Need to save userName into an user object when login.
                        className="float-right unhoverable-menu-item"
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
                    <>
                        <Menu.Item
                        key="login"
                        icon={<LoginOutlined />}
                        className="float-right"
                        >
                        <a href="/login">Log In</a>
                        </Menu.Item>
                        <Menu.Item
                        key="logout"
                        icon={<UserAddOutlined />}
                        className="float-right"
                        >
                        <a href="/signup">Sign Up</a>
                        </Menu.Item>
                    </>
                )
                }



            </Menu>
        </div>


    )

}