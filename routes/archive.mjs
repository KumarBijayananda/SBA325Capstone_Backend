//Dependencies
import express from "express";
import Archive from "../models/Archive.mjs";
import auth from "../middleware/auth.mjs";

const router = express.Router();

router.get("/:id", auth, async (req, res) => {

  try {
    const versions = await Archive.find({draft_id:req.params.id});
    res.json(versions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error for Archive GET", error: error }] });
  }
}).post("/:id", auth, async (req, res) => {

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
