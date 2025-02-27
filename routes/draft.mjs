//Dependencies
import express from "express";
import User from "../models/User.mjs";
import auth from "../middleware/auth.mjs";

//Instantialize express router
const router = express.Router();

//function to handle POST request for endpoint /draft
// @route:   POST /draft
// @desc:    Create a draft when no params 
// @access:  Private
router.post("/", auth, async (req, res) => {
  try {
    //find the user and push the new draft to the drafts array
    let user = await User.findById(req.user.id);
    user.drafts.push(req.body);
    await user.save();
    if (!user) {
      console.log("User or Draft not found");
      return null;
    }
    
    user = await User.findById(req.user.id)
    res.json(user.drafts.at(-1).id);

  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: [{ msg: "Server Error for draft POST" }] });
  }
});

//function to handle GET request for endpoint /draft/:id
// @route:   GET /draft/:id
// @desc:    Return draft for the specific ID
// @access:  Private
router.get("/:id", auth, async (req, res) => {
    try {
      //find the user and find the specified draft by the id 
      const user = await User.findById(req.user.id);
      const draft = user.drafts.filter((draft) => draft.id === req.params.id);
      res.json(...draft);
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Server Error for draft GET" }] });
    }
  })

//function to handle PATCH request for endpoint /draft/:id
// @route:   PATCH /draft/:id
// @desc:    Find the old draft specified by the id and update it with new draft
// @access:  Private
  .patch("/:id", auth, async (req, res) => {
    try {
      //find the user and the specified draft and update it with new body from req
      const user = await User.findOneAndUpdate(
        { _id: req.user.id, "drafts._id": req.params.id }, // find user and the draft to update
        {
          $set: {
            "drafts.$.body": req.body.body,
            "drafts.$.updatedAt": new Date(), // Add timestamp
          },
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
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error for draft POST" }] });
    }
  });

export default router;
