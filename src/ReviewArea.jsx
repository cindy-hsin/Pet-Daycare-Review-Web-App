import React from 'react';
import { useEffect, useState} from 'react';
import Axios from 'axios';
import ReviewForm from './ReviewForm'

export default function ReviewArea({
    username,
    entryId
}) {
    const [reviews, setReviews] = useState(null);

    useEffect(getAllReviewsForEntry,[]); // TODO: Add condition



    function getAllReviewsForEntry(){
        console.log("getAllReviewsForEntry called");
        Axios.get('/api/entries/' + entryId + '/reviews')
            .then(response => {
                console.log("ReviewArea.jsx: successfully get reviews: ", response.data);
                setReviews(response.data);
            }).catch(function(error) {
                console.log("Get reviews failed in ReviewArea.js. Error: ", error.response.data);
            })
    }





    return (
        <div> Review Area <br/>
            {username && <ReviewForm />}

            <br/>
            {reviews && reviews.map(review => (
                <div>{review.content}.....Submitted by {review.creator}</div>
            )
            )}

            

        </div>
    )


}