import { ChevronDown, MapPin, Star, Users } from 'lucide-react';

const stats = [
  { icon: MapPin, value: '20+', label: 'Destinasi' },
  { icon: Users, value: '5000+', label: 'Wisatawan' },
  { icon: Star, value: '4.9', label: 'Rating' },
];

export default function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/18340629/pexels-photo-18340629.jpeg"
          alt="Labuan Bajo aerial view"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Decorative Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-ocean-400/40 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-sunset-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-ocean-300/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-ocean-300 text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-ocean-400 rounded-full animate-pulse" />
          Destinasi #1 Indonesia
        </div>

        {/* Heading */}
        <h1 className="animate-fade-in-up font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6" style={{ animationDelay: '0.15s' }}>
          Jelajahi Keajaiban{' '}
          <span className="gradient-text">Labuan Bajo</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in-up max-w-2xl mx-auto text-base sm:text-lg text-gray-300/90 leading-relaxed mb-10" style={{ animationDelay: '0.3s' }}>
          Temukan surga tersembunyi di jantung Nusa Tenggara Timur. 
          Dari Pulau Komodo hingga Pantai Pink, kami hadirkan pengalaman wisata bahari tak terlupakan.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4 mb-16" style={{ animationDelay: '0.45s' }}>
          <a
            href="#paket"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-ocean-400 to-ocean-600 text-white font-bold text-lg shadow-xl shadow-ocean-500/25 hover:shadow-2xl hover:shadow-ocean-500/40 hover:-translate-y-1 transition-all duration-300 animate-pulse-glow"
          >
            Pesan Sekarang
          </a>
          <a
            href="#paket"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            Lihat Paket Wisata
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up flex flex-wrap items-center justify-center gap-8 sm:gap-12" style={{ animationDelay: '0.6s' }}>
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl glass-light flex items-center justify-center">
                <Icon className="w-5 h-5 text-ocean-400" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg leading-none">{value}</p>
                <p className="text-gray-400 text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#paket"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/50 hover:text-ocean-400 transition-colors duration-300 animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
