const Schema = require('mongoose').Schema;

const HomeSchema = new Schema({
    // Description of what you want your data to look like
    address: String,
    roomCount: Number,  // shorthand for: roomCount: {type: Number}
    owner: String,
    builtDate: {
        type: Date,
        default: Date.now
    }
}, {
    // Declare which collection we're using
    collection: 'home',
})

module.exports = HomeSchema;