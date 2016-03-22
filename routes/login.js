'use strict';
// let jwt = require('jsonwebtoken');
let User = require('../models/user');

module.exports = (router) => {
  router.route('/login')
    .get((req, res) => {
      console.log('/login hit');
      res.json('Hello world');
    })
    .post((req, res) => {
      console.log('/login hit');

      try {
        // splits the authorizatin property
        let authHeader = req.headers.authorization.split(' ');
        // first part of array will be the authorization method
        let method = authHeader[0];

        // will be an array of username and password
        let authArray = new Buffer(authHeader[1], 'base64').toString().split(':');

        // assigns username and password
        let userName = authArray[0];
        let password = authArray[1];

        // searches to see if user exists and generates token if password is correct
        User.findOne({userName: userName}, (err, user) => {
          if (!user) {return res.json({status: 'failure'});}

          let valid = user.compareHash(password, user.password);
          if (!valid) {
            return res.json({status: 'failure'});
          }

          // responds with token
          res.json({status: 'success', token: user.generateToken()});
        });
      }
      catch(err) {
        console.log(err);
        return res.json({status: 'failure'});
      }

    });
};
