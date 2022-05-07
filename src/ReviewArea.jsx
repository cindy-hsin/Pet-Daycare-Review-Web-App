import React from 'react';
import { useEffect, useState} from 'react';
import Axios from 'axios';
import ReviewForm from './ReviewForm';
import Review from './Review';
import { Modal } from 'antd';


export default function ReviewArea({
    loginUsername,
    entryId,
    getAverageRating
}) {
    const [reviews, setReviews] = useState(null);
    const [selectedEditReviewId, setSelectedEditReviewId] = useState(null);
    const [selectedDeleteReviewId, setSelectedDeleteReviewId] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    
    console.log("ReviewArea rendered, reviews: ", reviews, "selectedEditReviewId: ", selectedEditReviewId, 
    "selectedDeleteReviewId: ", selectedDeleteReviewId, "deleteModalVisiable: ", deleteModalVisible);

    useEffect(getAllReviewsForEntry,[]);
    useEffect(getAverageRating, [reviews]); // update average rating

    function getAllReviewsForEntry(){
        Axios.get('/api/entries/' + entryId + '/reviews')
        .then(response => {
            console.log("ReviewArea.jsx: successfully get reviews: ", response.data);
            setReviews(response.data);
        }).catch(function(error) {
            console.log("Get reviews failed in ReviewArea.js. Error: ", error.response.data);
        })
    }


    function updateReview(reviewId, newReview) {
        Axios.put('/api/entries/'+ entryId + '/reviews/' + reviewId, {
            content: newReview.content,
            rating: newReview.rating
        }).then(response => {
            console.log("ReviewArea.jsx: successfully update review: ", response.data);
            setSelectedEditReviewId(null);
            getAllReviewsForEntry();
        }).catch(function(error) {
            console.log("Update review failed in ReviewArea.js. Error: ", error.response.data);
        })
    }


    function deleteReview(reviewId) {
        Axios.delete('/api/entries/' + entryId + '/reviews/' + reviewId)
        .then(response => {
            console.log("ReviewArea.jsx: successfully delete review: ", response.data);
            setSelectedDeleteReviewId(null);
            getAllReviewsForEntry();
        })
        .catch(error => {console.log("Delete review failed in ReviewArea.js. Error: ", error.response.data);})
    }

    return (
        <div className="review-area"> 
            {loginUsername && <ReviewForm entryId={entryId} getAllReviewsForEntry={getAllReviewsForEntry}/>} 
            
            {reviews && <p>{reviews.length} Reviews</p> }
            {reviews && (
                reviews.map((review,index) => (
                        <Review 
                            review={review} 
                            key={index} 
                            index={index}
                            loginUsername={loginUsername}
                            updateReview={updateReview}
                            selectedEditReviewId={selectedEditReviewId}
                            setSelectedEditReviewId={setSelectedEditReviewId} 
                            setSelectedDeleteReviewId={setSelectedDeleteReviewId}
                            setDeleteModalVisible={setDeleteModalVisible}
                            >
                        </Review>
                ))          
            )}


            <Modal title="Delete Review" visible={deleteModalVisible} 
                onOk={()=>{
                    setDeleteModalVisible(false);
                    deleteReview(selectedDeleteReviewId);
                }} 
                onCancel={()=>{setDeleteModalVisible(false)}}>
                <p>Are you sure you want to delete this comment?</p>
            </Modal>

        </div>
    )


}