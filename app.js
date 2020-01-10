// var apiKey = "7f830f70a9b541b9bb7957578e96b91c";


const express= require("express");
const app = express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport');
const session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
require('dotenv').config();
app.set('view engine','ejs');
app.use(morgan('dev'));
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('7f830f70a9b541b9bb7957578e96b91c')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    secret: "user_id", 
    resave: false, 
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

var route=require('./route/route')
var authLocal=require('./auth/auth-local')
app.use(route);
app.use(authLocal);

// newsapi.v2.topHeadlines({
//     category: 'technology',
//   language: 'en',
//   country: 'us'

//   }).then(response => {
//     console.log(response);
//     /*
//       {
//         status: "ok",
//         articles: [...]
//       }
//     */
//     }).catch(function(error){
//        console.log(error)
//    })
  
app.get('/',function(req,res){


newsapi.v2.topHeadlines({
    q: 'trump',
    category: 'politics',
    language: 'en',
    country: 'us'
  }).then(response => {
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





models.sequelize.sync().then(function(){
    app.listen(4000, function(){
      console.log('server listening on port 4000');
  });
  })