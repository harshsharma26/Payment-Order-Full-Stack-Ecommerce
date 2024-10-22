// api/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require("../config/db");
const router = require('../routes');

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// Connect to the database and handle requests
const handler = async (req, res) => {
    try {
        await connectDB(); // Ensure DB is connected
        app(req, res); // Pass requests to Express app
    } catch (error) {
        console.error("Error in serverless function:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Export the handler for Vercel
module.exports = handler;
