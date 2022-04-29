const mongoose = require('mongoose');
const EntrySchema =require('../schema/entry.schema');

// Creating a model takes a schema as argument.
// mongoose.model() method makes a copy of what we defined on the schema, 
// and it also contains all Mongoose methods we will use to interact with MongoDB.
const EntryModel = mongoose.model("Entry", EntrySchema);

function createEntry(entry) {
    // Use the Model to insert a new home record into database.
    // Arg: home: is a Javascript object in code. Will be mapped to a record in database.
    // Return: A Promise object that either resolves with a database response(in this case, 
    // the newly created object), or rejects with an error.
    return EntryModel.create(entry);
}

// Query homes whose owner is the given username
function getEntriesByUsername(username) {
    return EntryModel.find({
        owner: username
    }).exec();
}

function getAllEntries() {
    return EntryModel.find().exec();
}

function getEntryById(id) {
    return EntryModel.findById(id).exec();
}

module.exports = {
    createEntry,
    getEntriesByUsername,
    getAllEntries,
    getEntryById
}