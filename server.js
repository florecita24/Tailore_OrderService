const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- SETTING TAMPILAN WEB ---
app.use(express.static(path.join(__dirname, '.')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- BAGIAN DATABASE ---
const db = new sqlite3.Database('./orders.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Koneksi ke SQLite berhasil.');
});

// Bikin tabel orders kalau belum ada
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    product_id INTEGER,
    quantity INTEGER,
    total_price INTEGER,
    status TEXT DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// --- BAGIAN AUTHENTICATION ---
const simpleAuth = (req, res, next) => {
    // Kunci rahasia sederhana
    if (req.headers['x-secret-key'] === 'rahasia123') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized: Butuh secret key!' });
    }
};

// --- BAGIAN API ENDPOINTS ---

// [POST] Buat Order Baru
app.post('/api/orders', simpleAuth, (req, res) => {
    const { customer_name, product_id, quantity, total_price } = req.body;
    
    if (!customer_name || !product_id || !quantity) {
        return res.status(400).json({ message: 'Data kurang lengkap' });
    }

    const sql = `INSERT INTO orders (customer_name, product_id, quantity, total_price) VALUES (?, ?, ?, ?)`;
    const params = [customer_name, product_id, quantity, total_price];

    db.run(sql, params, function(err) {
        if (err) return res.status(400).json({ error: err.message });
        
        res.json({
            message: 'Order berhasil dibuat',
            order_id: this.lastID,
            data: { customer_name, product_id, quantity, total_price }
        });
    });
});

// [GET] Lihat Semua Order
app.get('/api/orders', simpleAuth, (req, res) => {
    db.all("SELECT * FROM orders ORDER BY created_at DESC", [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Data Orders', data: rows });
    });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});