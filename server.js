const express = require('express');
const app = express();

const path = require('path');
// Mongoose: the Object-Relational-Model(ORM) that interacts with the databse layer from app layer.
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const entryRoute = require('./routes/entry');
const userRoute = require('./routes/user');

 // To import the mongoURI in dev environment.
require('dotenv').config();    

/** MongoDB Connection */
// The default address for MongoDB   
const mongooseEndpoint = process.env.MONGODB_URI;

// userNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongooseEndpoint, { useNewUrlParser: true });
// Get the connection string
const db = mongoose.connection;
// This creates the connection, and throw an error if it doesn't work.
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


/** Use a middleware called static.
 *  This middleware uses disk to read files and serve the file's contents,
 *  which is the React code in our case.
 */ 
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**In this single-server app, we're serving front-end React
 * in Node/Express server. So front-end and back-end are
 * now run in the same domain(localhost:8000). --> When deployed! (npm run build, npm run start) NOTE that cors is still needed a dev phase. See README.md.
 * (Unlike in pokemon app, we run Node/Express backend at localhost:8000,
 * and run React front-end at on separate server at localhost:3000)
 * So there's no longer Cross-Origin problem when making http request from
 * front-end to back-end. Thus we don't need 'cors' library any more after deployment.
 * 
 * This single-server architecture is for the sake of using Cookies.
 * Cookies will be difficult to implement if front-end and back-end
 * are separted in different domian.
 */

/** 'cors' in single-server app is not needed at deploy phase, but needed at dev phase. */
if (process.env.NODE_ENV === "development") {
    const cors = require('cors');
    app.use(cors({
        origin: '*'
    }))
}


/** Be sure to use the cookie-parser before the routes! */
app.use(cookieParser());

// send request to user Router
app.use('/api/users', userRoute);
// send request to entry Router
app.use('/api/entries', entryRoute);


/** When the incoming request doesn't match any previous routes,i.e. '/api/home',
 *  the request is intercepted by this route, which sends back a file(i.e. React code)
 *  as response. So when client access any URL other than /api/home, the browser
 *  will display the React front-end.
 *  Then the react router will handle the front-end routes for us
*/
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(process.env.PORT || 8000 , () => {console.log("App is live!")});
