import React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import EntryForm from './EntryForm';
import { Form, Input, Button, Select } from 'antd';


function CreateEntry() {
    // const [form] = Form.useForm();
    const [entryInput, setEntryInput] = useState({});

    const navigate = useNavigate();
    console.log("CreateEntry is rendered. entryInput: ", entryInput);

    function createNewEntry(newEntryInput) {
      console.log("In CreateEntry.js, createNewEntry:", newEntryInput);
      
      // Validation: if required field is missing, or only contains whitespace (for string fields).
      // Back-end: Will reject submission.
      // Front-end: antd Form will display error message.

      Axios.post('/api/entries', {
        address: newEntryInput.address,
        name: newEntryInput.name,
        hasGrooming: newEntryInput.hasGrooming,
        hasBoarding: newEntryInput.hasBoarding,
        description: newEntryInput.description,
        photo: newEntryInput.photo
      })
        .then(function(response) {
          const entryId = response.data._id;
          console.log("CreateEntry.js, newly created entryId: ", entryId);
          setEntryInput('');
          navigate('/entries/'+ entryId);
        })
        .catch(function(error) {
          console.log("Create entry failed in CreateEntry.js. Error: ", error.response.data);
        })
    }


    return (
        <EntryForm mode="create" entryInput={entryInput} onSubmit={createNewEntry}/>
        
        
        )
}

export default CreateEntry;


    // function getEntries() {
    //   Axios.get('/api/entries')
    //     .then(function(response) {
    //       setEntries(response.data);
    //     }).catch(
    //         error => {console.log("Get all entries failed in App.js. Error: ", error.response.data);}
    //     )
    // }


        // useEffect(getEntries, []);

    // const entryComponent = [];
    // for(let entry of entries) {
    //   entryComponent.push(<div>
    //     <a href={'/entry/' + entry._id}>
    //         <h1>{entry.name}</h1>
    //     </a>
    //     </div>)
    // }
