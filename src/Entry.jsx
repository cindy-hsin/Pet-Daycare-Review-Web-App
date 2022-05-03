import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Image, Descriptions, Divider } from 'antd';

import ReviewArea from './ReviewArea'
import defaultEntryPhoto from './assets/defaultDaycareImage.png'

export default function Entry(props) {
    const [entry, setEntry] = useState(undefined);
    const [username, setUsername] = useState(null);     //username: current logged-in username

    const params = useParams();
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
            console.log("Get current entry data failed in UpdateEntry.js. Error: ", error.response.data);
        })
    }

    function checkLoginUser() {
        console.log("checkLoginUser called")
        Axios.get('/api/users/isLoggedIn')
        .then(response => {
            console.log("Entry.jsx: successfully checked Login user: ", response.data.username);
            setUsername(response.data.username)
        })
        .catch(error => console.log("Entry.jsx: User is not logged in. Error: ", error.response.data));
    }

    // if cookie username valid:
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
                    <Descriptions.Item label="Has Grooming" > {entry.hasGrooming ? "YES" : "NO"} </Descriptions.Item>
                    <Descriptions.Item label="Has Boarding" span={2}> {entry.hasBoarding ? "YES" : "NO"} </Descriptions.Item>
                    
                    {/* <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item> */}

                    <Descriptions.Item label="Address" span={3}>
                        {entry.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description"> {entry.description} </Descriptions.Item>
                </Descriptions>

                {/**TODO: Add Edit, Delete button for creator. Ref: Blog-app */}
                

                

                <Divider />
                <ReviewArea username={username} entryId={params.entryId} />
    

                    
                


            </div>


    )
}