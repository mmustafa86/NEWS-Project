var express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
var router = express.Router();
const models = require('../models');
const bodyParser = require('body-parser')
const rp = require("request-promise");
require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI("7f830f70a9b541b9bb7957578e96b91c")

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: "user_id",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//encrypting function 
var pbkdf2 = require('pbkdf2');
var salt = "4213426A433E1F9C29368F36F44F1";

function encryptionPassword(password) {
  var key = pbkdf2.pbkdf2Sync(
    password, salt, 36000, 256, 'sha256'
  );
  var hash = key.toString('hex')
  return hash;
}
// passport local 

const LocalStrategy = require('passport-local').Strategy

// Register User to the database 


router.post("/signup", function (req, res) {
  models.accounts.findOne({
    where: {
      username: req.body.username
    }
  }).then(function (user) {
    console.log(user)
    if (!user) {
      models.accounts.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: encryptionPassword(req.body.password),


      }).error(function (err) {
        console.log(err);
        res.render('signup', { error: 'The user is already created ' })
      });
    } else {
      res.render('signup', { error: 'The user is already created ' })
    }
    res.redirect("signin")
  })

});

//passport local strategy 

passport.use(new LocalStrategy(
  function (username, password, done) {
    models.accounts.findOne({
      where: {
        username: username
      }
    }).then(function (user) {
      if (!user) {
        return done(null, false)
      }
      if (user.password != encryptionPassword(password)) {
        return done(null, false)
      }
      return done(null, user);
    }).catch(function (error) {
      console.log(error)
      return done(error)
    })
  }
));
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  models.accounts.findOne({ where: { id: id } }).then(function (user) {
    done(null, user);
  });
});



// Using LocalStrategy with passport
router.post('/signin',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function (req, res) {
    res.redirect('/success?username=' + req.user.firstname)

  })

router.get('/success', function (req, res) {
  console.log(req.user)
  if (req.isAuthenticated()) {

    res.redirect('/profile')
  } else {
    res.redirect('/signup')
  }
});

router.get('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("profile.ejs", { name: req.user, name: req.user })
  } else {
    res.redirect('/signup')
  }


});


// var favNames =  new Promise (function(resolve,reject,req){
//  var myData =[]
//   resolve ( models.favorites.findOne({
//     where :{
//       user_id: req.user.id
//     }
//   }).then(function(data){
//   // console.log(data)
//   data.forEach(element => {
//     myData.push(element.name)
    
//    })
  
// return myData  
// })
//   )

// })


// news sources by country
router.get('/news/:sources', function (req, res) {
  
    if (req.isAuthenticated()) {
    console.log(req.user);
  
    newsapi.v2.sources({
      category: req.params.sources,
      language: 'en',
      country: 'us'
    }).then(response => {
      // console.log(response);
      res.render('sources.ejs', { results: response.sources})
      
    });
   
  } else {
    res.redirect('/');
  }

});

// router.get('/news/:sources', function (req, res) {
//   if (req.isAuthenticated()) {

// var api=`https://newsapi.org/v2/sources?category=${req.params.sources}&apiKey=7f830f70a9b541b9bb7957578e96b91c`
// var local =models.favorites.findAll(
//   {where :{
//       user_id :req.user.id
//   } 
//   })


// Promise.all([api, local])
// .then(([posts, authors]) => {
//   console.log(posts)
//   console.log(authors)

// }).catch((e) => console.error(e));
//   } else {
//     res.redirect('/');
//   }
// })



// add your  favorites news 
router.post('/add', function (req, res ,done) {
  var userId = req.user.id
  var dataId = req.body.nameId
  var category = req.body.categoryId
models.favorites.findOne({
  where : {
    user_id: userId,
    name: req.body.nameId
  }
}).then(function(results){
  console.log(results)
  
  if(results) {
    console.log('done')
   
  }else {  
    console.log(userId)
    console.log(dataId)
    models.favorites.create({
      user_id: userId,
      name: dataId,
      category: category
    }).then(function (user) {
      console.log(user)
    })
  }
})
  // res.redirect('favorite')

})






router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});





module.exports = router