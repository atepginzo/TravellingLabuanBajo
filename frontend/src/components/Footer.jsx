import { Compass, Globe, MessageCircle, Video, Mail, Phone, MapPin } from 'lucide-react';

const socialLinks = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  { icon: Video, href: '#', label: 'Video' },
];

export default function Footer() {
  return (
    <footer id="kontak" className="relative border-t border-white/5">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-ocean-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#beranda" className="flex items-center gap-2 group">
              <Compass className="w-7 h-7 text-ocean-400 group-hover:rotate-45 transition-transform duration-500" strokeWidth={1.5} />
              <span className="font-heading text-lg font-bold">
                <span className="text-white">Travelling</span>
                <span className="gradient-text">LabuanBajo</span>
              </span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Agen perjalanan wisata premium yang menghadirkan pengalaman tak terlupakan di Labuan Bajo dan sekitarnya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-3">
              {['Beranda', 'Paket Wisata', 'Kontak'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item === 'Paket Wisata' ? 'paket' : item.toLowerCase()}`}
                    className="text-gray-400 text-sm hover:text-ocean-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-ocean-400 flex-shrink-0" />
                Jl. Pantai Pede, Labuan Bajo, NTT
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-ocean-400 flex-shrink-0" />
                +62 812 3456 7890
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-ocean-400 flex-shrink-0" />
                info@travellinglabuanbajo.id
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} TravellingLabuanBajo. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-xl glass-light flex items-center justify-center text-gray-400 hover:text-ocean-400 hover:border-ocean-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
