const express = require("express");
const { createAccount, login } = require("../controllers/controller");

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", login);

module.exports = router;