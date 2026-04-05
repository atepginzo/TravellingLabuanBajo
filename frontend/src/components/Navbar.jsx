import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const navLinks = [
  { label: 'Beranda', href: '/#beranda' },
  { label: 'Paket', href: '/#paket' },
  { label: 'Kontak', href: '/#kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e, href) => {
    setIsOpen(false);
    if (isHome && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    setIsOpen(false);
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-ocean-500/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Compass
              className="w-8 h-8 text-ocean-400 group-hover:rotate-45 transition-transform duration-500"
              strokeWidth={1.5}
            />
            <span className="font-heading text-xl font-bold tracking-tight">
              <span className="text-white">Travelling</span>
              <span className="gradient-text">LabuanBajo</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-ocean-400 rounded-full transition-all duration-300 group-hover:w-3/4" />
                </a>
              </li>
            ))}

            {/* Auth Button */}
            <li className="ml-4">
              {user ? (
                /* Logged in — show user dropdown */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-full glass-light hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-ocean-500/25">
                      {getInitials(user.nama)}
                    </div>
                    <span className="text-white text-sm font-medium max-w-[100px] truncate">
                      {user.nama.split(' ')[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-64 glass rounded-2xl overflow-hidden shadow-2xl shadow-ocean-500/10 animate-fade-in-up py-2">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-white font-semibold text-sm">{user.nama}</p>
                        <p className="text-gray-500 text-xs truncate">{user.email}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-white/5 transition-all duration-200 text-sm cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Not logged in — show login button */
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-ocean-500 to-ocean-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-ocean-500/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Masuk
                </button>
              )}
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass mx-4 mt-3 rounded-2xl p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {link.label}
              </a>
            ))}

            {user ? (
              <>
                {/* User info in mobile */}
                <div className="flex items-center gap-3 px-4 py-3 border-t border-white/5 mt-2 pt-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(user.nama)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-semibold truncate">{user.nama}</p>
                    <p className="text-gray-500 text-xs truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 mt-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-sm cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowAuth(true);
                }}
                className="w-full flex items-center justify-center gap-2 mt-3 px-5 py-3 rounded-xl bg-gradient-to-r from-ocean-500 to-ocean-600 text-white font-semibold cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Masuk / Daftar
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  );
}
