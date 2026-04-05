const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// Mock Data — Paket Wisata Labuan Bajo
// ==========================================
const paketWisata = [
  {
    id: 1,
    nama: 'Sailing Komodo 3D2N',
    durasi: '3 Hari 2 Malam',
    harga: 'Rp 4.500.000',
    deskripsi:
      'Jelajahi Pulau Komodo, Padar, Manta Point, dan Pink Beach dalam pelayaran 3 hari 2 malam dengan kapal phinisi premium.',
    gambar:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    nama: 'One Day Trip',
    durasi: '1 Hari',
    harga: 'Rp 1.800.000',
    deskripsi:
      'Trip satu hari penuh mengunjungi Pulau Kelor, Pulau Rinca, dan snorkeling di Kanawa Island.',
    gambar:
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    nama: 'Sunset Cruise',
    durasi: 'Half Day',
    harga: 'Rp 950.000',
    deskripsi:
      'Nikmati sunset spektakuler di atas kapal dengan dinner romantis dan live music di tengah laut Flores.',
    gambar:
      'https://images.unsplash.com/photo-1502933691298-84fc14542831?auto=format&fit=crop&w=800&q=80',
  },
];

// ==========================================
// Mock Data — Registered Users (in-memory)
// ==========================================
const users = [];

// ==========================================
// Routes
// ==========================================

// Root
app.get('/', (req, res) => {
  res.send('Server API TravellingLabuanBajo sudah berjalan dengan sukses!');
});

// GET — Daftar Paket Wisata
app.get('/api/paket', (req, res) => {
  res.json(paketWisata);
});

// POST — Simulasi Pemesanan
app.post('/api/pesan', (req, res) => {
  const { paketId, namaPaket, tanggal } = req.body;

  if (!paketId || !namaPaket) {
    return res.status(400).json({
      sukses: false,
      pesan: 'Data pemesanan tidak lengkap. Mohon sertakan paketId dan namaPaket.',
    });
  }

  const pesanan = {
    id: `PSN-${Date.now()}`,
    paketId,
    namaPaket,
    tanggal: tanggal || new Date().toISOString().split('T')[0],
    status: 'Dikonfirmasi',
    waktuPesan: new Date().toISOString(),
  };

  console.log('Pesanan baru diterima:', pesanan);

  res.status(201).json({
    sukses: true,
    pesan: `Pesanan untuk "${namaPaket}" berhasil diterima!`,
    data: pesanan,
  });
});

// ==========================================
// Auth Routes
// ==========================================

// POST — Register
app.post('/api/auth/register', (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({
      sukses: false,
      pesan: 'Semua field (nama, email, password) wajib diisi.',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      sukses: false,
      pesan: 'Password minimal 6 karakter.',
    });
  }

  // Check if email already exists
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({
      sukses: false,
      pesan: 'Email sudah terdaftar. Silakan gunakan email lain atau masuk.',
    });
  }

  const newUser = {
    id: `USR-${Date.now()}`,
    nama,
    email: email.toLowerCase(),
    password, // In production, always hash passwords!
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  console.log('User baru terdaftar:', { id: newUser.id, nama, email });

  res.status(201).json({
    sukses: true,
    pesan: 'Registrasi berhasil!',
    user: { id: newUser.id, nama: newUser.nama, email: newUser.email },
  });
});

// POST — Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      sukses: false,
      pesan: 'Email dan password wajib diisi.',
    });
  }

  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      sukses: false,
      pesan: 'Email atau password salah.',
    });
  }

  console.log('User login:', { id: user.id, email: user.email });

  res.json({
    sukses: true,
    pesan: 'Login berhasil!',
    user: { id: user.id, nama: user.nama, email: user.email },
  });
});

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`Server berhasil menyala di http://localhost:${PORT}`);
});