import React, { useState } from "react";
import defaultAvatar from "./assets/defaultUserAvatar.png";
import { Avatar, Form, Input, Button, Rate}  from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";


export default function Review({
    review,
    index,
    loginUsername,
    updateReview,
    selectedEditReviewId,
    setSelectedEditReviewId,
    setSelectedDeleteReviewId,
    setDeleteModalVisible
}) {
    console.log('Review ' + index + ' rendered. newReview: ' , review);
    const [reviewEditForm] = Form.useForm();
    const [newReview, setNewReview] = useState(review);


    return (
        <div >
            <div>
                <Avatar size="large" src={/**TODO: get creator's avatar.Try using 'ref' in schema?>*/ defaultAvatar}/>
                <span><b>{review.creator}</b></span>
                <span><Rate value={review.rating}/></span>
            </div>

            <div>
                {review._id === selectedEditReviewId ? (
                    <Form form={reviewEditForm} initialValues={{content: review.content}}>
                        <Form.Item name="content">
                            <Input.TextArea onChange={e => {
                                setNewReview({...newReview, content: e.target.value});
                                console.log("setNewReview called");
                                }}/>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" type="primary" onClick={()=>{
                                updateReview(review._id, newReview)
                            }}>Update Review</Button>
                            <Button htmlType="button" onClick={()=>{
                                setSelectedEditReviewId(null)
                            }}>Cancel</Button>
                        </Form.Item>
                    </Form>
                ) :  (
                    review.content
                )}
            </div>

            <div>
                {review._id !== selectedEditReviewId && (
                    <>
                        {review.creator === loginUsername && (
                            <div>
                                <EditTwoTone onClick={()=>{
                                    setSelectedEditReviewId(review._id);
                                    // setInitialValues(review);    // TODO: ??? WHY need this? 
                                }}/>
                                <DeleteTwoTone twoToneColor="red" onClick={()=>{
                                    setSelectedDeleteReviewId(review._id);
                                    setDeleteModalVisible(true);
                                }}/>
                            </div>
                        )}
                        
                    
                    </>

                )}
            </div>

        </div>



    )
 

}