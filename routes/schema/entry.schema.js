const Schema = require('mongoose').Schema;

const EntrySchema = new Schema({
    // Description of what you want your data to look like
    name: String,
    address: String,
    hasBoarding: String,
    hasGrooming: String,
    description: String,
    photo: String,
    builtDate: {
        type: Date,
        default: Date.now
    }
}, {
    // Declare which collection we're using
    collection: 'entry',
})

module.exports = EntrySchema;