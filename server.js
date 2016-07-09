var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejs_mate = require('ejs-mate');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var MongoStore = require('connect-mongo/es5')(session);
var passport = require('passport');
var secret = require('./config/secret');
var multer = require('multer');
var app = express();
var busboy = require('connect-busboy');
var uploading = multer({
  dest: __dirname + '../public/uploads/'
})

var User = require('./models/user');

//connect mongoose to mongodb
mongoose.connect(secret.database, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db')
  }
})

//Middleware


app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new MongoStore({url: secret.database , autoReconnect: true})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.set('port', (process.env.PORT || 5000));


//routes
// var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
// var adminRoutes = require('./routes/admin');
// var apiRoutes = require('./api/api');
// app.use(mainRoutes);
app.use(userRoutes);
// app.use(adminRoutes);
// app.use('/api', apiRoutes);



//server listen
app.listen(app.get('port'), function(err){
  if(err) throw err;
  console.log('Server Running ok')
});