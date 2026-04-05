# TravellingLabuanBajo 

TravellingLabuanBajo adalah sebuah platform *Multi-Page Application* (MPA) booking wisata yang berfokus pada destinasi premium di Labuan Bajo (Pulau Komodo, Pulau Padar, Pink Beach, dll). Proyek ini dibangun dari nol sebagai submission web development dengan mengimplementasikan arsitektur Frontend-Backend yang saling terintegrasi. 

Aplikasi ini tidak menggunakan payment gateway internal, melainkan mengarahkan pesanan secara langsung ke WhatsApp Admin dengan format pesan terstruktur yang otomatis terisi berdasarkan pilihan paket.

## Fitur Utama

- **Landing Page Interaktif**: Menampilkan destinasi unggulan, paket wisata, testimoni, dan artikel tips perjalanan.
- **Multi-Page Routing**: Navigasi lancar menggunakan React Router tanpa *reload* halaman (`/discovery/:slug`, `/artikel/:slug`, `/pesan/:id`).
- **Sistem Otentikasi Simpel**: Fitur Login dan Register menggunakan *in-memory storage* di backend dengan *state management* menggunakan React Context API, serta penyimpanan sesi di `localStorage`.
- **Formulir Pemesanan ke WhatsApp**: User dapat mengisi detail pesanan (nama, tanggal keberangkatan, jumlah pax, catatan khusus), yang langsung diformat dan dikirimkan ke WhatsApp admin.
- **Desain Modern & Responsif**: UI/UX premium bernuansa *dark mode* (Deep Navy) menggunakan Tailwind CSS v4.
- **Backend API**: Server Express.js modular yang menangani data dummy paket wisata dan memproses request otentikasi.

## Teknologi yang Digunakan

**Frontend:**
- React (menggunakan Vite)
- react-router-dom (untuk navigasi)
- Tailwind CSS v4 (untuk styling interaktif)
- Lucide React (untuk ikon UI)
- Axios (untuk request ke API)

**Backend:**
- Node.js
- Express.js
- CORS & dotenv

## Struktur Proyek

Proyek ini dipisah menjadi dua environment utama:

```
TravellingLabuanBajo/
│
├── backend/                  # REST API server (Port 5000)
│   ├── server.js             # Logic API utama & Mock Data
│   └── package.json          
│
└── frontend/                 # UI Client React (Port 5173)
    ├── src/
    │   ├── components/       # Komponen modular (Navbar, AuthModal, CTA, dll)
    │   ├── context/          # React Context (AuthContext)
    │   ├── data/             # Sumber konten statis artikel & discovery
    │   ├── pages/            # View halaman untuk router (Home, Booking, Detail)
    │   ├── App.jsx           # Setup konfigurasi root & routing
    │   └── main.jsx          # Entry point Vite
    ├── package.json
    └── tailwind.config.js    
```

## Cara Menjalankan di Local Environment

Pastikan kamu sudah menginstal **Node.js** di komputermu. Karena ini adalah repository mono, kamu perlu menjalankan terminal terpisah untuk Frontend dan Backend.

### 1. Menjalankan Backend (Server API)
Buka terminal baru, lalu masuk ke folder `backend` dan jalankan:
```bash
cd backend
npm install
npm run dev
```
*Server backend akan berjalan di `http://localhost:5000`.*

### 2. Menjalankan Frontend (UI)
Buka tab terminal baru lainnya, masuk ke folder `frontend` dan jalankan:
```bash
cd frontend
npm install
npm run dev
```
*Frontend aplikasi akan berjalan otomatis. Kalau tidak terbuka sendiri, kunjungi `http://localhost:5173`.*

## Notes untuk Modifikasi

- **Mengubah Nomor WhatsApp Admin**: Untuk mengganti tujuan nomor WhatsApp pesanan, silakan edit variabel `adminNumber` yang berada di dalam function `handleSubmit` pada file `frontend/src/pages/Booking.jsx`.
- **Database/Storage Backend**: Saat ini backend Auth menggunakan *in-memory array* (`const users = []`) dan akan me-reset daftar pengguna bila server Node.js restart. Untuk keperluan *production*, kamu dapat mengaitkannya ke database sejati seperti PostgreSQL, MySQL, atau MongoDB.
