const express = require("express");
const router = express.Router();
const users = require("../models/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchuser");

const SECRET_KEY = "My$ecret#ey";

// ROUTE 1: creating new user account using their name, email and password. ~/api/auth/createuser  no initial login requred here.
router.post(
  "/createuser",
  [
    body("name", "enter a valid string and minimum size 3")
      .notEmpty()
      .isLength({ min: 3 }),
    body(
      "email",
      "enter a valid email, ending with @<providing>.com and size of minimum 8."
    )
      .notEmpty()
      .isEmail()
      .isLength({ min: 8 }),
    body("password", "enter a valid string and minimum size 5")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let user = await users.findOne({ email: req.body.email });

    if (user) {
      res
        .status(400)
        .json({ message: "Please enter a valid and unique email address" });
    } else {
      if (result.isEmpty()) {
        // one way of saving the inputs to the database and sending the response.
        // const user = users(req.body);
        // user.save();
        // console.log(req.body);
        // res.send(user);

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        // another way of saving the inputs to the database and sending the response
        user = await users.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        });
        const data = {
          user: {
            id: user.id, // as of now we are validating/finding the user based on the id saved in mongodb
          },
        };
        const authdata = jwt.sign(data, SECRET_KEY);
        console.log(authdata);
        res.json({ authdata });
      } else {
        res.send({ errors: result.array() });
      }
    }
  }
);

// ROUTE 2: login user with email and password. ~/api/auth/login  This route does not require user to be logged in.
router.post(
  "/login",
  [
    body(
      "email",
      "enter a valid email, ending with @<providing>.com and size of minimum 8."
    )
      .notEmpty()
      .isEmail()
      .isLength({ min: 8 }),
    body("password", "password cannot be empty")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ result: result.array() });
    }
    const { email, password } = req.body;
    let user = await users.findOne({ email });
    console.log(user.email, user.password);
    if (!user) {
      return res.status(400).json({
        error: "Please try again. This time maybe with correct credentials",
      });
    }
    const passcheck = await bcrypt.compare(password, user.password);
    if (!passcheck) {
      return res.status(400).json({
        error: "Please try again. This time maybe with correct credentials",
      });
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authdata = jwt.sign(data, SECRET_KEY);
    res.json({ authdata });
  }
);

//ROUTE 3: getting user details from server. ~ /api/auth/getuserdetails login required for user to fetch user details.
router.post("/getuserdetails", fetchuser, async (req, res) => {
  userID = req.user.id;
  const data = await users.findById(userID).select("-password");
  res.send(data);
});
module.exports = router;
