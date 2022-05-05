import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const entryInput = props.entryInput; // update mode: the entry's original data fetched from DB; create mode: {};
  const onSubmit = props.onSubmit; 
  // props.onSubmit is a function.
  // If parent component is UpdateEntry, props.onSubmit = updateEntry; 
  // else if parent component is CreateEntry, props.onSubmit = createNewEntry;


console.log("entryInput.hasBoarding: ", entryInput.hasBoarding);
  return (
    <Form form={form} layout="vertical" 
        initialValues={ props.mode === "update" ? {
            name: entryInput.name, 
            address: entryInput.address,
            // initialValues doesn't work for <Select> component
            description: entryInput.description,
            photo: entryInput.photo
        } : {} }
  >

  <h2 className="central-text">{props.mode === "update" ?  "Edit Entry": "Create New Entry"}</h2>
  <Form.Item label="Name" name="name"
      rules={[
          {
          required: true,
          whitespace: true,
          message: 'Please enter the name of the daycare!',
          },
      ]}> 
  <Input
      onChange={e => {entryInput.name = e.target.value;}}/>
  </Form.Item>

  <Form.Item label="Address" name="address"
      rules={[
          {
          required: true,
          whitespace: true,
          message: 'Please enter the address!',
          },
      ]}>
      <Input onChange={e => {entryInput.address = e.target.value}}/>
  </Form.Item>

  <Form.Item label="Has Grooming" name="hasGrooming"
      rules={[
      {
          required: true,
          message: 'Please select if the daycare has grooming.',
      },
      ]}>
      <Select defaultValue={ props.mode === "update" ? entryInput.hasGrooming : null} onSelect={value => {entryInput.hasGrooming = value}}>
      <Select.Option value={true}>Yes</Select.Option>
      <Select.Option value={false}>No</Select.Option>
      </Select>
  </Form.Item>

  <Form.Item label="Has Boarding" name="hasBoarding" 
      rules={[
          {
          required: true,
          message: 'Please select if the daycare has boarding.',
          },
      ]}>
      <Select defaultValue={ props.mode === "update" ? entryInput.hasBoarding : null} onSelect={value => {entryInput.hasBoarding = value}}>
      <Select.Option value={true}>Yes</Select.Option>
      <Select.Option value={false}>No</Select.Option>
      </Select>
  </Form.Item>

  <Form.Item label="Description" name="description">
      <Input.TextArea onChange={e => {entryInput.description = e.target.value}}/>
  </Form.Item>

  <Form.Item label="Photo" name="photo">
      <Input.TextArea onChange={e => {entryInput.photo = e.target.value}}/>
  </Form.Item>

  
  <Form.Item>
      <Button className="float-right" htmlType="submit" type="primary" onClick={()=>{
          onSubmit(entryInput)}}>Submit</Button>
  </Form.Item>
  </Form>
  );
};

export default EntryForm;