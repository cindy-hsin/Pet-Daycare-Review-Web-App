const mongoose = require('mongoose');
const HomeSchema =require('../schema/home.schema');

// Creating a model takes a schema as argument.
// mongoose.model() method makes a copy of what we defined on the schema, 
// and it also contains all Mongoose methods we will use to interact with MongoDB.
const HomeModel = mongoose.model("Home", HomeSchema);

function createHome(home) {
    // Use the Model to insert a new home record into database.
    // Arg: home: is a Javascript object in code. Will be mapped to a record in database.
    // Return: A Promise object that either resolves with a database response(in this case, 
    // the newly created object), or rejects with an error.
    return HomeModel.create(home);
}

// Query homes whose owner is the given username
function getHomesByUsername(username) {
    return HomeModel.find({
        owner: username
    }).exec();
}

function getAllHomes() {
    return HomeModel.find().exec();
}

function getHomeById(id) {
    return HomeModel.findById(id).exec();
}

module.exports = {
    createHome,
    getHomesByUsername,
    getAllHomes,
    getHomeById
}