const express = require('express');
// import Mongoose Model:
const HomeModel = require('./model/home.model');
const router = express.Router();
const auth_middleware = require('./middleware/auth_middleware');

// This in-memory list is NOT used anymore after using MongoDB to store data.
// const homes = [
//     {
//         id: 1, 
//         address: '2222 Evil St',
//         roomCount: 10,
//     },
//     {
//         id: 2,
//         address: '444 Cape Cod, Boston',
//         roomCount: 4,
//     },
//     {
//         id: 3,
//         address: '1234 USA Town',
//         roomCount: 7,
//     }
// ];


/** Get homes that are owned by the current logged-in user. */
router.get('/', auth_middleware, function(request, response) {

    // const minRoomCount = request.query.minRoomCount;
    // if (minRoomCount) {
    //     const roomCountHomes = [];
    //     for (let i = 0; i < homes.length; i++) {
    //         if (homes[i].roomCount >= parseInt(minRoomCount)) {
    //             roomCountHomes.push(homes[i]);
    //         } 
    //     }
        
    //     response.status(200).send(roomCountHomes);

    // } else {
    //     response.status(200).send(homes);
    // }

    const username = request.username;
    return HomeModel.getHomesByUsername(username)
        .then(dbResponseHomes => {
            response.status(200).send(dbResponseHomes);
        })
        .catch(error => {
            response.status(400).send(error);
        })

})

router.get('/:homeId', function(request, response) {

    // const homeId = request.params.homeId;

    // for(let i = 0; i < homes.length; i++) {
    //     if (homes[i].id === parseInt(homeId)) {
    //         response.status(200).send(homes[i]);
    //         return;
    //     }
    // }

    // return response.status(404).send('No home matches ID = ' + homeId);
    const homeId = request.params.homeId;
    console.log("HomeId: ", homeId);

    return HomeModel.getHomeById(homeId)
        .then(home => {
            // When homeId is castable to db ObjectId (i.e. homeId is 
            // a string of 12 bytes or a string of 24 hex characters or an integer),
            // the Promise will resolve and get into then clause.
            if (!home) {
                // When homeId is castable but no such id exists in db,
                // the Promise's resolved value "home" will be null,
                // and will enter this if condition.
                response.status(404).send("No home exists with that Id");
            } else {
                console.log("home in getById method: ", home);
                response.status(200).send(home);
            }
        })
        .catch(error => {
            // When homeId is not castable, the Promise will reject
            // with value "error", which is an error object.
            // This error object will be sent with the response back to front end.
            // We can catch this error at front-end and print out error.response.data,
            // which will show the exact error message.
            console.log(typeof(error));
            response.status(400).send(error)
        })

})


/** Create-Home route: needs user info("owner") when creating home.
 *  So auth_middleware is needed.
 *  We can also do "app.use(auth_middleware)" in server.js before app.use(homeRoute or userRoute),
 *  but that will make all requests that match any routes to go through the auth_middleware,
 *  which is not necessary. We only need to know user info when creating home and getting home, but not
 *  when in other routes.
 */
// Use auth_middleware to decrypt the cookie token first, to get the info (e.g. username)
// of currently logged-in user, s.t. we can make operations based on the user info.
router.post('/', auth_middleware, function(request, response) {
    const homeAddress = request.body.address;
    // auth_middlware will have decrypt the username and add it to the request, as an attribute.
    const username = request.username;

    if (!homeAddress) {
        response.status(401).send("Missing home address argument");
    }

    // Mongo will auto-generate id for us!!
    // const newestHome = homes[homes.length - 1];
    // const nextHomeId = newestHome.id + 1;   
    const home = {
        owner: username,
        address: homeAddress,  
    }

    // NOTE: Mongoose Model is different from Java Dao. 
    // It doesn't return the object direcly
    // Instead it returns a Promise, which will either resolves with a data base response,
    // or rejects with an error.

    return HomeModel.createHome(home)
      .then(dbResponse => {
        console.log("response of createHome: ", dbResponse);
        response.status(200).send(dbResponse);
      })
      .catch(error => {
        response.status(400).send(error);
      })

    //  homes.push({
    //     address: homeAddress,  
    //     id: nextHomeId
    // })
    // response.status(200).send(homes[homes.length - 1]);

});

module.exports = router;