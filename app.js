// var apiKey = "7f830f70a9b541b9bb7957578e96b91c";


const express= require("express");
const app = express();
const models= require('./models');
const bodyParser= require("body-parser");
const passport =require('passport');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const path =require('path');
var morgan = require('morgan');
require('dotenv').config();
app.set('view engine','ejs');
// app.set("views", __dirname + "/views");
app.use(morgan('dev'));


// app.get(express.static(__dirname +'/public'));
console.log(__dirname)
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NewsAPI)
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








models.sequelize.sync().then(function(){
    app.listen(process.env.PORT, function(){
      console.log('server listening on port 4000');
  });
  })