import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import './EntryForm';
import EntryForm from './EntryForm';
import { Button } from 'antd';


function App() {

    const [entries, setEntries] = useState([]);
    const [newEntryInput, setNewEntryInput] = useState({});
    console.log("App is rendered. newEntryInput: ", newEntryInput);

  
    function getEntries() {
      Axios.get('/api/entries')
        .then(function(response) {
          setEntries(response.data);
        }).catch(
            error => {console.log("Get all entries failed in App.js. Error: ", error.response.data);}
        )
    }

    function createNewEntry() {
      console.log("In App,js, createNewEntry:", newEntryInput);
      if (!newEntryInput) return;
      Axios.post('/api/entries', {
        address: newEntryInput.address,
        name: newEntryInput.name,
        hasGrooming: newEntryInput.hasGrooming,
        hasBoarding: newEntryInput.hasBoarding,
        description: newEntryInput.description,
        image: newEntryInput.image
      })
        .then(function(response) {
          setNewEntryInput('');
          getEntries();
        })
        .catch(function(error) {
          console.log("Create entry failed in App.js. Error: ", error.response.data);
        })
    }

    useEffect(getEntries, []);

    const entryComponent = [];
    for(let entry of entries) {
      entryComponent.push(<div>
        <a href={'/entry/' + entry._id}>
            <h1>{entry.name}</h1>
        </a>
        </div>)
    }

    return (
        <div>
            {entryComponent}
            {/* disable if user is not logged in */}
            {/* <EntryForm /> */}
            <EntryForm setNewEntryInput={setNewEntryInput}/>
            <Button onClick={createNewEntry}>Create New Entry</Button>

        </div>)
}

export default App;
