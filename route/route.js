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


  router.get('/favorites',function(req,res){
models.favorites.findAll().then(function(data){
    console.log(data)
})
      res.render('favorite.ejs')

  })




  router.get('/mynews',function(req,res){
    models.favorites.findAll().then(function(data){
        console.log(data)
       data.forEach(element => {
           console.log(element.name) 
    
        newsapi.v2.topHeadlines({
            sources: element.name,
            language: 'en',
            country: 'us'
          }).then(response => {
              console.log(response);
              res.json(response)
         })
        
          })         
    })
  })

//   router.get('/news/:id',function(req,res){


    // newsapi.v2.topHeadlines({
    //     category: req.params.id,
    //     language: 'en',
    //     country: 'us'
    //   }).then(response => {
       
        
//         var result =response.articles
//         // result.forEach(element => {
//         //     console.log(element.source.name);
//         // });
//         //   console.log(response)
//         //   res.json(result)
//        res.render('news.ejs',{datas: result});
    
     
//       }).catch(function(error){
//           console.log(error)
//       })
     
//     })




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