import React, { useEffect, useState } from "react";
import defaultAvatar from "./assets/defaultUserAvatar.png";
import { Avatar, Form, Input, Button, Rate}  from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import moment from 'moment';
import Axios from 'axios';

export default function Review({
    review,
    index,
    loginUsername,
    updateReview,
    selectedEditReviewId,
    setSelectedEditReviewId,
    setSelectedDeleteReviewId,
    setDeleteModalVisible,
}) { 
    const [reviewEditForm] = Form.useForm();
    const [newReviewInput, setNewReviewInput] = useState(review);
    const [creatorAvatar, setCreatorAvatar] = useState(null);
    
    
    useEffect(()=>{
        setNewReviewInput(review);
        reviewEditForm.setFieldsValue({
            content: review.content,
            rating: review.rating
        })}, [review])  // VERY IMPORTANT!! 
        /**
            Without this useEffect, "newReviewInput" won't be updated to the new review.
            Scenario: After updating or deleting a review,
            the order of reviews array changed. 
            By calling getAllReviewsForEntry() in updateReview and deleteReview functions (in ReviewArea.jsx),
            the state "reviews" array in ReviewArea gets updated, and therefore when 
            rendering the list of <Review> components, a new review props is passed into each <Review> and the new review gets rendered.
            But newReviewInput remains the original value, so if we click "edit" button, and then directly click "Update" 
            without doing anything to the input area, the submitted value will be the original "newReviewInput",
            instead of the newly passed-in review, which is wrong.
         */

    useEffect(()=> {
        getCreatorAvatar(review.creator)
    }, [review]);


    function getCreatorAvatar(creator) {
        console.log("creator: ", creator);
        Axios.get('/api/users/' + creator)
            .then(response => {
                console.log("Review.jsx: successfully get entry creator avatar: ", response.data);
                setCreatorAvatar(response.data.avatar)
            }).catch(
                error => {console.log("Review.js: Get entry creator avatar failed. Error:", error.response.data)}
            )
    }

        
    return (
        <div className="single-review-container">
            <div className="two-cols no-vertical-margin">
                <div>
                    <Avatar size="large" src={creatorAvatar ? creatorAvatar : defaultAvatar}/>
                    &nbsp;
                    <b>{review.creator}</b>
                </div>

                {review._id !== selectedEditReviewId && window.innerWidth > 414 && (
                    <p className="timestamp">
                        {moment(review.updatedAt).format('MMMM Do YYYY, h:mm a')}
                    </p>
                )}               
            </div>

            {review._id !== selectedEditReviewId && window.innerWidth <= 414 && (
                <p className="timestamp no-vertical-margin" >
                    {moment(review.updatedAt).format('MMMM Do YYYY, h:mm a')}
                </p>
            )}  

            
            {review._id === selectedEditReviewId ? (
                <Form form={reviewEditForm} initialValues={{
                    content: review.content,
                    rating: review.rating}}>

                    <Form.Item label="Rating" name="rating"
                        rules={[
                            {
                            required: true,
                            message: 'Please select your rating!',
                            },
                        ]}>
                        <Rate allowHalf onChange={value => {
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
                            console.log("setNewReviewInput called");
                            }}/>
                    </Form.Item>

                    <Form.Item>
                        <div className="buttons-wrapper">
                            <Button htmlType="submit" type="primary" onClick={()=>{
                                updateReview(review._id, newReviewInput)
                            }}>Update Review</Button>
                            <Button htmlType="button" onClick={()=>{
                                setSelectedEditReviewId(null)
                            }}>Cancel</Button>
                        </div>
                    </Form.Item>
                </Form>
            ) :  (
                <div>
                    <Rate disabled allowHalf value={review.rating}
                        className="review-rating"/>
                    {window.innerWidth > 400 ? (
                        <span> &nbsp; &nbsp;{review.content}</span>
                        ) : (
                        <div>{review.content}</div>
                        )
                    }
                    
                </div>
            )}
            

            {review._id !== selectedEditReviewId && (
                <>
                    {review.creator === loginUsername && (
                        <div className="two-cols no-vertical-margin">
                            <div></div>
                            <div className="buttons-wrapper">
                                <EditTwoTone onClick={()=>{
                                    setSelectedEditReviewId(review._id);
                                }}/>
                                <DeleteTwoTone twoToneColor="red" onClick={()=>{
                                    setSelectedDeleteReviewId(review._id);
                                    setDeleteModalVisible(true);
                                }}/>
                            </div>
                        </div>
                    )}
                </>
            )}


        </div>



    )
 

}