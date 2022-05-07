import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import EntryForm from './EntryForm';


function UpdateEntry() {
    const [entryInput, setEntryInput] = useState({});
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const navigate = useNavigate();
    console.log("UpdateEntry is rendered. entryInput: ", entryInput, " hasFetchedData: ", hasFetchedData);

    const pathParams = useParams();

    useEffect(getCurrentEntryData, []);

    function getCurrentEntryData() {
        Axios.get('/api/entries/' + pathParams.entryId)
            .then(function(response) {
                setEntryInput(response.data);
                setHasFetchedData(true);
            }).catch(function(error) {
                console.log("Get current entry data failed in UpdateEntry.js. Error: ", error.response.data);
            })
    }

    function updateEntry(newEntryInput) {
        Axios.put('/api/entries/' + pathParams.entryId, {
            address: newEntryInput.address,
            name: newEntryInput.name,
            hasGrooming: newEntryInput.hasGrooming,
            hasBoarding: newEntryInput.hasBoarding,
            description: newEntryInput.description,
            photo: newEntryInput.photo
        })
            .then(function(response) {
                const responseEntryId = response.data; // backend sends back the entryId only
                console.log("UpdateEntry.js, successfully updated: ", responseEntryId);
                navigate('/entries/'+ responseEntryId);
            })
            .catch(function(error) {
                console.log("Update entry failed in UpdateEntry.js. Error: ", error.response.data);
            })
    }

    return (
        hasFetchedData ? 
            <div className='central-form'>
                <EntryForm mode="update" entryInput={entryInput} onSubmit={updateEntry}></EntryForm>
            </div >
             : 
            ''    
    );

}

export default UpdateEntry;