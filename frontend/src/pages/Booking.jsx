import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
} from 'lucide-react';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    nama: '',
    email: '',
    whatsapp: '',
    tanggal: '',
    jumlahOrang: '1',
    catatan: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/paket')
      .then((res) => {
        const found = res.data.find((p) => p.id === Number(id));
        setPaket(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paket) return;

    setSending(true);

    // 1) Send to backend for logging
    try {
      await axios.post('http://localhost:5000/api/pesan', {
        paketId: paket.id,
        namaPaket: paket.nama,
        tanggal: form.tanggal,
        nama: form.nama,
        email: form.email,
        whatsapp: form.whatsapp,
        jumlahOrang: form.jumlahOrang,
        catatan: form.catatan,
      });
    } catch {
      // Proceed to WhatsApp even if backend fails
    }

    // 2) Build WhatsApp message
    const adminNumber = '6283111612158'; // Replace with actual admin number
    const message = encodeURIComponent(
      `*PEMESANAN PAKET WISATA*\n` +
      `━━━━━━━━━━━━━━━━━━\n\n` +
      `*Paket:* ${paket.nama}\n` +
      `*Harga:* ${paket.harga}/orang\n` +
      `*Durasi:* ${paket.durasi}\n\n` +
      `*Nama:* ${form.nama}\n` +
      `*Email:* ${form.email}\n` +
      `*WhatsApp:* ${form.whatsapp}\n` +
      `*Tanggal:* ${form.tanggal}\n` +
      `*Jumlah Orang:* ${form.jumlahOrang} orang\n\n` +
      (form.catatan ? `*Catatan:*\n${form.catatan}\n\n` : '') +
      `Dikirim dari TravellingLabuanBajo`
    );

    setSending(false);
    setSent(true);

    // 3) Open WhatsApp
    setTimeout(() => {
      window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-ocean-400 animate-spin" />
      </div>
    );
  }

  if (!paket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="font-heading text-4xl font-bold text-white">Paket Tidak Ditemukan</h1>
        <p className="text-gray-400">Paket wisata yang Anda cari tidak tersedia.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-ocean-500 text-white font-semibold hover:bg-ocean-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">Pesanan Terkirim!</h1>
        <p className="text-gray-400 max-w-md">
          Formulir pemesanan Anda untuk <span className="text-ocean-400 font-semibold">{paket.nama}</span> telah
          dikirimkan ke WhatsApp admin. Tim kami akan segera menghubungi Anda.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => {
              setSent(false);
              setForm({ nama: '', email: '', whatsapp: '', tanggal: '', jumlahOrang: '1', catatan: '' });
            }}
            className="px-6 py-3 rounded-full border border-ocean-500/30 text-ocean-400 font-semibold hover:bg-ocean-500/10 transition-colors cursor-pointer"
          >
            Pesan Paket Lain
          </button>
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-ocean-500 text-white font-semibold hover:bg-ocean-600 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-900">
      {/* Hero strip */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={paket.gambar}
          alt={paket.nama}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-ocean-400 hover:text-ocean-300 text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Pesan {paket.nama}
          </h1>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Left: Package Info */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="glass rounded-2xl overflow-hidden sticky top-24">
              <img
                src={paket.gambar}
                alt={paket.nama}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="font-heading text-xl font-bold text-white">{paket.nama}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{paket.deskripsi}</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-gray-400 text-sm">{paket.durasi}</span>
                  <span className="text-sunset-400 font-bold text-xl">{paket.harga}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="font-heading text-2xl font-bold text-white mb-2">Formulir Pemesanan</h2>
              <p className="text-gray-400 text-sm mb-8">
                Isi data di bawah ini. Pesanan akan dikirimkan ke WhatsApp admin kami untuk konfirmasi.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="nama" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4 text-ocean-400" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    required
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 text-ocean-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
                    placeholder="contoh@email.com"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Phone className="w-4 h-4 text-ocean-400" />
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    required
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                {/* Date & People row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tanggal" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 text-ocean-400" />
                      Tanggal Keberangkatan
                    </label>
                    <input
                      type="date"
                      id="tanggal"
                      name="tanggal"
                      required
                      value={form.tanggal}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="jumlahOrang" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Users className="w-4 h-4 text-ocean-400" />
                      Jumlah Orang
                    </label>
                    <select
                      id="jumlahOrang"
                      name="jumlahOrang"
                      value={form.jumlahOrang}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n} className="bg-deep-800 text-white">
                          {n} orang
                        </option>
                      ))}
                      <option value="10+" className="bg-deep-800 text-white">10+ orang</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="catatan" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <MessageSquare className="w-4 h-4 text-ocean-400" />
                    Catatan Tambahan <span className="text-gray-500">(opsional)</span>
                  </label>
                  <textarea
                    id="catatan"
                    name="catatan"
                    rows={4}
                    value={form.catatan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all resize-none"
                    placeholder="Permintaan khusus, alergi makanan, dll."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 cursor-pointer"
                >
                  {sending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {sending ? 'Mengirim...' : 'Kirim Pesanan via WhatsApp'}
                </button>

                <p className="text-gray-500 text-xs text-center">
                  Pesanan akan dikirim ke WhatsApp admin. Pembayaran dilakukan langsung dengan tim kami.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
