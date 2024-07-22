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
router.get('/edit-account',async(req,res)=>{
  
  const userBio = await userHealpers.getUserBio(req.session.passport.user.cryptoId)
  const username = req.session.passport.user.username
  res.render('users/edit-account',{userBio:userBio,username:username})
})

router.post('/edit-account',function(req,res){
  if(req.body.username){
    userHealpers.changeUsername(req.session.passport.user.cryptoId,req.body.username )
    req.session.passport.user.username = req.body.username;
  }if(req.body.bio){
    userHealpers.changeUserBio(req.session.passport.user.cryptoId,req.body.bio )

  }
  res.redirect('/profile')
})

router.get('/edit-dp',function(req,res){
  res.render('users/edit-dp')
})


router.post("/find-users",(req,res)=>{
  userHealpers.searchUsers(req.body.searchTerm).then((users)=>{
    res.json(users) 
  }) .catch((err)=>{

    res.json(err)
  })
})

router.get("/p/:username",async function(req,res){
  const userInfo = await userHealpers.findUser(req.params.username)
  const userPosts = await postHelpers.getUserPosts(userInfo._doc.cryptoId)
  let userFollow
  if(req.session.passport){
    await userHealpers.findFollowing(req.params.username,req.session.passport.user.username)
    .then(value=>{
     userFollow = value
    })
  }console.log

 const followCount = await userHealpers.followersCount(req.params.username);
 console.log(followCount)
 res.render("users/userProfile",{userInfo:userInfo,userPosts:userPosts,userFollow:userFollow,followCount :followCount })
})
router.post('/check-username',async(req,res)=>{
  const user = await userHealpers.checkUsername(req.body.username)
  res.json(user)
})
router.get('/u/:postCryptoId',async(req,res)=>{
  const postInfo = await postHelpers.getPostInfo(req.params.postCryptoId)
  const userInfo = await userHealpers.getUserInfo(postInfo.userCryptoId)
  console.log(postInfo)
  res.render("users/view-post",{postInfo:postInfo,userInfo:userInfo})
})
router.post('/follow-user',async(req,res)=>{
  if(req.session.passport.user){
    await userHealpers.addFollower(req.body.userCryptoId,req.session.passport.user.username).then(value=>{
      res.json(value)
    }).catch(value=>{
      res.json(value)
    })
  }
  
})

router.post("/unfollow-user",async(req,res)=>{
  console.log("get") 
 await  userHealpers.removeFollower(req.body.userCryptoId,req.session.passport.user.username).then(value=>{
    res.json(value)
  }) 
})

module.exports = router;
