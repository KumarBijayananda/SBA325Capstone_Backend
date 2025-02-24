//Dependencies
import express from "express";
import Archive from "../models/Archive.mjs";
import auth from "../middleware/auth.mjs";


const router = express.Router();

router.get("/:id", auth, async (req, res) => {

  try {
    const versions = await Archive.findById(req.params.id);
    res.json(versions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ errors: [{ msg: "Server Error for Versions GET" }] });
  }
});


export default router;
