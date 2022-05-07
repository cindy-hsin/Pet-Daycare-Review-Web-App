const mongoose = require('mongoose');
const EntrySchema =require('../schema/entry.schema');

const EntryModel = mongoose.model("Entry", EntrySchema);


/**
 *  Use the Model to insert a new home record into database.
    Arg: home: is a Javascript object in code. Will be mapped to a record in database.
    Return: A Promise object that either resolves with a database response(in this case, 
    the newly created object), or rejects with an error.
 */
function createEntry(entry) {
    return EntryModel.create(entry);
}

/**
 * @returns All entries sorted by updatedAt, from newest to oldest.
 */
function getAllEntries() {
    return EntryModel.find().sort({updatedAt: 'desc'}).exec();
}

function getEntryById(id) {
    return EntryModel.findById(id).exec();
}

/**
 * @param {*} entryId : entryId
 * @param {*} updateOfEntry : object consisting of fields and values to be updated
 */
function updateEntryById(entryId, updateOfEntry) {
    return EntryModel.findByIdAndUpdate(entryId, updateOfEntry).exec();
    // findByIdAndUpdate: Finds a matching document, updates it according to the update arg, 
    // passing any options, and returns the found document (if any) to the callback. The query executes if callback is passed.
    // shorhand for findOneAndUpdate({_id: id}, updateOfEntry);
}

function deleteEntryById(entryId) {
    return EntryModel.findByIdAndDelete(entryId).exec();
}

module.exports = {
    createEntry,
    getAllEntries,
    getEntryById,
    updateEntryById,
    deleteEntryById
}