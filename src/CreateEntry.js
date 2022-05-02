import React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import EntryForm from './EntryForm';
import { Form, Input, Button, Select } from 'antd';


function CreateEntry() {
    const [form] = Form.useForm();
    const [entryInput, setEntryInput] = useState({});
    const navigate = useNavigate();
    console.log("CreateEntry is rendered. entryInput: ", entryInput);

    function createNewEntry() {
      console.log("In CreateEntry.js, createNewEntry:", entryInput);
      
      // Validation: if required field is missing, or only contains whitespace (for string fields).
      // Back-end: Will reject submission.
      // Front-end: antd Form will display error message.

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
        <Form form={form} layout="vertical"  labelCol={{span: 4,}} wrapperCol={{span: 16,}}>
        <h2>Create a New Entry</h2>
        <Form.Item label="Name" name="name" 
            rules={[
                {
                required: true,
                whitespace: true,
                message: 'Please enter the name of the daycare!',
                },
            ]}> 
        <Input placeholder="Great Dog" onChange={e => setEntryInput({...entryInput, name: e.target.value})}/>
        </Form.Item>

        <Form.Item label="Address" name="address"
            rules={[
                {
                required: true,
                whitespace: true,
                message: 'Please enter the address!',
                },
            ]}>
            <Input placeholder="Minor Ave 123, Seattle, WA 99999" onChange={e => setEntryInput({...entryInput, address: e.target.value})}/>
        </Form.Item>

        <Form.Item label="Has Grooming" name="hasGrooming"
            rules={[
            {
                required: true,
                message: 'Please select if the daycare has grooming.',
            },
            ]}>
            <Select onSelect={value => setEntryInput({...entryInput, hasGrooming: value})}>
            <Select.Option value="true">Yes</Select.Option>
            <Select.Option value="false">No</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="Has Boarding" name="hasBoarding" 
            rules={[
                {
                required: true,
                message: 'Please select if the daycare has boarding.',
                },
            ]}>
            <Select onSelect={value => setEntryInput({...entryInput, hasBoarding: value})}>
            <Select.Option value="true">Yes</Select.Option>
            <Select.Option value="false">No</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="Description" >
            <Input.TextArea onChange={e => setEntryInput({...entryInput, description: e.target.value})}/>
        </Form.Item>

        <Form.Item label="Photo" >
            <Input.TextArea onChange={e => setEntryInput({...entryInput, photo: e.target.value})}/>
        </Form.Item>

        
        <Form.Item>
            <Button htmlType="submit" type="primary" onClick={createNewEntry}>Submit</Button>
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
