var express = require('express');
var router = express.Router();
var passport = require("passport")
var userHealpers = require('../helpers/userHelper.js')
var postHelpers = require("../helpers/postHelpers.js")
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
    postHelpers.getUserPosts(req.session.passport.user.cryptoId).then((Posts)=>{
      userHealpers.getUserInfo(req.session.passport.user.cryptoId).then((userInfo)=>{
        const reversedPosts = Posts.slice().reverse();

        res.render("users/profile-panel",{userInfo:userInfo,userPosts:reversedPosts})

      })
    
    })
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

router.get("/add-post",function(req,res){
  console.log(req.params.crytoId)
  res.render('users/new-post',{ user: req.session})
})
router.get('/edit-account',function(req,res){
  res.render('users/edit-account')
})

router.post('/edit-account',function(req,res){
  if(req.body.username){
    userHealpers.changeUsername(req.session.passport.user.cryptoId,req.body.username )
  }if(req.body.bio){
    userHealpers.changeUserBio(req.session.passport.user.cryptoId,req.body.bio )

  }
  res.redirect('/profile')
})


module.exports = router;
