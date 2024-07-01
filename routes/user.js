var express = require('express');
var router = express.Router();
var passport = require("passport")
var userHealpers = require('../helpers/userHelper.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.session});
 
});


router.get('/sign-up',function(req,res){
  res.render("users/signUp/sign-in")
})

router.get('/interest',function(req,res){
   res.render("users/signUp/interest")
})

router.post('/sign-up',function(req,res){
  if(req.body.password == req.body.confirmPassword){
    req.session.userData = req.body;
    req.session.save()
   
    res.redirect('/interest')

    
  }
})
router.get("/profile",function(req,res){
    res.render("users/profile-panel", { user: req.session})
})

router.post("/logout",function(req,res,next){
  console.log('hai')
    req.logout(function(err){
      if(err)return next(err)
      else{
          res.redirect('/')
      }
    }
  
  )
})

router.post("/save-user",function(req,res){
  
  const interests = JSON.parse(req.body.interests)
  const userDatas = req.session.userData
  
  userHealpers.addUser(userDatas,interests)

})

router.get("/add-post/:crytoId",function(req,res){
  console.log(req.params.crytoId)
  res.render('users/new-post',{ user: req.session})
})

router.post("/upload/:crytoId",function(req,res){
  
})

module.exports = router;
