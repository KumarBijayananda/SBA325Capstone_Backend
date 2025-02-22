//Dependencies
import express from "express";
import User from "../models/User.mjs";
import auth from "../middleware/auth.mjs";


const router = express.Router();

router.get("/", auth, async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error for dashboard GET" }] });
  }
});

// router.post('/',(req,res)=>{

// })

export default router;
