import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { articles, tagColors } from '../data/articles';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="font-heading text-4xl font-bold text-white">Artikel Tidak Ditemukan</h1>
        <p className="text-gray-400">Artikel yang Anda cari tidak tersedia.</p>
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
      <section className="relative h-[45vh] sm:h-[55vh] flex items-end overflow-hidden">
        <img
          src={article.heroImage}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-ocean-400 hover:text-ocean-300 text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${tagColors[article.tag]}`}>
            {article.tag}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-ocean-400" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-ocean-400" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-ocean-400" />
              {article.readTime} baca
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Lead paragraph */}
        <p className="text-lg text-gray-300 leading-relaxed mb-12 border-l-4 border-ocean-500 pl-6">
          {article.excerpt}
        </p>

        {/* Content sections */}
        <div className="space-y-12">
          {article.content.map((section) => (
            <div key={section.heading}>
              <h2 className="font-heading text-2xl font-bold text-white mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Share / Back */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-ocean-400 hover:text-ocean-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            to="/#paket"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-semibold hover:shadow-lg hover:shadow-ocean-500/30 transition-all duration-300"
          >
            Lihat Paket Wisata
          </Link>
        </div>
      </article>

      {/* Related Articles */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h3 className="font-heading text-2xl font-bold text-white mb-8">Artikel Lainnya</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles
            .filter((a) => a.slug !== slug)
            .map((a) => (
              <Link
                key={a.slug}
                to={`/artikel/${a.slug}`}
                className="group glass rounded-2xl overflow-hidden hover:border-ocean-500/30 transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-900/70 to-transparent" />
                </div>
                <div className="p-5">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${tagColors[a.tag]}`}>
                    {a.tag}
                  </span>
                  <h4 className="font-heading text-lg font-bold text-white group-hover:text-ocean-300 transition-colors duration-300">
                    {a.title}
                  </h4>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
