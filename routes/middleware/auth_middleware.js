const jwt = require('jsonwebtoken');

require("dotenv").config();
const COOKIE_KEY = process.env.COOKIE_KEY;

module.exports = function(req, res, next) {
    const token = req.cookies.token;
    console.log("auth_middlware: token: ", token);
    if (!token) {
        console.log("No token provided");
        res.status(401).send('Unauthorized: No token provided.');
    } else {
        // Decrypt the token
        jwt.verify(token, COOKIE_KEY, function(err, decoded) {
            // decoded: the decoded token object, which corresponds to the 
            // payload encrypted into the token at authentication phase.
            if (err) { // Decryption failed
                console.log("auth_middlware: jwt verify error!");
                res.status(401).send('Unauthorized: Invalid token.');
            } else {
                console.log("Decrypted username: ", decoded.username);
                // Store the decoded username to the request object, as a new attribute: username
                req.username = decoded.username;  //the decoded object, the payload: {username: xxxx}
                // Pass the request to the next middleware/route function
                next();
            }
        })
    }


}