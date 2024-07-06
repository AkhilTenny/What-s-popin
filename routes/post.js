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

    console.log(crypto)
    const originalExt = postHelpers.getExtension(file.originalname)
   
    cb(null,cryptoId + '.' + originalExt)
  }
}) 



const upload = multer({storage: storagePost})



router.post('/add-post',upload.array("file",3),(req,res)=>{
  req.files.map(file=>{
    console.log(file.filename)
  })
})

module.exports = router