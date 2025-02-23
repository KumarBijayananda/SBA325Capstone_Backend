//Dependencies
import express from "express";
import User from "../models/User.mjs";
import auth from "../middleware/auth.mjs";

const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const draft=user.drafts.filter((draft)=>(draft.id===req.params.id))
    res.json(draft);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error for draft GET" }] });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    // console.log(req.user.id);
    // await User.updateOne({ _id: req.user.id }, { $push: { drafts: req.body } });
    // console.log(User);
    // //   user.drafts.push(req.body)
    // //   await user.save();

    // //   user = await User.findById(req.user.id).select("-password");
    // const user = await User.findById(req.user.id).select("-password");

    const user = await User.findOneAndUpdate(
        { _id: req.user.id, "drafts._id": req.body.id }, // find user and the draft to update
        {
          $set: {
            "drafts.$.title": req.body.title,
            "drafts.$.body": req.body.body,
            "drafts.$.updatedAt": new Date(), // Add timestamp
          }
        },
        { new: true } // Return the updated document
      );

      if (!user) {
        console.log("User or Draft not found");
        return null;
      }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error for draft POST" }] });
  }
});

export default router;
