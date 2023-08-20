const Note = require("./note");
const User = require("./user");

exports.createNote = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { title, content } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const note = await user.createNote({
      title,
      content,
    });

    res.status(201).send(note);
  } catch (error) {
    res.status(500).send({ message: "Error creating the note", error });
  }
};

exports.getAllNotesForUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you're passing the user's ID in URL

    const notes = await Note.findAll({
      where: { user_id: userId },
    });

    res.send(notes);
  } catch (error) {
    res.status(500).send({ message: "Error fetching the notes", error });
  }
};

exports.getNoteWithUser = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const note = await Note.findOne({
      where: { id: noteId },
      include: [User],
    });

    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    res.send(note);
  } catch (error) {
    res.status(500).send({ message: "Error fetching the note", error });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    const note = await Note.findByPk(noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    note.title = title;
    note.content = content;

    await note.save();

    res.send(note);
  } catch (error) {
    res.status(500).send({ message: "Error updating the note", error });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.noteId;

    const note = await Note.findByPk(noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found" });
    }

    await note.destroy();

    res.send({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting the note", error });
  }
};
