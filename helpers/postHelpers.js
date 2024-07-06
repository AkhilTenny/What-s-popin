  const Grid = require("gridfs-stream");
const mongoose = require('mongoose');
const mongooseFile = require("../config/connection");
const fs = require('fs');

let gfs

const connect = mongoose.createConnection(mongooseFile.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });



connect.once('open', () => {

 gfs = Grid(connect.db,mongoose.mongo);
 gfs.collection('uploads')
});


async function findFiles(){
  return new Promise(async(resolve,reject)=>{
    try{
      let files = await gfs.files.find().toArray()
      resolve(files)
    }
    catch(err){
      reject(err)

    }
   
  })
  
}
function findOneFile(filename){
  return new Promise(async(resolve,reject)=>{
    try{
      let file = await gfs.files.findOne({filename:"hello.jpg"})
      resolve(file)
    }
    catch(err){
      reject(err)

    }
   
  })
}
function displayImage(filename){
  return new Promise(async(resolve,reject)=>{
    console.log("name",filename)
    var readstream = gfs.createReadStream(filename);
   
  })
}
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
}

module.exports = {
  findFiles,
  findOneFile,
  displayImage,
  getUploadPath,
  getExtension
}