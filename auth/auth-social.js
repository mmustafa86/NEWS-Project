var express = require('express');
const app = express();
const session = require('express-session');
const passport =require('passport');
var router = express.Router();
const models= require('../models');



app.use(session({
    secret: "user_id", 
    resave: false, 
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

  var GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID;
  var GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    models.google.findOne({ where: { id: id } }).then(function (user) {
      done(null, user);
    }); 
  });

  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/profile",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(req,accessToken, refreshToken, profile, done) {
    models.google.findOrCreate({ 
      where: {
      googleId: profile.id 
    }})
    console.log(profile);
      return done(null, profile);
    // });
  }
  ));




  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    console.log(req);
    res.redirect('/profile');
  });



  router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  // router.get('/profile', function(req,res){
  
  //   res.render("profile.ejs")

// })
module.exports = router;

  

  module.exports = router