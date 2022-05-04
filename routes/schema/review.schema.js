const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    entryId: Schema.Types.ObjectId,     // refer to an entry's auto-generated id
    creator: String,                    // refer to an user's username
    content: String,
    rating: Number
}, {
    timestamps: true,
    collection: 'Review',
})

module.exports = ReviewSchema;