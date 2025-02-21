//Dependencies
import express from "express";
import User from "../models/User.mjs";
import auth from "../middleware/auth.mjs";


const router = express.Router();

router.get("/", auth, async (req, res) => {

    try {
      const user = await User.findById(req.user.id).select("-password");
      console.log("user drafts:",user.drafts);
      res.json(user.drafts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error for dashboard GET" }] });
    }
  });

  router.post("/", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user.drafts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error for dashboard GET" }] });
    }
  });
  

// user = await User.create({
//     name,
//     email,
//     password,
//     draft,
//   });


export default router;
