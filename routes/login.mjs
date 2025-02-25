//Dependencies
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../models/User.mjs";
import auth from "../middleware/auth.mjs";

//Instantialize express router
const router = express.Router();

//function to handle GET request for endpoint /login
// @route:   GET /login
// @desc:    Authenticate user
// @access:  Private
router.get("/", auth, async (req, res) => {
  try {
    //get user from DB and return user
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

//function to handle POST request for endpoint /login
// @route:   POST /login
// @desc:    Login User Route
// @access:  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", " Password required").not().isEmpty(),
  ],
  async (req, res) => {
    // Check if any validation errors in the req obj
    let errors = validationResult(req);

    // If the errors variable is NOT empty, response with errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Desctructure our req.body
    const { email, password } = req.body;

    try {
      // Find a user and check if they exist
      let user = await User.findOne({ email });

      // if user does NOT exists, return error
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // Check if passwords match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // create a payload
      const payload = {
        user: {
          id: user._id,
        },
      };

      // Sign and send a jwt back to the frontend
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
            console.log(token);
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

export default router;
