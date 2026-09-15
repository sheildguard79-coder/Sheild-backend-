const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Shield Guard MongoDB Connected!'))
  .catch((err) => console.error('❌ DB Error:', err));

// Basic Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Shield Guard Server Working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server live on port ${PORT}`));
