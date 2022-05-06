const express = require('express');
const router = express.Router();

const UserModel = require('./model/user.model');

const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs');      // Encrypt password when register, decrypt when authenticate.
const auth_middleware = require('./middleware/auth_middleware');

require("dotenv").config();
const COOKIE_KEY = process.env.COOKIE_KEY;

// APIs for Register/Login/Authenticate

/** User Log-in Route */ 
router.post('/authenticate', function(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    if (!username || !password) {
        return response.status(400).send("Missing username or password!");
    }

    return UserModel.getUserByUserName(username)
        .then(dbResponseUser => {
            // If username doesn't exist in database, the returned dbResponseUser will be null.
            if (!dbResponseUser) {
                return response.status(400).send("Username doesn't exist!");
            }
            // If the password of the same username in the database
            // is equal to the password entered by the user (coming from the request),
            // then we log the user in.
            if (bcrypt.compareSync(password, dbResponseUser.password)) {
                const payload = {username};
                // Encrypt the username and return a token
                const token = jwt.sign(payload, COOKIE_KEY, {
                    expiresIn: '14d'   // optional cookie expiration date
                })
                console.log("Log-in Route: token: ", token);
                // Save the toekn into cookie, which will go along with all future requests 
                return response.cookie('token', token, {httpOnly: true})
                    .status(200).send({username})  //Notice we don't send back the password! Only the username!

            }
            return response.status(401).send("Invalid Password!");
        })
        .catch(error => {
            console.log("error in router: ", error);
            return response.status(408).send(error)});

})


router.get('/isLoggedin', auth_middleware, function(request, response){
    // If is currently logged in, request.username should not be empty, and
    // we'll send back the username with response.
    // Otherwise, in auth_middlware, a 401 response will be sent back to front-end, and will not come to the logic here.
    const decodedUsername = request.username;

    // Get the user's avatar from DB
    return UserModel.getUserByUserName(decodedUsername)
        .then(dbResponseUser => {
            return response.status(200).send({
                username: decodedUsername,
                avatar: dbResponseUser.avatar})
        }).catch(error => {            
            response.status(400).send("Failed to get user's username and avatar from database")})
})


// NOTE: Logout is a POST request! (Ref: https://stackoverflow.com/a/14587231/17803072)
router.post('/logout', auth_middleware, function(request, response){
    // To remove cookie, just set the cookie "expiresIn" field to expire immediately,
    // and set the payload to be empty.
    const token = jwt.sign({}, COOKIE_KEY, {
        expiresIn: '0d'
    });
    return response.cookie('token', token, {httpOnly: true})
        .status(200).send();    // Sending nothing back, since logged out.

})


router.get('/:username', function(request, response) {
    console.log("!!!!!")
    const userName = request.params.username;

    return UserModel.getUserByUserName(userName)
        .then(dbResponseUser => {
            if (!dbResponseUser) {
                return response.status(404).send("No user exists with that username")
            } else {
                console.log("IN user.js, successfully get user object: ", dbResponseUser)
                return response.status(200).send(dbResponseUser);
            }
        })
        .catch(error => response.status(400).send(error));
})

/** User sign-up route, i.e. create a new user*/ 
router.post('/', function(request, response) {        
    if (!request.body.username || !request.body.password) {
        return response.status(400).send("Missing username or password");
    }

    request.body.password = bcrypt.hashSync(request.body.password, 10);   // Encrypt password

    const user = request.body;

    // Note that when signing up,
    // we also need to encrypt username, set the token in cookie, and send the cookie back with response.
    // <==> user is automatically logged-in after creating a new account, and can use
    // any user-specific features.
    return UserModel.createUser(user)
            .then(dbResponseUser => {
                const payload = {username: request.body.username};
                // Encrypt the username and return a token
                const token = jwt.sign(payload, COOKIE_KEY, {
                    expiresIn: '14d'   // optional cookie expiration date
                })
                // Save the toekn into cookie, which will go along with all future requests 
                return response.cookie('token', token, {httpOnly: true})
                    .status(200).send({username: request.body.username})
            })
            .catch(error => {
                if (error.name ==="MongoServerError" && error.code === 11000) {
                    // NOTE: error code 11000 stands for duplicate key error (violates uniqueness contraint defined in the schema)
                    return response.status(400).send(`Username ${request.body.username} is already used!`);
                } else {
                    return response.status(400).send(error)
                }
            });
})

module.exports = router;


