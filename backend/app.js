require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const authRoutes = require("./routes/routes");

const app = express();

// Middleware
app.use(express.json());

// Handle preflight requests
app.options('*', cors());

app.use(cors({
    origin: ['https://notemate-app.vercel.app', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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