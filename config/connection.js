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

module.exports = {
  URL,connectDB
}