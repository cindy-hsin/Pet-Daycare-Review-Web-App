import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './App.css';
import './EntryForm';
import EntryForm from './EntryForm';
import { Form, Input, Button, Select } from 'antd';


function CreateEntry() {
    const [form] = Form.useForm();
    // const [entries, setEntries] = useState([]);
    const [entryInput, setEntryInput] = useState({});
    const navigate = useNavigate();
    console.log("CreateEntry is rendered. newEntryInput: ", entryInput);

    function createNewEntry() {
      console.log("In CreateEntry.js, createNewEntry:", entryInput);
      if (!entryInput) return; // TODO: needed? Combine validation logic.

      //TODO: Check required field, and other validation. If invalid, show error message. 
      // Validation Ref: https://github.com/maryamaljanabi/mern-blog/tree/master/client/src/pages/Posts
      // Check NewPost.js

      
      Axios.post('/api/entries', {
        address: entryInput.address,
        name: entryInput.name,
        hasGrooming: entryInput.hasGrooming,
        hasBoarding: entryInput.hasBoarding,
        description: entryInput.description,
        image: entryInput.image
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
        // <EntryForm></EntryForm>
      <Form form={form} layout="vertical">
        <h2>Create a New Entry</h2>
        <Form.Item label="Name" required tooltip="This is a required field">  
        <Input placeholder="Great Dog" onChange={e => setEntryInput({...entryInput, name: e.target.value})}/>
      </Form.Item>

      <Form.Item label="Address" required tooltip="This is a required field">
        <Input placeholder="Minor Ave 123, Seattle, WA 99999" onChange={e => setEntryInput({...entryInput, address: e.target.value})}/>
      </Form.Item>

      <Form.Item label="Has Grooming" placeholder="please choose Yes or No" required tooltip="This is a required field">
        <Select onSelect={value => setEntryInput({...entryInput, hasGrooming: value})}>
          <Select.Option value="true">Yes</Select.Option>
          <Select.Option value="false">No</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Has Boarding" placeholder="please choose Yes or No" required tooltip="This is a required field">
        <Select onSelect={value => setEntryInput({...entryInput, hasBoarding: value})}>
          <Select.Option value="true">Yes</Select.Option>
          <Select.Option value="false">No</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Description" optional tooltip="This field is optionial">
        <Input.TextArea onChange={e => setEntryInput({...entryInput, description: e.target.value})}/>
      </Form.Item>

      <Form.Item label="Photo" optional tooltip="This field is optionial">
        <Input.TextArea onChange={e => setEntryInput({...entryInput, photo: e.target.value})}/>
      </Form.Item>

    {/* needs to pass the value back to the upper level */}
      <Form.Item>
        <Button type="primary" onClick={createNewEntry}>Submit</Button>
      </Form.Item>
    </Form>



        // <div>
        //     {/* {entryComponent} */}
        //     {/* disable if user is not logged in */}
        //     {/* <EntryForm /> */}
        //     <EntryForm setNewEntryInput={setNewEntryInput}/>
        //     <Button onClick={createNewEntry}>Create New Entry</Button>

        // </div>
        
        
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
