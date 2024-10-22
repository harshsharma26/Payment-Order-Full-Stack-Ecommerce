const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

// Use REACT_APP_BACKEND_URL for the port
const PORT = process.env.REACT_APP_BACKEND_URL || 8080;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to DB');
        console.log('Server is running on port ' + PORT);
    }).on('error', (err) => {
        console.error('Error starting the server: ', err);
    });
}).catch(err => {
    console.error('Database connection failed: ', err);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
