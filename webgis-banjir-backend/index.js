const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi Koneksi PostgreSQL menggunakan .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test Koneksi Database
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Gagal terhubung ke database PostgreSQL:", err.stack);
  }
  console.log("Berhasil terhubung ke database PostgreSQL!");
  release();
});

// --- ROUTE API ---
app.get("/", (req, res) => {
  res.json({ message: "API Backend WebGIS Banjir Aktif!" });
});

// Route untuk mengambil data wilayah & curah hujan
app.get("/api/wilayah", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM wilayah_banjir");
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Jalankan Server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
// 3. Route untuk menambahkan data baru (Contoh: Laporan / Update Wilayah Banjir)
app.post("/api/wilayah", async (req, res) => {
  try {
    const { nama_wilayah, curah_hujan, status_rawan, latitude, longitude } =
      req.body;

    const query = `
            INSERT INTO wilayah_banjir (nama_wilayah, curah_hujan, status_rawan, latitude, longitude) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;

    const values = [
      nama_wilayah,
      curah_hujan,
      status_rawan,
      latitude,
      longitude,
    ];
    const newWilayah = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: "Data wilayah berhasil ditambahkan!",
      data: newWilayah.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Gagal menyimpan data" });
  }
});
