const express = require('express');
// import Mongoose Model:
const EntryModel = require('./model/entry.model');
const ReviewModel = require('./model/review.model');
const router = express.Router();
const auth_middleware = require('./middleware/auth_middleware');


/**
 * Get all entries (at Homepage), sorted from newest to oldest.
 */
router.get('/', function(request, response) {
    return EntryModel.getAllEntries()
        .then(dbResponseEntries => {
            response.status(200).send(dbResponseEntries);
        })
        .catch(error => {
            response.status(400).send(error);
        })
} )

/**
 * Get entry attributes (at Entry Detail Page).
 * @route : 'api/entries/:entryId'
 */
router.get('/:entryId', function(request, response) {
    const entryId = request.params.entryId;
    return EntryModel.getEntryById(entryId)
        .then(entry => {
            // When entryId is castable to db ObjectId (i.e. entryId is 
            // a string of 12 bytes or a string of 24 hex characters or an integer),
            // the Promise will resolve and get into then clause.
            if (!entry) {
                // When entryId is castable but no such id exists in db,
                // the Promise's resolved value "entry" will be null,
                // and will enter this if condition.
                response.status(404).send("No entry exists with entryId: " + entryId);
            } else {
                console.log("entry in getById method: ", entry);
                response.status(200).send(entry);
            }
        })
        .catch(error => {
            // When entryId is not castable, the Promise will reject
            // with value "error", which is an error object.
            // This error object will be sent with the response back to front end.
            // We can catch this error at front-end and print out error.response.data,
            // which will show the exact error message.
            response.status(400).send(error);
        })

})

/** Create-Entry route: needs user info("creator") when creating entry.
 *  So auth_middleware is needed.
 *  We can also do "app.use(auth_middleware)" in server.js before app.use(homeRoute or userRoute),
 *  but that will make all requests that match any routes to go through the auth_middleware,
 *  which is not necessary. We only need to know user info when creating home and getting home, but not
 *  when in other routes.
 */
// Use auth_middleware to decrypt the cookie token first, to get the info (e.g. username)
// of currently logged-in user, s.t. we can make operations based on the user info.

router.post('/', auth_middleware, function(request, response) {
    const {name, address, hasBoarding, hasGrooming} = request.body;

    console.log("hasBoarding: ", hasBoarding);
    console.log("hasGrooming: ", hasGrooming);
    // auth_middlware will have decrypted the username and added it to the request, as an attribute.
    const creator = request.username;

    const fieldCheckResult = checkEntryRequiredField(name, address, hasGrooming, hasBoarding);
    if (!fieldCheckResult.pass) {
        return response.status(400).send(fieldCheckResult.message);
    }

    const entry = request.body;
    entry.creator = creator;

    return EntryModel.createEntry(entry)
      .then(dbResponse => {
        console.log("response of createEntry: ", dbResponse);
        response.status(200).send(dbResponse);
      })
      .catch(error => {
        response.status(400).send(error);
      })

});

function checkEntryRequiredField(name, address, hasGrooming, hasBoarding) {
    const result = {pass: true, message: ""};
    if (!name) {
        result.pass = false;
        result.message += "Missing entry's name input."
    }
    if (!address) {
        result.pass = false;
        result.message += " Missing entry's address input.";
    }
    if (typeof(hasGrooming) === "undefined" || hasGrooming === null) {
        result.pass = false;
        result.message += " Missing entry's hasGrooming input.";
    }
    if (typeof(hasBoarding) === "undefined" || hasGrooming === null) {
        result.pass = false;
        result.message += " Missing entry's hasBoarding input.";
    }
    return result;   
}


router.put('/:entryId', function(request, response) {
    const entryId = request.params.entryId;
    const {name, address, hasGrooming, hasBoarding} = request.body;

    const fieldCheckResult = checkEntryRequiredField(name, address, hasGrooming, hasBoarding);
    if (!fieldCheckResult.pass) {
        return response.status(400).send(fieldCheckResult.message);
    }

    return EntryModel.updateEntryById(entryId, request.body)
        .then(dbResponse => {
            if (!dbResponse) {
                // When entryId is castable but no such id exists in db,
                // the Promise's resolved value "dbResponse" will be null,
                // and will enter this if condition.
                response.status(404).send("Failed to update entry. No entry exists with entryId: " + entryId);
            } else {
                console.log("response of updateEntryById: ", dbResponse);
                // NOTE! The returned dbResponse of findByIdAndUpdate method is the original object,
                // not the updated object!!
                response.status(200).send("Successfully updated entry: "+ dbResponse._id);
            } 
        }).catch(error => {
            response.status(400).send("Failed to update entry. "+ error);
        })
})


