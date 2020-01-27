var express = require('express');
const app = express();
const session = require('express-session');
const passport =require('passport');
var router = express.Router();
const models= require('../models');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NewsAPI)

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
    // if(req.isAuthenticated())   {
      models.favorites.findAll(
          {where :{
              user_id :req.user.id
          } 
        })
      
      .then(function(result){
          console.log(result)
           
           res.json(result)     
      }).catch(function(error){
          console.log(error)
      })
      // } else {
      //     res.redirect('/')
      // }
  })




  router.get('/mynews',function(req,res){
    if(req.isAuthenticated())   {
    models.favorites.findAll(
        {where :{
            user_id :req.user.id
        } 
        })
    
    .then(function(result){
        console.log(result)
         
          res.render('favorite.ejs',{names: result })      
    }).catch(function(error){
        console.log(error)
    })
    } else {
        res.redirect('/')
    }
  })


router.get('/hello',function(req,res){
    req.send('Hello!')
})

  router.get('/topHeadlines/:id',function(req,res){

    if(req.isAuthenticated())   {
        models.favorites.findAll().then(function(result){
            console.log(result)
            result.forEach(element => {
               console.log(element.name) 
               newsapi.v2.topHeadlines({

                sources :req.params.id,
                language: 'en',
                
              }).then(response => {
                var result =response.articles
        res.render('news.ejs',{datas: result}); 
              }).catch(function(error){
                console.log(error)
    
              })
      })
      } )
     
    }else {
        res.redirect('/')
    }


  })


  router.delete("/delete/:id", function (req, res, next) {
    console.log("deleting");
    var post =req.params.id
    console.log(post)
    models.favorites.destroy({where: { id: post, user_id: req.user.id}}).then((result) => {
    console.log(result)
    res.json('deleted')
    });
    
  });

//

    router.get('/signin',function(req,res){

        res.render('signin.ejs')

    })

    router.get('/signup',function(req,res){

        res.render('signup.ejs')

    })
  
    router.get('/error',function(req,res){
        res.render('error.ejs',{ error :' incorrect password'})
      })

  module.exports = router;