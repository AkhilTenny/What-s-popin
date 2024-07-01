const mongoose = require("mongoose");
const express = require('express')

const mongoURI = 'mongodb://localhost:27017/WhatsPopin'

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to mongoDB')
  } catch (error) {
    console.log(error)
  }
};

const connectGFS = mongoose.createConnection(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

let gfs;

connectGFS.once('open', ()=>{
  gfs = new mongoose.mongo.GridFSBucket(connectGFS.db,{
    bucketName:"uploads"
  });
  console.log('GridFS initialized');
})

module.exports = {
  URL,connectDB,
}