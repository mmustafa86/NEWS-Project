var express = require('express');
const app = express();
const session = require('express-session');
const passport =require('passport');
var router = express.Router();
const models= require('../models');
const bodyParser =require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "user_id", 
    resave: false, 
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //encrypting function 
  var pbkdf2 = require('pbkdf2');
  var salt =process.env.SALT_KEY ;

  function encryptionPassword(password){
    var key =pbkdf2.pbkdf2Sync(
      password,salt, 36000,256, 'sha256'
    );
    var hash= key.toString('hex')
    return hash;
  }
// passport local 

  const LocalStrategy = require('passport-local').Strategy

 // Register User


 router.post("/signup", function (req, res) {
    models.accounts.findOne({
    where: {
      username: req.body.username
    }}).then(function(user){
      console.log(user)
      if(!user){
        models.accounts.create({ 
          firstname: req.body.firstname,
           lastname: req.body.lastname,
           username: req.body.username,
           email: req.body.email,
           password: encryptionPassword(req.body.password),
           
  
      }).error(function(err){
        console.log(err);
        res.render('signup', {error: 'The user is already created '})
      });
      } else {
      res.render('signup', {error: 'The user is already created '})
      }
      res.redirect("signin")
    })
    
    });






  module.exports = router