const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
   username: {
       type: String,
       unique: true   // enforce uniqueness constraint
   },
   password: String,
   avatar: String
}, {
    // Declare which collection we're using
    collection: 'User',
})

module.exports = UserSchema;