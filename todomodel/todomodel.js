const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const todoschema = new mongoose.Schema(
  {
    toDoItem: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priorityLevel: {
      type: Number,
      required: true,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    finishedDate: {
      type: Date,
      default: null,
    },
    user: { type: ObjectId, ref: "userdeatils" },
  },
  { strictPopulate: false }
);

const ToDoItem = mongoose.model("ToDoItem", todoschema);

module.exports = ToDoItem;
