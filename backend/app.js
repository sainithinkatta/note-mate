require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const authRoutes = require("./routes/routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Database Connection
connectDB();

// Routes
app.use("/api", authRoutes);

module.exports = app;