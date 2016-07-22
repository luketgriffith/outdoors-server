var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

//user schema attributes
var LocationSchema = new mongoose.Schema({
  title: String,
  location: String,
  imageUrl: String,
  type: String,
  address: String,
  description: String,
  owner: String
})

module.exports = mongoose.model('Location', LocationSchema);
