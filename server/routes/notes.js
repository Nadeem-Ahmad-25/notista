const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
const notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: getting all notes of the user from server. ~ GET /api/notes/fetchnotes login required for user to fetch user's notes.

router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const note = await notes.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//ROUTE 2: add a new note for unique user. ~ POST /api/notes/addnotes login required for user to add notes.

router.post("/addnotes",fetchuser,
  [
    body("title", "should not be empty").notEmpty().isLength({ min: 5 }),
    body("description", "should not be empty").notEmpty().isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
      }
      const note = new notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE 3: update an existing note for unique user. ~ PUT /api/notes/updatenotes/:id login required for user to update notes.

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body; // by object destructuring we will take the email description and tag from the request body
  try {
    // create a new note.
    const newnote = {};
    if (title) newnote.title = title;
    if (description) newnote.description = description;
    if (tag) newnote.tag = tag;

    // find the note to be updated by its id
    let note = await notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("note not found");
    }
    if (note.user.toString() !== req.user.id)
      return res.status(404).send("user not found");
    note = await notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//ROUTE 4: deleting an existing note for unique user. ~ DELETE /api/notes/deletenotes/:id login required for user to update notes.

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  // find the note to be updated by its id
  try {
    let note = await notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("note not found");
    }
    if (note.user.toString() !== req.user.id)
      return res.status(404).send("user not found");
    note = await notes.findByIdAndDelete(req.params.id);
    res.json("Success note has been deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
