const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const passport = require('passport');
const { userInfo } = require('os');

const userSchema = new mongoose.Schema({
  username:String,
  emailId:String,
  password:String,
  bio:String,
  cryptoId:String,
  interests:{
    type:[String],
    require:true
  }
})

const userModel = mongoose.model("users",userSchema) 

async function addUser( userData,userInterests){
  bcrypt.genSalt(12,async (err,salt)=>{
    if(err){
      console.log("a error on salting : ",err);

    }
    const hashPass = await bcrypt.hash(userData.password,salt)
    //create a unique id for each user using crypto
    const randomBytes = crypto.randomBytes(12);
    const uniqueId = randomBytes.toString('hex')
    const newUser = new userModel({
    username: userData.username,
    emailId: userData.emailId,
    password: hashPass,
    cryptoId: uniqueId,
    interests:userInterests

  })
  await newUser.save()
  })
  
   
}
async function authenticateUser(username,password){
  let user  = await userModel.findOne({username:username})
  let hashed = null
    
//check encrypted password
  if(user){
  hashed = await bcrypt.compare(password,user.password)
}
  if(hashed){
    return user
 }else{
    return null
 }
}

function getUserInfo(userCryptoId){
  return new Promise(async(resolve,reject)=>{
    const userInfo = await userModel.findOne({cryptoId:userCryptoId})
    resolve(userInfo)
  })
}
function changeUserBio(userCryptoId,newBio){
  return new Promise(async(resolve,reject)=>{
    console.log(await userModel.find())
    const updatedUser = await userModel.findOneAndUpdate({cryptoId:userCryptoId},{bio:newBio},{ new: true })
    console.log(newBio)
    resolve(updatedUser)
  })
}
function changeUsername(userCryptoId,newUsername){
  return new Promise(async(resolve,reject)=>{
    console.log(userCryptoId)

    const updatedUser = await userModel.findOneAndUpdate({cryptoId:userCryptoId},{username:newUsername},{ new: true })
    console.log(updatedUser)
    resolve(updatedUser)
  })
}
function searchUsers(searchTerm){
  return new Promise(async(resolve,reject)=>{
    const regex = new RegExp(searchTerm, 'i'); 

    users = await userModel.find({username:regex})
    const sanitizedUsers = users.map(({password, ...rest})=>rest)
    if(users.length > 0 ){
      
      resolve(sanitizedUsers);


    }else{  
      reject("error")
    } 


  })
}async function findUser(username){
   let userInfo =await userModel.findOne({username:username})
   userInfo.password = null;
   return(userInfo)
}

module.exports= {
    addUser,
    authenticateUser,
    getUserInfo,
    changeUserBio,
    changeUsername,
    searchUsers,
    findUser,

  }
