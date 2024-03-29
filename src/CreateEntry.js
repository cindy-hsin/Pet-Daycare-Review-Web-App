import React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import EntryForm from './EntryForm';


function CreateEntry() {
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
        <div className="central-form">
            <EntryForm mode="create" entryInput={entryInput} onSubmit={createNewEntry}/>
        </div>
        
        
        )
}

export default CreateEntry;