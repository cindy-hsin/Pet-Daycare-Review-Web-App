const mongoose = require('mongoose');
const ReviewSchema =require('../schema/review.schema');

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

/**
 * @param {*} entryId 
 * @returns All reviews of the entryId, sorted by updatedAt, from oldest to newest.
 */
function getReviewsByEntryId(entryId) {
    return ReviewModel.find({entryId: entryId}).sort({updatedAt: 'asc'}).exec();
}

function updateReviewById(reviewId, updateOfReview) {
    return ReviewModel.findByIdAndUpdate(reviewId, updateOfReview).exec();
}

function deleteReviewById(reviewId) {
    return ReviewModel.findByIdAndDelete(reviewId).exec();
}

function deleteAllReivewByEntryId(entryId) {
    return ReviewModel.deleteMany({entryId: entryId})
}

module.exports = {
    createReview,
    getReviewsByEntryId,
    updateReviewById,
    deleteReviewById,
    deleteAllReivewByEntryId
}