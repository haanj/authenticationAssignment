'use strict';
let express = require('express'); // brings in express
let app = express(); // creates express server object
let DB_PORT = process.env.DB_PORT || require('./.config').DB_PORT;
let mongoose = require('mongoose');

mongoose.connect(DB_PORT);

// creates new router to hold specific routes.. allows for more modularity and cleaner code than assigning everything directly to .express()
let publicRouter = express.Router();

// pulls in the function from login.js and passes in publicRouter. Effectively assigns publicRouter the routes in login.js
require(__dirname + '/routes/login')(publicRouter);

// quick route to test that server is up
app.route('/')
  .get((req, res) => {
    res.json('hello world');
  });

// loads in publicRouter into the middleware chain for the app. Req will pass through publicRouter at this point
app.use(publicRouter);

// starts up the server
app.listen(3000, () => {
  console.log('Server started');
});
