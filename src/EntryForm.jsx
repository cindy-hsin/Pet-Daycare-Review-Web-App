import React, {useState} from 'react';
import { Form, Input, Button, Select } from 'antd';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const [entryInput, setEntryInput] = useState({});

  // function createNewEntry() {
  //     console.log(entryInput);
  //   if (!entryInput) return;
  //   Axios.post('/api/entry', entryInput)
  //     .then(function(response) {
  //       setEntryInput({});
  //       // getEntries();
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     })
  // }

  // TODO: Conditional rendering. 
  // EntryForm is the child of both CreateEntry and UpdateEntry components.
  // Pass a prop from parent to indicate whether EntryForm should display as a form for creating or updating entry.
  // Then render EntryForm according to this prop.
  return (
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
        <Button type="primary" onClick={()=>{props.setNewEntryInput(entryInput)}}>Submit</Button>
        {/* onClick={createNewEntry(entryInput)} */}
      </Form.Item>
    </Form>
  );
};

export default EntryForm;