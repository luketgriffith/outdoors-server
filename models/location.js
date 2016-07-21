var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

//user schema attributes
var LocationSchema = new mongoose.Schema({
  title: String,
  location: String,
  image: String,
  type: String,
  address: String,
  description: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Location', LocationSchema);
