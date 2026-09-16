
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Shield Guard MongoDB Connected!'))
  .catch(err => console.error('❌ DB Error:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Shield Guard Server Working!' });
});

// --- User Schema & Login/Register Routes ---
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// 1. Register Route
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: "Registered successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password!" });
        }
        res.status(200).json({ success: true, message: "Login successful!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));
