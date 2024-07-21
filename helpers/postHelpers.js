
const mongoose = require('mongoose');
const { post } = require('../app');
const { array } = require('mongoose/lib/utils');
const crypto = require('crypto')
 
const postSchema = mongoose.Schema({
  username:String,
  userCryptoId:String,
  postCryptoId:String,
  caption:String,
  likes:Number,
  shares:Number,
  link:String,
  postIndex:Number,
  postType:[],
  imageFilenname:String

})

const Post = mongoose.model('post',postSchema);

function getExtension(filename) {
  const parts = filename.split('.');
  return parts[parts.length - 1] || filename; 
  
}

function getUploadPath(req){
  const route = req.baseUrl;
  switch(route){
    case "/add-post":
      console.log();
  }
}async function savePost(file,userInfo,caption){
    
    const newPost = new Post({
    username:userInfo.username,
    userCryptoId:userInfo.cryptoId,
    postCryptoId:crypto.randomBytes(12).toString('hex'),
    caption:caption,
    likes:0,
    shares:0,
    link:'l',
    postIndex:'1',
    postType:[],
    imageFilenname:file.filename
  })
 
  
  newPost.save()
}
function getUserPosts(userCryptoId){
  return new Promise(async(resolve,reject)=>{
    const userPosts =   await  Post.find({userCryptoId:userCryptoId});
    resolve(userPosts)
  })
}
function getPostInfo(postCryptoId){
  return  new Promise(async(resolve,reject)=>{
    const post = await Post.findOne({postCryptoId:postCryptoId})
    resolve(post)
  })
}

module.exports = {
  getUploadPath,
  getExtension,
  savePost,
  getUserPosts,
  getPostInfo,
}