import React from 'react';
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { Image, Descriptions, Divider, Button, Modal } from 'antd';


import ReviewArea from './ReviewArea'
import defaultEntryPhoto from './assets/defaultDaycareImage.png'

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
        ) : <div className="view-entry central-form-large">
                <div >
                    {/*TODO: May have to adjust size and centerize image */}
                    <Image 
                        src={entry.photo ? entry.photo : defaultEntryPhoto}
                    /> 
                </div>

                { /*TODO: Add creator, avator, Last edited:  updatedAt(May 28, 2021 at 20:19) 
                    Ref: Blogapp */}

                <h1 > {entry.name  /*TODO: centerize name */}</h1>
                
                <div>Submitted by {entry.creator/**TODO: Reformat */}</div>   

                <Descriptions title="Daycare Info" bordered>
                    <Descriptions.Item label="Has Grooming" spane={1}> {entry.hasGrooming ? "YES" : "NO"} </Descriptions.Item>
                    <Descriptions.Item label="Has Boarding" span={2}> {entry.hasBoarding ? "YES" : "NO"} </Descriptions.Item>
                    
                    {/* <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item> */}

                    <Descriptions.Item label="Address" span={3}>
                        {entry.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description"> {entry.description} </Descriptions.Item>
                </Descriptions>

                {loginUsername === entry.creator &&
                    <div>
                        <Button type="primary" onClick={()=>{
                            navigate('/entries/edit/'+ params.entryId);
                        }}>Edit Daycare Info</Button>
                        <Button danger onClick={()=>{
                            setDeleteModalVisible(true);
                        }}>Delete Daycare Post</Button>
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