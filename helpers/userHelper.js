const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  userName:String,
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
    console.log(hashPass);
    //create a unique id for each user using crypto
    const randomBytes = crypto.randomBytes(12);
    const uniqueId = randomBytes.toString('hex')
    console.log(",id",uniqueId) 
    const newUser = new userModel({
    userName: userData.userName,
    emailId: userData.emailId,
    password: hashPass,
    cryptoId: uniqueId,
    interests:userInterests

  })
  await newUser.save()
  })
  
  
}


module.exports= {
    addUser
  }
