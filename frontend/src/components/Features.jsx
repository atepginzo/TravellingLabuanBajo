import { Users, Anchor, Leaf } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Pemandu Lokal Berpengalaman',
    description:
      'Tim pemandu kami adalah warga lokal Flores yang mengenal setiap sudut Labuan Bajo. Pengalaman lebih dari 10 tahun menjamin perjalanan aman & informatif.',
    accent: 'ocean',
  },
  {
    icon: Anchor,
    title: 'Armada Phinisi Premium',
    description:
      'Berlayar dengan kapal phinisi tradisional yang telah dimodernisasi. Dilengkapi kabin nyaman, sundeck, dan peralatan snorkeling lengkap.',
    accent: 'sunset',
  },
  {
    icon: Leaf,
    title: 'Fokus Keberlanjutan Alam',
    description:
      'Setiap perjalanan kami menerapkan prinsip eco-tourism. Kami berkomitmen menjaga kelestarian Taman Nasional Komodo untuk generasi mendatang.',
    accent: 'emerald',
  },
];

const accentStyles = {
  ocean: {
    iconBg: 'bg-ocean-500/10',
    iconColor: 'text-ocean-400',
    glow: 'group-hover:shadow-ocean-500/20',
    border: 'group-hover:border-ocean-500/30',
  },
  sunset: {
    iconBg: 'bg-sunset-400/10',
    iconColor: 'text-sunset-400',
    glow: 'group-hover:shadow-sunset-400/20',
    border: 'group-hover:border-sunset-400/30',
  },
  emerald: {
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/20',
    border: 'group-hover:border-emerald-500/30',
  },
};

export default function Features() {
  return (
    <section id="keunggulan" className="py-24 px-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-ocean-400 text-sm font-medium mb-4">
            Mengapa Memilih Kami?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Keunggulan <span className="gradient-text">Kami</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Kami tidak sekadar agen wisata — kami adalah mitra perjalanan Anda yang memahami Labuan Bajo dari hati.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const style = accentStyles[feature.accent];
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group glass rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${style.glow} ${style.border} animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${style.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${style.iconColor}`} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-ocean-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative line */}
                <div className={`mt-6 h-0.5 w-12 rounded-full ${style.iconBg} group-hover:w-full transition-all duration-500`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
