const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username:String,
  emailId:String,
  password:String,
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


module.exports= {
    addUser,
    authenticateUser
  }
