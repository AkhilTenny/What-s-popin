const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const passport = require('passport');
const { userInfo } = require('os');
const { resolve } = require('path');

const userSchema = new mongoose.Schema({
  username:String,
  emailId:String,
  password:String,
  bio:String,
  cryptoId:String,
  interests:{
    type:[String],
    require:true
  },
  followers:[String],
  following:[String]
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
    interests:userInterests,

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
    userInfo.password = null
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
   return(userInfo)
}
async function getUserBio(cryptoId){
  const bio = await userModel.findOne({cryptoId:cryptoId}).select('bio')
  return bio.bio
}

async function checkUsername(username){
  const user = await userModel.findOne({username:username})
  if(user){
    return true
  }else{
    return false
  }
}
function addFollower(userCryptoId,sessionUsername){
  return new Promise(async(resolve,reject)=>{
    const sessionUserFollowing = await userModel.aggregate([
      {
        $match: {
          username: sessionUsername,
        },
      },{
        $unwind: {
          path: "$following"
      }},
      {
        $project: {
          "following":"$following"
        }
      }
    ])
    const following = sessionUserFollowing.map(item => item.following)
    const CryptoUser = await userModel.findOne({cryptoId:userCryptoId})
    if(following.includes(CryptoUser.username)){
      console.log("if",CryptoUser.username)
      reject(false)
    }else{
      console.log("else",CryptoUser.username)

      await userModel.findOneAndUpdate({cryptoId:userCryptoId},{
        $push:{followers:sessionUsername}   }, 
        { new: true, useFindAndModify: false }
       )
      await userModel.findOneAndUpdate({username:sessionUsername},
       { $push:{following:CryptoUser.username}}
      )
      resolve(true)
    }

   
  }
) 
} 
function findFollowing(pageUser,currentUser){
  return new Promise(async(resolve,reject)=>{
    const following = await userModel.aggregate(
      [
        {
          $match: {
            username:currentUser,
          },
        },
        {
          $unwind: {
            path: "$following",
          },
        },
        {
          $project: {
            followings: "$following",
          },
        },
      ]
    )
    const result = following.map(item => item.followings) 
    if(result.includes(pageUser)){
      resolve(true)
    }else{
      resolve(false)
    }


  })
}function followersCount(username){
  return new Promise(async(resolve,reject)=>{
    const count = await userModel.aggregate([
      {
        $match: {
          username: "akhil_tenny",
        },
      },
      {
        $unwind: {
          path: "$followers",
        },
      },
      {
        $count: "count",
      },
    ])
    resolve(count.map(item=>item.count))
})}

function removeFollower(userCryptoId,sessionUsername){
  return new Promise(async(resolve,reject)=>{
    const CryptoUser = await userModel.findOne({cryptoId:userCryptoId})
    await userModel.findOneAndUpdate({cryptoId:userCryptoId},{
      $pull:{followers:sessionUsername}   }
     )
     await userModel.findOneAndUpdate({username:sessionUsername},
      { $pull:{following:CryptoUser.username}}
     )
     resolve(true)
  }
)
}
module.exports= {
    addUser,
    authenticateUser,
    getUserInfo,
    changeUserBio,
    changeUsername,
    searchUsers,
    findUser,
    getUserBio,
    checkUsername,
    addFollower,
    findFollowing,
    followersCount, 
    removeFollower

  }
