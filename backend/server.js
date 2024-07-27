const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;

// Import routes
const authRoutes = require('./routes/auth');
// Use routes
app.use('/api/auth', authRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
