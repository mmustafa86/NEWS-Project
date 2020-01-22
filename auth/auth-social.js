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
  var GoogleStrategy = require('passport-google-oauth20').Strategy

  var GOOGLE_CLIENT_ID =process.env.GOOGLE_CLIENT_ID;
  var GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET;
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    models.accounts.findOne({ where: { id: id } }).then(function (user) {
      done(null, user);
    }); 
  });

  passport.use(new GoogleStrategy({
    clientID: '382234308177-5gnbp943g9h6847g5ejh4bcjcklv0uue.apps.googleusercontent.com',
    clientSecret: "Ske7uzCJFY0gD5TRlic4YtjG",
    callbackURL: "https://moknews.herokuapp.com/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, done) {
    models.accounts.findOne({
      where: {
        'g_id': profile.id
      }
    }).then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        models.accounts.create({
      firstname : profile.displayName,
          g_id: profile.id
        }).then((newUser) => {
          console.log("New User created: " + newUser);
          done(null, newUser);
        });
      }
    });
  }));
  router.get('/auth/google',
  passport.authenticate('google', {
    scope:
    ['https://www.googleapis.com/auth/userinfo.profile',]
  }
  ));



router.get('/profle',function(req,res){
  res.send('google')
})
  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/signin' }),
  function(req, res) {
    console.log(req);
    res.redirect('/profile');
  });




  

  module.exports = router