const express = require('express');
const router = express.Router();

const UserModel = require('./model/user.model');

const jwt = require('jsonwebtoken');
const auth_middleware = require('./middleware/auth_middleware');

// APIs for Register/Login/Authenticate

/** User Log-in Route */ 
router.post('/authenticate', function(request, response) {
    const username = request.body.username;
     // To ensure numerical password is also stored as string in db:   password + '', to convert to String
    // TODO:?? Confirm if this is needed
    const password = request.body.password + '';

    console.log("Before call getUserByUserName");

    return UserModel.getUserByUserName(username)
        .then(dbResponseUser => {
            // If the password of the same username in the database
            // is equal to the password entered by the user (coming from the request),
            // then we log the user in.
            console.log("dbResponseUser: ", dbResponseUser);
            console.log(dbResponseUser.password === password);
            console.log(dbResponseUser.password, typeof(dbResponseUser.password));
            console.log(password, typeof(password));
            if (dbResponseUser.password === password) {
                const payload = {username};
                // Encrypt the username and return a token
                const token = jwt.sign(payload, "SUPER_SECRET", {
                    expiresIn: '14d'   // optional cookie expiration date
                })
                console.log("Log-in Route: token: ", token);
                // Save the toekn into cookie, which will go along with all future requests 
                return response.cookie('token', token, {httpOnly: true})
                    .status(200).send({username})  //Notice we don't send back the password! Only the username!

            }
            console.log("Before returning Invalid Password")
            return response.status(401).send("Invalid Password!");
        })
        .catch(error => response.status(400).send(error));

})


router.get('/isLoggedin', auth_middleware, function(request, response){
    // If is currently logged in, request.username should not be empty, and
    // we'll send back the username with response.
    // Otherwise, request.username will be ??? TODO:???
    return response.status(200).send({username: request.username})
})


// TODO: Why is login/logout a POST request?
router.post('/logout', auth_middleware, function(request, response){
    // To remove cookie, just set the cookie "expiresIn" field to expire immediately,
    // and set the payload to be empty.
    const token = jwt.sign({}, "SUPER_SECRET", {
        expiresIn: '0d'
    });
    return response.cookie('token', token, {httpOnly: true})
        .status(200).send();    // Sending nothing back, since logged out.

})


router.get('/:username', function(request, response) {
    const userName = request.params.username;

    return UserModel.getUserByUserName(userName)
        .then(dbResponseUser => {
            if (!dbResponseUser) {
                return response.status(404).send("No user exists with that username")
            } else {
                return response.status(200).send(dbResponseUser);
            }
        })
        .catch(error => response.status(400).send(error));
})

/** User sign-up route, i.e. create a new user*/ 
router.post('/', function(request, response) {
    const username = request.body.username;
    const password = request.body.password;
        
    if (!username || !password) {
        return response.status(401).send("Missing username or password");
    }

    const user = {
        username,
        password
    }

    // Note that when signing up,
    // we also need to encrypt username, set the token in cookie, and send the cookie back with response.
    // <==> user is automatically logged-in after creating a new account, and can use
    // any user-specific features.
    return UserModel.createUser(user)
            .then(dbResponseUser => {
                const payload = {username};
                // Encrypt the username and return a token
                const token = jwt.sign(payload, "SUPER_SECRET", {
                    expiresIn: '14d'   // optional cookie expiration date
                })
                // Save the toekn into cookie, which will go along with all future requests 
                return response.cookie('token', token, {httpOnly: true})
                    .status(200).send({username})  //
            })
            .catch(error => response.status(400).send(error));





})

module.exports = router;


