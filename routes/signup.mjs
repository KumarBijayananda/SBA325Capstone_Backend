//Dependencies
import express from "express";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { check, validationResult } from 'express-validator';
import User from "../models/User.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Testing Get SignUp Page");
});

// @route:   POST /signup
// @desc:    SignUp User Route
// @access:  Public
router.post(
  "/",
  //   [
  //     check('name', 'Name is required').not().isEmpty(),
  //     check('email', 'Please include a valid email').isEmail(),
  //     check(
  //       'password',
  //       'Please enter a password with 6 or more characters'
  //     ).isLength({ min: 6 }),
  //   ],
  async (req, res) => {
    // Check if any validation errors in the req obj
    // let errors = validationResult(req);

    // If the errors variable is NOT empty, response with errors
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // Destructure my req.body
    // const { name, email, password } = req.body;

    try {
      // Check if user already exists
       let user = await User.findOne({ email });

        //   If user exists already, respond with error
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User Already Exists" }] });
        }

    //   Create a new user
       user = await User.create({
          name,
          email,
          password,
        });
      await User.create(req.body);

      // Encrypt password
      // Create a salt - number of encryption rounds it goes through
      //   const salt = await bcrypt.genSalt(10);
      // Hash password using salt
      //   user.password = await bcrypt.hash(password, salt);
      //   Save user to DB
      //   await user.save();

      res.send(req.body);
      //   const payload = {
      //     user: {
      //       id: user.id,
      //     },
      //   };
      //   Create a jwt, sign it, if there are no errors, send token to the FE
      //   jwt.sign(
      //     payload,
      //     process.env.jwtSecret,
      //     { expiresIn: 3600000 }, //Expiration date/time/options obj
      //     (err, token) => {
      //       // If error, throw error
      //       if (err) throw err;
      //       res.status(201).json({ token });
      //     }
      //   );
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: [{ msg: "Server Error for create user" }] });
    }
  }
);

export default router;
