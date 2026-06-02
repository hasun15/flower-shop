const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// 🔴 වැදගත්: <db_password> කියන කෑල්ල වෙනුවට ඔයා admin යූසර්ට දුන්න සැබෑ Password එක ටයිප් කරන්න!
// (රීතී ලකුණු < > දෙකත් අයින් කරන්න මතක තියාගන්න)
const MONGO_URI = 'mongodb+srv://admin:pass123@cluster0.b9cwwib.mongodb.net/mal_shop?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB Database එකට සම්බන්ධ වීම
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Database එකට සාර්ථකව සම්බන්ධ වුණා! ✅'))
    .catch(err => console.error('Database එකට සම්බන්ධ වෙන්න බැරි වුණා ❌:', err));

// Database Schema (මල් වල හැඩය සැලසුම් කිරීම)
const flowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
});

const Flower = mongoose.model('Flower', flowerSchema);

// 1. GET Route - Database එකේ තියෙන ඔක්කොම මල් ටික ලබාගැනීම
app.get('/api/flowers', async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.json(flowers);
    } catch (error) {
        res.status(500).json({ message: 'දත්ත ලබාගැනීම අසාර්ථකයි' });
    }
});

// 2. POST Route - අලුත් මලක් සැබෑ Database එකටම සේව් කිරීම
app.post('/api/flowers', async (req, res) => {
    try {
        const newFlower = new Flower({
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty
        });

        const savedFlower = await newFlower.save();
        res.status(201).json({ message: "මල් වර්ගය සාර්ථකව Database එකට ඇතුළත් කළා! 🌸", flower: savedFlower });
    } catch (error) {
        res.status(400).json({ message: 'Database එකට සේව් කරන්න බැරි වුණා' });
    }
});

// Server එක පණ ගැන්වීම
app.listen(PORT, () => {
    console.log(`Server එක http://localhost:$5000{PORT} ඔස්සේ වැඩ කරමින් පවතී...`);
    module.exports = app;
});
    module.exports = app;


