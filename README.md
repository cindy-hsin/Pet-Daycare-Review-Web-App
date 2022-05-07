Write-up Summary: 

Team members: Yiyu  Tian, ChuanHsin Chen
Repo link: https://github.com/cindy-hsin/Yiyu-Tian-ChuanHsin-Chen-Project3
Heroku link: https://dog-daycare-app.herokuapp.com/

## Information for testing APP:
Here are some of the existing user info in our database. Feel free to try logging in with these usernames and passwords.
* username: testUser, password: testUser
* username: avatarUser, password: avatarUser
* username: happy, password: happy 

## What were some challenges you faced while making this app?
1. Design of Mongo Schema. Since Entry and Review has a "one-to-many" relationship, we struggled about 
   whether to store a reference to the Entry's id in each Review record,
   or to embed the Review records in each Entry record. 
   To simplify the implementation at database layer, we chose the former one, but this added more work to the
   application layer. One of the expected features of the app is that when deleting an Entry, all of its associated Reviews should also be deleted from the database.
   Since we didn't choose the "embedding pattern", the Reviews will not be automatically deleted in the DB layer, and instead we need to manually call 
   Review model's method to delete the reviews in the backend. (See entry.js, router.delete('/:entryId') part.)

   Similarly, each Entry and Review needs to have a reference to its creator, i.e. a User record, so that we can render the user's avatar image. 
   Currently, we also stored the username of the User as a reference in each Entry and Review. But the disadvantage is that when making an API call to get 
   the Entry or Review object to the front-end, the avatar attribute cannot be accessed directly from the Entry/Review object. Instead, we need to make another API call
   with the previously obtained username to get the avatar. This has increased the Http request load.

2. Design of React component and re-render logic. Since the Entry page allows edit and delete operation on Reviews, the parent component: ReviewArea needs to be 
   automatically re-rendered after each child component: Review gets updated or deleted. Also, when a Review is selected to be updated, the content

3. Getting familiar with Form. In this project, we used "atnd" 3rd-party library for UI. Both Entry and Review creation/updating relies heavily on the use of Form component.
   The hardest part was filling the Review form with original content when doing update operation, and clearing the Review form after creating one. It's also importnat to maintain the consistency between 
   the content displayed on the UI and the underlying React state(e.g. See ReviewForm.jsx, createReview function, where we need to do both `setNewReviewInput({})` and `reviewCreateForm.resetFields()`.

4. Understanding how the frontend and the backend are connected, the user authentication logic using jwt and browser cookie.

5. How process.env works under development and deployment environment, and how to use the .env file to hide secret information(e.g. MongoDB URI, cookie key).

6. Adding customized styles to components of "atnd" 3rd-party UI library.



## Given more time, what additional features, functional or design changes would you make？
1. Try a different database design to 1) reduce the number of API calls in front-end, 2) reduce the amount of extra operation in back-end routers, 3) improve the performance of database lookup operation.
2. Improve the designn of React component state and rendering logic to reduce unnecessary re-rendering.
3. Implement the bonus point feature: A search bar on the Home page to search Entry by keywords
4. Improve the Navbar UI. Currently, all menu items on the Navbar are aligned to left when displaying on larger screen. This is the default behavior of "antd" <Menu> component and was not easy to change.
   We may try to write a custom Navbar or use a different library.

## What assumptions did you make while working on this assignment?
1. Design choices:
* We assume that the Entries on Home page and Reviews on Entry page are sorted by "updatedAt" timestamp. The displayed timestamps on UI are also the "updatedAt" timestamp. Notice that in our database,
   the Entry and Review schema have both "createdAt" and "updatedAt" timestamp, but it's our design choice to use the latter.
* The link back to Home page is by clicking at the app logo on the Navbar, instead of a specific "Home" menu option. Also,the logout button is at the dropdown of the "user avatar" menu option.
* We assume that the users won’t upload images from their local disc, and that the image URL submitted by the user is a valid source of image.
2. We assume the cloud database is stable. 

 
## How long did this assignment take to complete?
A week.

---


In single-server app, React code are served by Node/Express back-end server.

After creating React app using "npx create-react-app":
1. Create a server.js and routers folder(including home.js), which includes express routes logic that serves both http requests annd static files(i.e. React code).
    
2. npm i -s express axios react-router-dom: to install dependencies
3. npm i --save-dev concurrently nodemon cors: to install devDependencies
4. Modify the package.json that's auto-generated by "npx create-react-app": 
    * in "scripts":
        * "start": "react-script start" --> "start": "node server.js"
        * Add "devStart": "devstart": "concurrently \"nodemon ./server.js\" \"react-scripts start\"", to run backend and frontend separately on different servers during development phase??????
    * Add "proxy": "http://localhost:8000". So that when making http request at front-end(i.e. in React) to backend, we don't need to write the full URL: Axios.get("http://localhost:8000/api/home",...),  but just Axios.get("/api/home", ...) will do. "proxy" will automatically pre-pend "http://localhost:8000" to the request endpoint/URL.



#### Note: We still need to use 'cors' in server.js, just for dev phase. 
Notice the "devStart" script below runs React and node server separately during dev phase. So 'cor' issue still exists. But if we run 'npm run build' and then "npm run start" (which does 'node server.js'), node server will now serve us the react code (i.e. this route is defined in server.js), and since front-end and back-end are now in the same domain, 'cors' is not neede any more. This is simulating what Heroku will do (first run "npm run build", and then 'npm run start') after we deploy our app.



### Notes on MongoDB connections:
* MongoDB Atlas setup and Heroku deployment:  Guide(https://docs.google.com/document/d/1f89LolZA_DpbhNltEyLxQnOscqCcBEnYXWuymIc2w_s/edit)
* When using local MongoDB instance, how to use terminal to check collections:
`mongo`: start the mongo shell.
`show dbs`: show databases. 
`use [database_name]`: use a specific database, e.g. pokemons_app
`show collections`: show collections of this database

