const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
   username: {
       type: String,
       unique: true   // enforce uniqueness constraint
   },
   password: String,
}, {
    // Declare which collection we're using
    collection: 'users',
})

module.exports = UserSchema;