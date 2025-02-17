const express = require("express");

const authenticateToken = require("../middleware/authMiddleware");

const { 
    createAccount, 
    login, 
    getUser 
} = require("../controllers/controller");

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", login);
router.get("/get-user", authenticateToken, getUser);

module.exports = router;