router.delete('/:entryId', function(request, response) {
    const entryId = request.params.entryId;
    return EntryModel.deleteEntryById(entryId)
        .then(dbResponse => {
            if (!dbResponse) {
                response.status(404).send("Failed to delete entry. No entry exists with entryId: " + entryId);
            } else {
                console.log("response of deleteEntryById: ", dbResponse);
                response.status(200).send("Successfully deleted entry: "+ dbResponse._id);
            }
        }).catch(error => {
            response.status(400).send("Failed to delete entry. " + error);
        })

})


/**
 * Get all reviews of a specific entry
 * @route : GET 'api/entries/:entryId/reviews'
 */
router.get('/:entryId/reviews', function(request, response) {
    const entryId = request.params.entryId;
    return ReviewModel.getReviewsByEntryId(entryId)
        .then(dbResponse => {
            console.log("response of getReviewsByEntryId", dbResponse);
            response.status(200).send(dbResponse);
        }).catch(error => {
            response.status(400).send(error);
        })

})

/**
 * Create a review for a specific entry
 * @route : POST 'api/entries/:entryId/reviews'
 */
router.post('/:entryId/reviews', auth_middleware, function(request, response) {
    const entryId = request.params.entryId;
    const creator = request.username;
    const {content, rating} = request.body;

    // Let's make content and rating required fields! TODO: Add "required toollip" at front-end.
    const fieldCheckResult = checkReviewRequiredField(content, rating);
    if (!fieldCheckResult.pass) {
        return response.status(400).send(fieldCheckResult.message);
    }

    const review = {entryId, creator, content, rating};

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            console.log("response of createReview", dbResponse);
            response.status(200).send(dbResponse);
        }).catch(error => {
            response.status(400).send(error);
        })
})


function checkReviewRequiredField(content, rating) {
    const result = {pass: true, message: ""};
    if (!content) {
        result.pass = false;
        result.message += "Missing reivew's content input."
    }
    if (typeof(rating) === "undefined" || rating === null) {
        result.pass = false;
        result.message += " Missing reivew's rating input.";
    }
    return result;   
}

/**
 *  Update a review
 *  @route : PUT 'api/entries/:entryId/reviews/:reviewId'
 */
router.put('/:entryId/reviews/:reviewId', function(request, response) {
    const reviewId = request.params.reviewId;
    const {content, rating} = request.body;

    const fieldCheckResult = checkReviewRequiredField(content, rating);
    if (!fieldCheckResult.pass) {
        return response.status(400).send(fieldCheckResult.message);
    }

    return ReviewModel.updateReviewById(reviewId, request.body)
        .then(dbResponse => {
            if (!dbResponse) {
                response.status(404).send("Failed to review entry. No review exists with reviewId: " + reviewId);
            } else {
                console.log("response of updateReviewById: ", dbResponse);
                // NOTE! The returned dbResponse of findByIdAndUpdate method is the original object,
                // not the updated object!!
                response.status(200).send("Succesfully updated review: "+ dbResponse._id);
            }
        }).catch(error => {
            response.status(400).send("Failed to update review. "+ error);
        })
})

/**
 * Delete a review
 * @route : PUT 'api/entries/:entryId/reviews/:reviewId'
 */
router.delete('/:entryId/reviews/:reviewId', function(request, response) {
    const reviewId = request.params.reviewId;
    return ReviewModel.deleteReviewById(reviewId)
        .then(dbResponse => {
            if (!dbResponse) {
                response.status(404).send("Failed to delete review. No review exists with reviewId: " + reviewId);
            } else {
                console.log("response of deleteReviewById: ", dbResponse);;
                response.status(200).send("Successfully deleted entry: "+ dbResponse._id);
            }
        }).catch(error => {
            response.status(400).send(error);
        })
})

module.exports = router;
