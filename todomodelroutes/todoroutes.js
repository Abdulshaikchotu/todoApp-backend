const express = require("express");
const routes = express.Router();
const todomodel = require("../todomodel/todomodel");
//get route
routes.get("/getalltododata", async (req, res) => {
  let user = req.user;
  console.log("get" + " " + user);
  try {
    let getdata = await todomodel.find({ user }).populate("tododatas");
    res.json({
      status: "success",
      data: getdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});
//post route
routes.post("/posttododata", async (req, res) => {
  let user = req.user;
  try {
    let postdata = await todomodel.create({
      toDoItem: req.body.toDoItem,
      dueDate: req.body.dueDate,
      priorityLevel: req.body.priorityLevel,
      starred: req.body.starred,
      creationDate: req.body.creationDate,
      finishedDate: req.body.finishedDate,
      user: user,
    });
    res.json({
      status: "success",
      data: postdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});
//put route
routes.put("/updatedata/:id", async (req, res) => {
  let user = req.user;
  try {
    let putdata = await todomodel.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.json({
      status: "success",
      data: putdata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});

//delete
routes.delete("/deletedata/:id", async (req, res) => {
  let user = req.user;
  try {
    let deletedata = await todomodel.deleteOne({ _id: req.params.id });
    res.json({
      status: "success",
      data: deletedata,
    });
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});

module.exports = routes;
