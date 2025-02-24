const User = require("../models/user.model");
const Notes = require("../models/note.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Create Account API
const createAccount = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            error: true,
            message: "All fields are required"
        });
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
        return res.json({
            error: true,
            message: "User already exists"
        });
    }

    // Hashing password
    const value = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, value);

    const user = new User({ 
        fullName,
        email,
        password: hashedPassword 
    });

    await user.save();

    const accessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '36000m' }
    );

    return res.json({
        error: false,
        user,
        accessToken,
        message: 'Registration Successful'
    });
};

// User Login API
const login = async (req, res) => {
    console.log('Logged In');

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "Email and password are required"
        });
    }

    const userInfo = await User.findOne({ email });

    if (!userInfo || userInfo.password !== password) {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials"
        });
    }

    const accessToken = jwt.sign(
        { user: userInfo },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "36000m" }
    );

    return res.json({
        error: false,
        message: 'Login Successful',
        email,
        accessToken
    });
};

// Get User API
const getUser = async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({_id: user._id});

    if(!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: ""
    })
};

// Add New Note API
const addNewNote = async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({
            error: true,
            message: 'Title is required'
        });
    }

    if (!content) {
        return res.status(400).json({
            error: true,
            message: 'Content is required'
        });
    }

    try {
        const note = new Notes({
            title, 
            content,
            tags: tags || [],
            userId: user._id
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note added successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};

// Edit Note API
const editNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    if (!title && !content && !tags) {
        return res.status(400).json({
            error: true,
            message: 'No Changes Provided'
        });
    }

    try {
        const note = await Notes.findOne({
            _id: noteId,
            userId: user._id
        });

        if (!note) {
            return res.status(400).json({
                error: true,
                message: 'Note not found'
            });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};

// Get All Notes
const getAllNotes = async (req, res) => {
    const { user } = req.user;

    try {
        const notes = await Notes.find({
            userId: user._id
        }).sort({
            isPinned: -1
        });

        return res.json({
            error: false,
            notes,
            message: 'All notes retrieved successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};

// Delete Note API
const deleteNote = async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        const notes = await Notes.findOne({
            _id: noteId,
            userId: user._id
        });

        if (!notes) {
            return res.status(404).json({
                error: true,
                message: 'Note not found'
            });
        }

        await notes.deleteOne({
            _id: noteId,
            userId: user._id
        });

        return res.json({
            error: false,
            notes,
            message: 'Note Deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};

// Toggle Note Pin API
const toggleNotePin = async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        const note = await Notes.findOne({
            _id: noteId,
            userId: user._id
        });

        if (!note) {
            return res.status(400).json({
                error: true,
                message: 'Note not found'
            });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: 'Note Pinned successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};

// Search API
const searchNotes = async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({
            error: true,
            message: 'Search Query is required'
        });
    }

    try {
        const matchingNotes = await Notes.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i")}},
                { content: { $regex: new RegExp(query, "i")}}
            ]
        });

        return res.json({
            error: false,
            notes: matchingNotes,
            message: 'Notes Retrieved Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Internal Server Error'
        });
    }
};


module.exports = { 
    createAccount, 
    login, 
    getUser, 
    addNewNote, 
    editNote, 
    getAllNotes,
    deleteNote,
    toggleNotePin,
    searchNotes
};