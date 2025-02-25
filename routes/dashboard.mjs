//Dependencies
import express from "express";
import User from "../models/User.mjs";
import Archive from '../models/Archive.mjs'
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

router.delete("/:id", auth, async (req, res) => {
  try {
    // const draftToDel = await User.find({_id: req.user.id,"drafts.id":req.params.id })
    // if(draftToDel){
    //   console.log("draftToDel found")
    //   await User.deleteOne({_id: req.user.id,"drafts.id":req.params.id })
    //   await Archive.deleteMany({draft_id:req.params.id})
    //   const user = await User.findById(req.user.id);
    //   res.json(user);

    const user = await User.findOneAndUpdate(
      { _id: req.user.id, "drafts._id": req.params.id }, // find user and the draft to update
      {
        $pull: {
          drafts:{_id:req.params.id}
        },
      });

      await Archive.deleteMany({draft_id:req.params.id})

      res.json(user);
    // } else res.send(`No draft with id ${id} found`)
    
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error for dashboard GET" }] });
  }
});


export default router;
