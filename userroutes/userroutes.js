const express = require("express");
const usermodel = require("../usermodel/usermodel");
const routes = express.Router();
//using external jsonwebtoken for creation of token to send user details in token form for authentication purpose
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

//implemented register route
routes.post(
  "/register",
  // username must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password").isLength({ min: 5, max: 10 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let registerdata = await usermodel.findOne({ email });
      if (registerdata) {
        res.json({
          status: "fail",
          msg: "user already existed with given email",
        });
      } else {
        let registeruser = await usermodel.create(req.body);
        res.json({
          status: "successfully created user details",
          data: registeruser,
        });
      }
    } catch (err) {
      res.json({
        status: "fail",
        msg: err.message,
      });
    }
  }
);
//implemented login route
routes.post(
  "/login",
  // username must be an email
  body("email").isEmail(),
  // password must be at least 5 chars long
  body("password").isLength({ min: 5, max: 10 }),
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let registerdata = await usermodel.findOne({ email });
      if (!registerdata) {
        res.json({
          status: "fail",
          msg: "user is not present with given email",
        });
      } else {
        let token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000 + 60 * 60),
            data: registerdata._id,
          },
          "abdul"
        );
        res.json({
          status: "successfully login",
          token: token,
        });
      }
    } catch (err) {
      res.json({
        status: "fail",
        msg: err.message,
      });
    }
  }
);

module.exports = routes;
