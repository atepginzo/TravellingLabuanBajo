import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, Loader2, AlertCircle, Send } from 'lucide-react';

export default function TourList() {
  const [paket, setPaket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/paket')
      .then((res) => {
        setPaket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Gagal memuat data paket wisata.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="paket" className="py-24 px-4">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <Loader2 className="w-10 h-10 text-ocean-400 animate-spin" />
          <p className="text-gray-400">Memuat paket wisata...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="paket" className="py-24 px-4">
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 rounded-full border border-red-400/30 text-red-300 hover:bg-red-400/10 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="paket" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-ocean-400 text-sm font-medium mb-4">
            Paket Wisata Kami
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Pilih Petualanganmu
          </h2>
          <p className="max-w-xl mx-auto text-gray-400">
            Jelajahi beragam paket wisata yang dirancang khusus untuk pengalaman terbaik di Labuan Bajo.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paket.map((item, index) => (
            <div
              key={item.id}
              className="group glass rounded-2xl overflow-hidden hover:border-ocean-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-ocean-500/10 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-ocean-300 text-xs font-semibold">
                  {item.durasi}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-ocean-300 transition-colors duration-300">
                  {item.nama}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                  {item.deskripsi}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 text-ocean-400" />
                    <span>{item.durasi}</span>
                  </div>
                  <span className="text-sunset-400 font-bold text-lg">{item.harga}</span>
                </div>

                {/* Book Button — now links to /pesan/:id */}
                <Link
                  to={`/pesan/${item.id}`}
                  className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-ocean-500/10 text-ocean-400 border border-ocean-500/20 hover:bg-ocean-500 hover:text-white hover:shadow-lg hover:shadow-ocean-500/25"
                >
                  <Send className="w-4 h-4" />
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
