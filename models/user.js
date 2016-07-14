var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;

//user schema attributes
var UserSchema = new mongoose.Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
  profile: {
    name: {type: String, default: ''},
    picture: {type: String, default: ''},
  },
  facebook: String,
  tokens: Array,
  address: String,
  image: String,
  locations: [{
    location: {type: Schema.Types.ObjectId, ref: 'Location'}
  }]
})




//password hashing

UserSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt){
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});



//compare password in db with one entered by user

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
};

UserSchema.methods.gravatar = function(size){
  if(!this.size) size = 200;
  if(!this.email) return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  var md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro'
}




module.exports = mongoose.model('User', UserSchema);