import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { Form, Input, Button, Select } from 'antd';


function UpdateEntry() {
    const [form] = Form.useForm();
    const [entryInput, setEntryInput] = useState({});
    const navigate = useNavigate();
    console.log("UpdateEntry is rendered. entryInput: ", entryInput);

    const pathParams = useParams();

    useEffect(getCurrentEntryData, []);

    function getCurrentEntryData() {
        Axios.get('/api/entries/' + pathParams.entryId)
            .then(function(response) {
                form.setFieldsValue({
                    name: response.data.name,
                    address: response.data.address,
                    description: response.data.description,
                    image: response.data.image
                });
                setEntryInput(response.data);
            })
    }

    function updateEntry() {
        Axios.put('/api/entries/' + pathParams.entryId, {
            address: entryInput.address,
            name: entryInput.name,
            hasGrooming: entryInput.hasGrooming,
            hasBoarding: entryInput.hasBoarding,
            description: entryInput.description,
            image: entryInput.image
        })
            .then(function(response) {
                const responseEntryId = response.data; // backend sends back the entryId only
                console.log("UpdateEntry.js, successfully updated: ", responseEntryId);
                setEntryInput('');
                navigate('/entries/'+ responseEntryId);
            })
            .catch(function(error) {
                console.log("Update entry failed in UpdateEntry.js. Error: ", error.response.data);
            })
    }

    return (
        <Form form={form} layout="vertical"  labelCol={{span: 4,}} wrapperCol={{span: 16,}}
          initialValues={{hasBoarding: entryInput.hasBoarding}}
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
            onChange={e => setEntryInput({...entryInput, name: e.target.value})}/>
        </Form.Item>

        <Form.Item label="Address" name="address"
            rules={[
                {
                required: true,
                whitespace: true,
                message: 'Please enter the address!',
                },
            ]}>
            <Input onChange={e => setEntryInput({...entryInput, address: e.target.value})}/>
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
            <Select.Option key="true" value="true">Yes</Select.Option>
            <Select.Option key ="false" value="false">No</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
            <Input.TextArea onChange={e => setEntryInput({...entryInput, description: e.target.value})}/>
        </Form.Item>

        <Form.Item label="Photo" name="image">
            <Input.TextArea onChange={e => setEntryInput({...entryInput, photo: e.target.value})}/>
        </Form.Item>

        
        <Form.Item>
            <Button htmlType="submit" type="primary" onClick={updateEntry}>Submit</Button>
        </Form.Item>
        </Form>
    );

}

export default UpdateEntry;