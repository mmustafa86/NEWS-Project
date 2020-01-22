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

const CONNECTION_STRING='postgres://qktmhpxhsowgrj:a65262fc41c03dc095f5b272ff496ea7dce9c046f6dd1dd00a89fe9928431ecf@ec2-54-235-92-244.compute-1.amazonaws.com:5432/d4m13675019jjm'

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
var authGoogle =require('./auth/auth-social')
app.use(route);
app.use(authLocal);
app.use(authGoogle);







models.sequelize.sync().then(function(){
  const PORT = process.env.PORT || 4040;
  app.listen(PORT, () => {
      console.log(`Our app is running on port ${ PORT }`);
  });
  });