const { callbackify } = require('util');

const 
express = require('express'),
router = express.Router(),
multer = require("multer"),
postHelpers = require('../helpers/postHelpers'),
crypto = require('crypto')

const storagePost = multer.diskStorage({
  destination  :(req,file,cb)=>{
    console.log("haidaaa")
    cb(null,'public/images/users/posts')
  },filename:(req,file,cb)=>{
    const cryptoId = crypto.randomBytes(16).toString('hex');
    const originalExt = postHelpers.getExtension(file.originalname)
    
    if(originalExt === "jpg" ||  originalExt === "jpeg" || originalExt === "png"){
      cb(null,cryptoId + '.' + originalExt)
}   else{
     return cb(new Error('invalid image format'))
}
   
  }
}) 
const storageDp = multer.diskStorage({
  destination:(req,file,cb)=>{
     cb(null,"public/images/users/profilePictures")
  },filename:(req,file,cb)=>{
    const originalExt = postHelpers.getExtension(file.originalname)
    cb(null,req.session.passport.user.cryptoId +'.'+ originalExt)
  }
})


const uploadDp = multer({storage: storageDp})

const uploadPost = multer({storage: storagePost})




router.post('/add-post',uploadPost.single("file"),async(req,res)=>{
  
  
  
  postHelpers.savePost(req.file, req.session.passport.user, req.body.caption)
  res.redirect('/profile')
})

router.post("/edit-dp",uploadDp.single("file"),function(req,res){
  console.log("haida kanna")
  res.redirect('/profile')


})


module.exports = router