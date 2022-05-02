const Schema = require('mongoose').Schema;

const EntrySchema = new Schema({
    // Description of what you want your data to look like
    creator: String,  // refer to a user's username
    name: String,
    address: String,
    hasBoarding: Boolean,    
    hasGrooming: Boolean, 
    description: String,
    photo: String       // image URL
}, {
    timestamps: true,   // Mongoose Will auto-generate createdAt and updatedAt timestamps
    collection: 'Entry' // Declare which collection we're using
})

module.exports = EntrySchema;