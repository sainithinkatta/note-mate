require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const authRoutes = require("./routes/routes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://note-mate-two.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Database Connection
connectDB();

// Routes
app.use("/api", authRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Add error handling
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;