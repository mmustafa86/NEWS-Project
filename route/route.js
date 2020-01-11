var express = require('express');
const app = express();
const session = require('express-session');
const passport =require('passport');
var router = express.Router();
const models= require('../models');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7f830f70a9b541b9bb7957578e96b91c')

app.use(session({
    secret: "user_id", 
    resave: false, 
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());



  router.get('/',function(req,res){
      res.render('main.ejs')
  })



  router.get('/news/:id',function(req,res){


    newsapi.v2.sources({
        category: req.params.category,
        language: 'en',
        country: 'us'
      }).then(response => {
        console.log(response);
        //   var data=JSON.stringify(response);
       res.json(response)
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
      }).catch(function(error){
          console.log(error)
      })
    
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