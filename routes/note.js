const express = require("express");
const router = express.Router();

const {
  createNote,
  getAllNotesForUser,
  getNoteWithUser,
  deleteNote,
  updateNote,
} = require("../controller/note");
const { verifyToken } = require("../middleware/auth");

router.route("/").post(verifyToken, createNote);
router.route("/:userId").get(verifyToken, getAllNotesForUser);
router.route("/:noteId").get(verifyToken, getNoteWithUser);
router.route("/:noteId").delete(verifyToken, deleteNote);
router.route("/:noteId").put(verifyToken, updateNote);

module.exports = router;
