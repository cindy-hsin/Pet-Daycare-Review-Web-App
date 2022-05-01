import React from 'react';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

export default function Entry(props) {

    const [entry, setEntry] = useState(undefined);
    console.log("Entry rendered! ", entry)
    const params = useParams();

    useEffect(() => {
        Axios.get('/api/entries/' + params.entryId)
            .then(response => {
                console.log("Front-end receives response: ", response);
                setEntry(response.data);}) 
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

    if (!entry) {
        return (<div>Entry Loading...</div>)
    }


    return (
        <div>
            <h1> Name: {entry.name}</h1>
            <h2> Address: {entry.address}</h2>
            <h2> Has Grooming: {entry.hasGrooming}</h2>
            <h2> Has Boarding: {entry.hasBoarding}</h2>
            <h3> Date: {entry.builtDate}</h3>
        </div>
    )
}