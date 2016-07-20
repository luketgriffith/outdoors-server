var router = require('express').Router();
var User = require('../models/user');
// var Cart = require('../models/cart');
var passport = require('passport');
var passportConf = require('../config/passport');
var async = require('async');
var path = require('path');
// var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

router.post('/signup', function(req, res, next){
  console.log('got a post', req.body)
  var user = new User();

  async.waterfall([
    function(callback){

        // user.profile.name = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.profile.picture = user.gravatar();
        User.findOne({ email: req.body.email}, function(err, existingUser){
          if (existingUser){
            //need error handling
            res.status(400).json({
                success: false,
                message: 'Email already in use!'
            }).end();
          } else {
            user.save(function(err, user) {
              if(err) return next(err);
              callback(null, user);
              res.status(200).send(user).end();
            });
          }
        });
      }
        
  ])
  
});

router.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.status(200).send(req.user).end();
}); 

router.get('/logout', function(req, res){
  req.logout();
  res.status(200).json({
      success: true,
      message: 'You has been logged out.',
      redirect: '/',
  }).end();
});

module.exports = router;