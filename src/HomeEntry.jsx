import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

export default function HomeEntry(props) {

    const [home, setHome] = useState(undefined);
    console.log("HomeEntry rendered! ", home)
    const params = useParams();

    useEffect(() => {
        Axios.get('/api/home/' + params.homeId)
            .then(response => {
                console.log("Front-end receives response: ", response);
                setHome(response.data);}) 
            .catch(error => {
                console.log(error)
                if (error.response) {
                    console.log(error.response.data)
                    if (error.response.data.message) {
                        console.log(error.response.data.message)
                    }
                }
            });
    }, [])

    if (!home) {
        return (<div>Home Loading...</div>)
    }


    return (
        <div>
            <h1> Address: {home.address}</h1>
            <h2>Build Date: {home.builtDate}</h2>
            This is a Home Entry
        </div>
    )
}