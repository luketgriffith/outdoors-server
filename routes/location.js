var router = require('express').Router();
var User = require('../models/user');
var Location = require('../models/location');
var passport = require('passport');
var passportConf = require('../config/passport');
var async = require('async');
// var multer = require('multer');
// var upload = multer({ dest: '../uploads/'})
// var fs = require('fs');
var path = require('path');
var xoauth2 = require('xoauth2');

router.post('/locations', function(req, res, next) {
  console.log(req.body)
  console.log(req.user)
  var location = new Location();
  location.title = req.body.title;
  // location.address = req.body.address;
  location.description = req.body.description;
  // location.location = req.body.location;
  location.image = req.body.imageUrl;
  // location.type = req.body.type;
  location.owner = req.user._id;
  location.save(function(err) {
    if(err) return next(err);
    console.log('success');
    res.status(200).send(location).end();
  })
})

router.get('/locations', function(req, res, next) {
  Location
    .find()
    .exec(function(err, locations) {
      if(err) return next(err);
      res.status(200).send(locations).end();
    })
})

router.get('/locations/:locationId', function(req, res, next) {
  Location
    .findOne({ _id: req.params.locationId })
    .exec(function(err, location) {
      if(err) return next(err);
      res.status(200).send(location).end();
    })
})


module.exports = router;
