import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Aisyah Putri',
    role: 'Travel Blogger',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 5,
    text: 'Pengalaman sailing 3 hari 2 malam bersama TravellingLabuanBajo benar-benar luar biasa! Pemandunya ramah, kapalnya bersih, dan sunset di Gili Lawa tak bisa dilupakan seumur hidup.',
  },
  {
    name: 'Budi Santoso',
    role: 'Fotografer Profesional',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Sebagai fotografer, saya sudah ke banyak tempat. Tapi Labuan Bajo tetap juara! Terima kasih timnya sudah mengantar ke spot-spot tersembunyi yang bahkan belum banyak diketahui turis.',
  },
  {
    name: 'Maria Chen',
    role: 'Digital Nomad',
    avatar: 'https://i.pravatar.cc/150?img=32',
    rating: 5,
    text: 'One Day Trip-nya worth every penny! Snorkeling di Kanawa Island rasanya seperti berenang di akuarium raksasa. Pasti bakal balik lagi tahun depan dengan paket yang lebih lama.',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-sunset-400 fill-sunset-400' : 'text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-24 px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-ocean-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-sunset-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass-light text-ocean-400 text-sm font-medium mb-4">
            Testimoni
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Cerita Perjalanan <span className="gradient-text">Mereka</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400">
            Dengarkan pengalaman nyata dari para wisatawan yang telah menjelajahi Labuan Bajo bersama kami.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className="group glass rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-ocean-500/10 hover:border-ocean-500/30 animate-fade-in-up relative"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-ocean-500/20 mb-4 group-hover:text-ocean-500/40 transition-colors duration-300" />

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={t.rating} />
              </div>

              {/* Text */}
              <p className="text-gray-300/90 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-ocean-500/20"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
