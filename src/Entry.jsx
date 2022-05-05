import React from 'react';
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { Image, Descriptions, Divider, Button, Modal, Avatar } from 'antd';
import moment from 'moment';

import ReviewArea from './ReviewArea'
import defaultEntryPhoto from './assets/defaultDaycareImage.png'
import defaultAvatar from "./assets/defaultUserAvatar.png";

import './Entry.css';

export default function Entry(props) {
    const [entry, setEntry] = useState(undefined);
    const [loginUsername, setLoginUsername] = useState(null);     //loginUsername: current logged-in loginUsername
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    console.log("Entry rendered! ", entry);

    // const isLoggedIn = true; // TODO: Just for test. Real log-in logic to be implemented.

    useEffect(getEntry, []);
    useEffect(checkLoginUser, [])   //TODO: ?? edge case??

    function getEntry() {
        Axios.get('/api/entries/' + params.entryId)
        .then(response => {
            console.log("Entry.jsx: successfully get Entry: ", response.data);
            setEntry(response.data);}) 
        .catch(function(error) {
            console.log("Get current entry data failed in Entry.js. Error: ", error.response.data);
            navigate('/');
        })
    }

    function checkLoginUser() {
        console.log("checkLoginUser called")
        Axios.get('/api/users/isLoggedIn')
        .then(response => {
            console.log("Entry.jsx: successfully checked Login user: ", response.data.username);
            setLoginUsername(response.data.username)
        })
        .catch(error => console.log("Entry.jsx: User is not logged in. Error: ", error.response.data));
    }


    function deleteEntry() {
        Axios.delete('/api/entries/' + params.entryId)
        .then(response => {
            console.log("Entry.jsx: delteEntry response: ", response);
            console.log("Entry.jsx: successfully deleted entry and all of its reviews: ", response.data);
            navigate('/');
        })
        .catch(error => console.log("Entry.jsx: Error: ", error.response.data))
    }

    // if cookie loginUsername valid:
    //      display ReviewForm
    //      if cookieUsername === entry.creator,  Entry Edit, Delete
    //      if cookieUsername === review.creator, Review Edit, Delete


  

    return (
        !entry ? (
            <div>Entry Loading...</div>
        ) : <div className="view-post">
                <div className="entry-title">
                    <h1>{ entry.name }</h1>
                    <Image src={entry.photo ? entry.photo : defaultEntryPhoto}/> 
                </div>

                <div className="two-cols">  
                    <span>
                        <Avatar size="large" src={/**TODO: get creator's avatar.Try using 'ref' in schema?>*/ defaultAvatar}/>
                        &nbsp;
                        {entry.creator}
                    </span>
                    <p className="timestamp">{moment(entry.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
                </div>   

                <div className="entry-info">
                    <Descriptions bordered>
                        <Descriptions.Item label="Address" span={3}>
                            {entry.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description" span={3}> {entry.description} </Descriptions.Item>
                        <Descriptions.Item label="Has Grooming" > {entry.hasGrooming ? "YES" : "NO"} </Descriptions.Item>
                        <Descriptions.Item label="Has Boarding" > {entry.hasBoarding ? "YES" : "NO"} </Descriptions.Item>
                        <Descriptions.Item label="Average Rating"> / {/*TODO: Add average rating*/} </Descriptions.Item>
                    </Descriptions>
                </div>

                {loginUsername === entry.creator &&
                    <div>
                        <div className="buttons-wrapper float-right">
                            <Button type="primary" onClick={()=>{
                                navigate('/entries/edit/'+ params.entryId);
                            }}>Edit Info</Button>
                            <Button danger onClick={()=>{
                                setDeleteModalVisible(true);
                            }}>Delete Post</Button>
                        </div>
                        <br/>
                    </div>
                }
                
                
                <Divider />
                <ReviewArea loginUsername={loginUsername} entryId={params.entryId} />
            
                <Modal title="Delete Daycare Post" visible={deleteModalVisible}
                    onOk={()=>{
                        setDeleteModalVisible(false);
                        deleteEntry(); 
                    }}
                    onCancel={()=>{setDeleteModalVisible(false)}}
                    >
                    <p>Are you sure you want to delete this daycare post?</p>
                    <p>Notice that all reviews will also be deleted.</p>
                </Modal>
            </div>


    )
}