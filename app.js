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
const fetch = require('node-fetch')
// app.set("views", __dirname + "/views");
app.use(morgan('dev'));
const ejsLint = require('ejs-lint');
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
  app.use(express.static('styles/css'));
  app.use(passport.initialize());
  app.use(passport.session());

var route=require('./route/route')
var authLocal=require('./auth/auth-local')
var authGoogle =require('./auth/auth-social')
app.use(route);
app.use(authLocal);
app.use(authGoogle);


// const mongoose =require('mongoose')


// const usersSchema = new mongoose.Schema({
//   fisrstName: String , 
//   LastName: String ,
//   email: String ,
//   password: String, 
//   g_id: String
// })

// const userMongo =mongoose.model('user',usersSchema);


// mongoose.connect('mongodb://localhost:27017/db',{useNewUrParser: true },function (error){
//   if ( error){
//     console.log('not connected')
//   }else{
// console.log('connected')
//   }
//   })

  
//   userMongo.find({} ,function(error,users){
//   console.log(users)
// })

  
// const usersmon = new userMongo ({
//   fisrstName: 'Sara' , 
//     LastName: 'Omar' ,
//     email: 'sara@yahoo.com' ,
//     password: '123456', 
//     g_id: '12344'
// })
// usersmon.save((error,newuserMongo )=>{
//   if (error){
//     console.log(error)
//   }else{
//     console.log(newuserMongo)
//   }
// })




models.sequelize.sync().then(function(){
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
      console.log(`Our app is running on port ${ PORT }`);
  });
  });