const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const { 
    createAccount, 
    login, 
    getUser,
    addNewNote,
    editNote,
    getAllNotes,
    deleteNote,
    toggleNotePin,
    searchNotes
} = require("../controllers/controller");

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/get-user", authenticateToken, getUser);
router.post("/notes", authenticateToken, addNewNote);
router.put("/notes/:noteId", authenticateToken, editNote);
router.get("/notes", authenticateToken, getAllNotes);
router.delete("/notes/:noteId", authenticateToken, deleteNote);
router.put("/notes/:noteId/pin", authenticateToken, toggleNotePin);
router.get("/notes/search", authenticateToken, searchNotes);

module.exports = router;