import React, {useState} from 'react';
import { Form, Input, Button, Select } from 'antd';

const EntryForm = (props) => {
  const [form] = Form.useForm();
  const entryInput = props.entryInput;
  const updateEntry = props.updateEntry;


console.log("entryInput.hasBoarding: ", entryInput.hasBoarding);
  return (
    <Form form={form} layout="vertical"  labelCol={{span: 4,}} wrapperCol={{span: 16,}}
        initialValues={{
            name: entryInput.name, 
            address: entryInput.address,
            // initialValues doesn't work for <Select> component
            description: entryInput.description,
            image: entryInput.image
        }}
  >

  <h2>Edit Entry</h2>
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
      <Select defaultValue={entryInput.hasGrooming} onSelect={value => {entryInput.hasGrooming = value}}>
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
      <Select defaultValue={entryInput.hasBoarding} onSelect={value => {entryInput.hasBoarding = value}}>
      <Select.Option value={true}>Yes</Select.Option>
      <Select.Option value={false}>No</Select.Option>
      </Select>
  </Form.Item>

  <Form.Item label="Description" name="description">
      <Input.TextArea onChange={e => {entryInput.description = e.target.value}}/>
  </Form.Item>

  <Form.Item label="Image" name="image">
      <Input.TextArea onChange={e => {entryInput.image = e.target.value}}/>
  </Form.Item>

  
  <Form.Item>
      <Button htmlType="submit" type="primary" onClick={()=>{updateEntry(entryInput)}}>Submit</Button>
  </Form.Item>
  </Form>
  );
};

export default EntryForm;