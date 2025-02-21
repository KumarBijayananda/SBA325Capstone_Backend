//Dependencies
import express from "express";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { check, validationResult } from 'express-validator';
import User from "../models/User.mjs";

const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Testing Login Page")
})




export default router;
