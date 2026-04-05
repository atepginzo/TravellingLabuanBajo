import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { login, register } = useAuth();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setForm({ nama: '', email: '', password: '', confirmPassword: '' });
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && form.password !== form.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.nama, form.email, form.password);
      }
      onClose();
      setForm({ nama: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass rounded-2xl overflow-hidden animate-fade-in-up shadow-2xl shadow-ocean-500/10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-ocean-500/25">
            {mode === 'login' ? (
              <LogIn className="w-7 h-7 text-white" />
            ) : (
              <UserPlus className="w-7 h-7 text-white" />
            )}
          </div>
          <h2 className="font-heading text-2xl font-bold text-white">
            {mode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Baru'}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {mode === 'login'
              ? 'Masuk untuk menikmati fitur lengkap TravellingLabuanBajo'
              : 'Daftar gratis dan mulai petualangan Anda'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="px-8 mb-6">
          <div className="flex rounded-xl bg-white/5 p-1">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                mode === 'login'
                  ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${
                mode === 'register'
                  ? 'bg-ocean-500 text-white shadow-lg shadow-ocean-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Daftar
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
          {/* Error message */}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Name (register only) */}
          {mode === 'register' && (
            <div>
              <label htmlFor="auth-nama" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 text-ocean-400" />
                Nama Lengkap
              </label>
              <input
                type="text"
                id="auth-nama"
                name="nama"
                required
                value={form.nama}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
                placeholder="Masukkan nama lengkap"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="auth-email" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 text-ocean-400" />
              Email
            </label>
            <input
              type="email"
              id="auth-email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
              placeholder="contoh@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="auth-password" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Lock className="w-4 h-4 text-ocean-400" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="auth-password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (register only) */}
          {mode === 'register' && (
            <div>
              <label htmlFor="auth-confirm" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Lock className="w-4 h-4 text-ocean-400" />
                Konfirmasi Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="auth-confirm"
                name="confirmPassword"
                required
                minLength={6}
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 transition-all"
                placeholder="Ulangi password"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-ocean-500/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : mode === 'login' ? (
              <LogIn className="w-4 h-4" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            {loading
              ? 'Memproses...'
              : mode === 'login'
                ? 'Masuk'
                : 'Buat Akun'}
          </button>

          {/* Switch mode text */}
          <p className="text-center text-gray-500 text-sm pt-2">
            {mode === 'login' ? (
              <>
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="text-ocean-400 hover:text-ocean-300 font-semibold transition-colors cursor-pointer"
                >
                  Daftar sekarang
                </button>
              </>
            ) : (
              <>
                Sudah punya akun?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-ocean-400 hover:text-ocean-300 font-semibold transition-colors cursor-pointer"
                >
                  Masuk
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
