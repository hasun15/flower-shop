const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Database එකට සම්බන්ධ වීම (Vercel එකේ තියෙන ලින්ක් එක හෝ කෝඩ් එකේ ලින්ක් එක ගනී)
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://admin:pass123@cluster0.b9cwwib.mongodb.net/mal_shop?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Database එකට සාර්ථකව සම්බන්ධ වුණා! ✅'))
    .catch(err => console.error('Database එකට සම්බන්ධ වෙන්න බැරි වුණා ❌:', err));

// Database Schema
const flowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true }
});

const Flower = mongoose.model('Flower', flowerSchema);

// Base Route (Vercel එක වැඩද බලන්න පොඩි Welcome මැසේජ් එකක්)
app.get('/', (req, res) => {
    res.send('මල් කඩේ Backend API එක සාර්ථකව වැඩ කරයි! 🌸');
});

// 1. GET Route - Database එකේ තියෙන ඔක්කොම මල් ටික ලබාගැනීම
app.get('/api/flowers', async (req, res) => {
    try {
        const flowers = await Flower.find();
        res.json(flowers);
    } catch (error) {
        res.status(500).json({ message: 'දත්ත ලබාගැනීම අසාර්ථකයි' });
    }
});

// 2. POST Route - අලුත් මලක් Database එකට සේව් කිරීම
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

// Local පරිගණකයේදී විතරක් Server එක Run වීමට
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server එක http://localhost:${PORT} ඔස්සේ වැඩ කරමින් පවතී...`);
    });
}

// 🟢 Vercel එකට අත්‍යවශ්‍යම Export එක (app.listen එකෙන් පිටත)
module.exports = app;
