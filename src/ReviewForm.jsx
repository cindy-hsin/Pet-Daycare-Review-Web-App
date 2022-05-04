import React, { useState } from 'react';
import { Form, Input, Button, Rate}  from "antd";

export default function ReviewForm({
    createReview,
    reviewCreateForm
}) {
    // const [reviewCreateForm] = Form.useForm();
    const [newReview, setNewReview] = useState({});

    return (

        <div>
            <Form form={reviewCreateForm}>
                <Form.Item label="Content" name="content"
                    rules={[
                        {
                        required: true,
                        whitespace: true,
                        message: 'Please enter your review content!',
                        },
                    ]}>
                    <Input.TextArea onChange={e => {
                        setNewReview({...newReview, content: e.target.value});
                    }}/>
                </Form.Item>

                <Form.Item label="Rating" name="rating"
                    rules={[
                        {
                        required: true,
                        message: 'Please select your rating!',
                        },
                    ]}>
                    <Rate allowHalf defaultValue={0} onChange={value => {
                        setNewReview({...newReview, rating: value});
                    }}/>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary" onClick={()=>{
                        console.log("Before create, review: ", newReview);
                        createReview(newReview)
                    }}>Submit</Button>
                    <Button htmlType="button" onClick={()=>{
                        reviewCreateForm.resetFields();
                    }}>Clear</Button>
                </Form.Item>
            </Form>

        </div>
    )
}