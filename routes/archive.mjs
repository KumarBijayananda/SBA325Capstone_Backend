//Dependencies
import express from "express";
import Archive from "../models/Archive.mjs";
import auth from "../middleware/auth.mjs";

//Instantialize express router
const router = express.Router();

//function to handle GET request for endpoint /archive/:id
// @route:   GET /archive/:id
// @desc:    Return all the archived drafts for the speicified draft ID.
// @access:  Private
router.get("/:id", auth, async (req, res) => {

  try {
    const versions = await Archive.find({draft_id:req.params.id});
    res.json(versions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error for Archive GET", error: error }] });
  }})
//function to handle POST request for endpoint /archive/:id
// @route:   POST /archive/:id
// @desc:    Save draft from the body with the speicified draft ID.
// @access:  Private
  .post("/:id", auth, async (req, res) => {

    try {
      const archive = await Archive.create({
        draft_id: req.params.id,
        body: req.body.body,
      })
      res.json(archive);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ errors: [{ msg: "Server Error for Archive POST" }] });
    }
  });


export default router;
