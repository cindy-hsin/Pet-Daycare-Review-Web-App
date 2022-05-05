import React, { useState } from 'react';
import Axios from 'axios';
import { Form, Input, Button, Rate}  from "antd";

export default function ReviewForm({
    //createReview,
    entryId,
    getAllReviewsForEntry,
    //reviewCreateForm
}) {
    const [reviewCreateForm] = Form.useForm();
    const [newReviewInput, setNewReviewInput] = useState({});
    console.log('ReviewForm rendered: newReviewInput: ',newReviewInput);

    function createReview(newReviewInput) {
        Axios.post('/api/entries/' + entryId + '/reviews', newReviewInput)
        .then(response => {
            console.log("ReviewArea.jsx: successfully create reviews: ", response.data);
            getAllReviewsForEntry();
            setNewReviewInput({});
            reviewCreateForm.resetFields();
        }).catch(error => {
            console.log("Create review failed in ReviewArea.js. Error: ", error.response.data);
        })

    }

    return (
        <div className="review-form">
            <Form form={reviewCreateForm}>
                <h2> Leave a review: </h2>

                <Form.Item label="Rating" name="rating"
                    rules={[
                        {
                        required: true,
                        message: 'Please select your rating!',
                        },
                    ]}>
                    <Rate allowHalf  onChange={value => {
                        setNewReviewInput({...newReviewInput, rating: value});
                    }}/>
                </Form.Item>

                <Form.Item label="Content" name="content"
                    rules={[
                        {
                        required: true,
                        whitespace: true,
                        message: 'Please enter your review content!',
                        },
                    ]}>
                    <Input.TextArea onChange={e => {
                        setNewReviewInput({...newReviewInput, content: e.target.value});
                    }}/>
                </Form.Item>

                <Form.Item>
                    <div className="buttons-wrapper">
                        <Button htmlType="submit" type="primary" onClick={()=>{
                            console.log("Before create, review: ", newReviewInput);
                            createReview(newReviewInput)
                            //TODO: Not Appropriate Here!
                        }}>Submit</Button>
                        <Button htmlType="button" onClick={()=>{
                            setNewReviewInput({});
                            reviewCreateForm.resetFields();
                        }}>Clear</Button>
                    </div>
                </Form.Item>
            </Form>

        </div>
    )
}