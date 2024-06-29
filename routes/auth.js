var express = require('express');
var router = express.Router();
var passport = require('passport');
const userHepler = require("../helpers/userHelper.js")
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');
var mongooseFile = require('../config/connection.js');

passport.use( new LocalStrategy( async function verify (username,password,callback){
    const user =  await userHepler.authenticateUser(username,password)
    if(user == null){
      return callback(null,false,{message:"passcode or username is incorrect"})
    }else{
      return callback(null,user)
    }
}))

passport.serializeUser(function(user,callback){
  callback(null,{username : user.username, emailId:user.emailId, cryptoId:user.cryptoId})
})
passport.deserializeUser(function(user,callback){
  callback(null,user)
})

router.post('/sign-in',passport.authenticate('local',{

  successRedirect: '/',
  failureRedirect: '/login'
}))

module.exports = router;