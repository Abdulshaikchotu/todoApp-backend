const mongoose = require("mongoose");
//creating new schema for a user credentials
const ObjectId = mongoose.ObjectId;
const Userschema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  tododatas: [{ type: ObjectId, ref: "ToDoItem" }],
});

const usermodel = mongoose.model("userdetails", Userschema);

module.exports = usermodel;
