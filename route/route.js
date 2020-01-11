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

  router.get('/',function(req,res){


    // newsapi.v2.topHeadlines({
    //     q: 'trump',
    //     category: 'politics',
    //     language: 'en',
    //     country: 'us'
    //   }).then(response => {
    //     //   var data=JSON.stringify(response);
    //    res.json(response)
    //     /*
    //       {
    //         status: "ok",
    //         articles: [...]
    //       }
    //     */
    //   }).catch(function(error){
    //       console.log(error)
    //   })
    res.render('main.ejs')
    })
    router.get('/signin',function(req,res){

        res.render('signin.ejs')

    })

    router.get('/signup',function(req,res){

        res.render('signup.ejs')

    })
  
    router.get('/error',function(req,res){
        res.send('password incorrect ')
      })

  module.exports = router;