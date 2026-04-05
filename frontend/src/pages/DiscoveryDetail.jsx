import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Lightbulb } from 'lucide-react';
import { discoveries } from '../data/discoveries';

export default function DiscoveryDetail() {
  const { slug } = useParams();
  const discovery = discoveries.find((d) => d.slug === slug);

  if (!discovery) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="font-heading text-4xl font-bold text-white">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-400">Kategori yang Anda cari tidak tersedia.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-ocean-500 text-white font-semibold hover:bg-ocean-600 transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-900">
      {/* Hero */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-end overflow-hidden">
        <img
          src={discovery.heroImage}
          alt={discovery.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-ocean-400 hover:text-ocean-300 text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <span className="block text-ocean-400 text-xs font-semibold uppercase tracking-widest mb-3">
            {discovery.subtitle}
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
            {discovery.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <p className="text-lg text-gray-300 leading-relaxed mb-16 max-w-3xl">
          {discovery.description}
        </p>

        {/* Content Sections */}
        <div className="space-y-20">
          {discovery.content.map((section, index) => (
            <div
              key={section.heading}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden group">
                <img
                  src={section.image}
                  alt={section.heading}
                  className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-ocean-400 flex-shrink-0" />
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    {section.heading}
                  </h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Box */}
        <div className="mt-20 glass rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-6 h-6 text-sunset-400" />
            <h3 className="font-heading text-xl font-bold text-white">Tips Perjalanan</h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {discovery.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 bg-ocean-400 rounded-full flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Tertarik menjelajahi {discovery.title}?</p>
          <Link
            to="/#paket"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-ocean-400 to-ocean-600 text-white font-bold text-lg shadow-xl shadow-ocean-500/25 hover:shadow-2xl hover:shadow-ocean-500/40 hover:-translate-y-1 transition-all duration-300"
          >
            Lihat Paket Wisata
          </Link>
        </div>
      </section>
    </div>
  );
}
