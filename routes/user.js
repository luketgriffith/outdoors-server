var router = require('express').Router();
var User = require('../models/user');
// var Cart = require('../models/cart');
var passport = require('passport');
var passportConf = require('../config/passport');
var async = require('async');
// var multer = require('multer');
// var upload = multer({ dest: '../uploads/'})
// var fs = require('fs');
var path = require('path');
// var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

router.post('/signup', function(req, res, next){
  console.log('got a post')


  // async.waterfall([
  //   function(callback){
  //      var user = new User();

  //       user.profile.name = req.body.username;
  //       user.password = req.body.password;
  //       user.email = req.body.email;
  //       user.profile.picture = user.gravatar();
  //       // user.image = 'imageupload-' + now +'.jpg';
  //       User.findOne({ email: req.body.email}, function(err, existingUser){
  //         if (existingUser){
  //           req.flash('errors', 'Account already exists');
  //           return res.redirect('/signup');
  //         } else {
  //           user.save(function(err, user) {
  //             if(err) return next(err);
  //             callback(null, user);
  //           });
  //         }
  //       });
  //     },
        
  // ])
});

module.exports = router;