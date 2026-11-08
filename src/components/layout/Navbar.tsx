import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Kollektion', path: '/kollektion' },
    { label: 'CUBE 01', path: '/kollektion/cube-01' },
    { label: 'Konfigurator', path: '/konfigurator' },
    { label: 'Der Weg', path: '/der-weg' },
    { label: 'Materialien', path: '/materialien' },
    { label: 'Atelier', path: '/atelier' },
    { label: 'Offerte', path: '/offerte' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || location.pathname !== '/'
            ? 'bg-charcoal/90 border-b border-warmWhite/10 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link to="/" className="group flex flex-col items-start focus:outline-none">
            <span className="font-serif text-2xl sm:text-3xl tracking-widest text-warmWhite font-medium group-hover:text-bronze transition-colors">
              NØRRA
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-warmWhite/50 uppercase -mt-1">
              Sauna · Schweiz
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 relative ${
                    isActive
                      ? 'text-bronze font-semibold'
                      : 'text-warmWhite/80 hover:text-warmWhite'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-bronze" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <Link
              to="/konfigurator"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-widest bg-warmWhite text-charcoal hover:bg-bronze hover:text-white transition-all duration-300 font-semibold"
            >
              <span>Konfigurieren</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-warmWhite hover:text-bronze transition-colors focus:outline-none"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-35 bg-charcoal/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-in fade-in duration-300">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-widest text-bronze uppercase">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-serif text-3xl text-warmWhite hover:text-bronze transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-warmWhite/15 flex flex-col gap-4">
            <Link
              to="/konfigurator"
              className="w-full py-4 text-center text-xs font-mono uppercase tracking-widest bg-bronze text-white font-semibold"
            >
              3D Konfigurator Starten
            </Link>
            <div className="flex justify-between text-[11px] font-mono text-warmWhite/50">
              <span>NØRRA SAUNA SCHWEIZ</span>
              <span>ZÜRICH · ST. MORITZ</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
