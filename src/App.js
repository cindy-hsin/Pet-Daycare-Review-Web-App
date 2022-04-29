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
  
    function getEntries() {
      Axios.get('/api/entry')
        .then(function(response) {
          setEntries(response.data);
        })
    }

    function createNewEntry() {
      console.log(newEntryInput);
      if (!newEntryInput) return;
      Axios.post('/api/entry', {
        address: newEntryInput.address,
        name: newEntryInput.name,
        hadGrooming: newEntryInput.hadGrooming,
        hasBoarding: newEntryInput.hasBoarding,
        // add image and description
      })
        .then(function(response) {
          setNewEntryInput('');
          getEntries();
        })
        .catch(function(error) {
          console.log(error);
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
