import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { discoveries } from '../data/discoveries';

export default function Discovery() {
  return (
    <section id="discovery" className="py-24 px-4 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sunset-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-ocean-400 text-sm font-medium mb-4">
            Eksplorasi
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Jelajahi Labuan Bajo{' '}
            <span className="gradient-text">Lebih Dalam</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Dari panorama darat yang menakjubkan hingga keajaiban bawah laut, Labuan Bajo menyimpan banyak cerita untuk ditemukan.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discoveries.map((cat, index) => (
            <Link
              to={`/discovery/${cat.slug}`}
              key={cat.slug}
              className="group relative h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer animate-fade-in-up block"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-900 via-deep-900/60 to-transparent group-hover:via-deep-900/40 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-ocean-400 text-xs font-semibold uppercase tracking-widest mb-2">
                  {cat.subtitle}
                </span>
                <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-ocean-300 transition-colors duration-300">
                  {cat.title}
                </h3>
                <p className="text-gray-300/80 text-sm leading-relaxed mb-4 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                  {cat.description}
                </p>
                <div className="flex items-center gap-2 text-ocean-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Jelajahi</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Top border glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ocean-500 to-sunset-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
