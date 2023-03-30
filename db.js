//using mongoose to create database
const mongoose = require("mongoose");
//keeping seperate files in .env so we installed external .env library
const dotenv = require("dotenv");
//loading the .env file
dotenv.config();

//connecting with mongodb
mongoose
  .connect(process.env.mongodburl)
  .then(() => console.log("connected to database"));
