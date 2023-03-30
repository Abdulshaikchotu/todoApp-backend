//express is nodejs library for creating simple apis
const express = require("express");
//initilizing express to the app variable
const app = express();
//using middlewares like cors library to share resources
const cors = require("cors");
app.use(cors());
//middleware for body data
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;
//user routes
const userroute = require("./userroutes/userroutes");
const todoroutes = require("./todomodelroutes/todoroutes");
app.use(userroute);
//middleware to check token is present or not
app.use("/aftersuccessfullogin", async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      jwt.verify(token, "abdul", (err, decoded) => {
        if (decoded) {
          console.log(decoded);
          req.user = decoded.data;
          next();
        }
      });
    }
  } catch (err) {
    res.json({
      status: "fail",
      msg: err.message,
    });
  }
});
//todoroutes
app.use("/aftersuccessfullogin", todoroutes);
const db = require("./db");
//calling db

app.listen(port, () => console.log(`server is up at${port}`));
