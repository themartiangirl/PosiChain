const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
const db = new sqlite3.Database('./notes.db');

// Middleware
app.use(cors());
app.use(bodyParser.json());

db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL
)`);


app.get('/note', (req, res) => {
    db.get(`SELECT content FROM notes ORDER BY RANDOM() LIMIT 1`, (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve note.' });
        } else {
            res.json({ note: row ? row.content : "Be the reason someone smiles today!" });
        }
    });
});


app.post('/note', (req, res) => {
    const { content } = req.body;
    if (!content || content.trim() === '') {
        return res.status(400).json({ error: 'Note cannot be empty.' });
    }
    db.run(`INSERT INTO notes (content) VALUES (?)`, [content], function (err) {
        if (err) {
            res.status(500).json({ error: 'Failed to save note.' });
        } else {
            res.json({ message: 'Note added successfully!' });
        }
    });
});

// QR Code
app.get('/generate-qr', (req, res) => {
    const url = `http://localhost:3000`;
    QRCode.toDataURL(url, (err, src) => {
        if (err) res.send('Error occurred');
        res.send(`<img src="${src}" alt="QR Code" />`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

