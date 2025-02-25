//Dependencies
import express from "express";
import User from "../models/User.mjs";
import Archive from '../models/Archive.mjs'
import auth from "../middleware/auth.mjs";

//Instantialize express router
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

router.delete("/:id", auth, async (req, res) => {
  try {
    
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, "drafts._id": req.params.id }, // find user and the draft to update
      {
        $pull: {
          drafts:{_id:req.params.id}
        },
      });

      await Archive.deleteMany({draft_id:req.params.id})

      res.json(user);
    
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error for dashboard GET" }] });
  }
});


export default router;
