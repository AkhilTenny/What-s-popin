const 
express = require('express'),
router = express.Router(),
multer = require("multer"),
postHelpers = require('../helpers/postHelpers'),
crypto = require('crypto')

const storagePost = multer.diskStorage({
  destination  :(req,file,cb)=>{
    
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



const upload = multer({storage: storagePost})



router.post('/add-post',upload.single("file"),async(req,res)=>{
  
  
  
  postHelpers.savePost(req.file,req.session.passport.user,req.body.caption)
  res.redirect('/profile')
})

module.exports = router