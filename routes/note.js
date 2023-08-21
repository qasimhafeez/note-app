const express = require("express")
const router = express.Router()

const {
	createNote,
	getAllNotesForUser,
	getNoteWithUser,
} = require("../controller/note")
const { verifyToken } = require("../middleware/auth")

router.route("/").post(verifyToken, createNote)
router.route("/:userId").get(verifyToken, getAllNotesForUser)
router.route("/:noteId").get(verifyToken, getNoteWithUser)

module.exports = router
