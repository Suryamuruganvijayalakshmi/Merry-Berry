import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, MapPin, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export default function Navbar({ heroProgress, cartCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Reveal navbar naturally as hero progress reaches >= 0.85 OR if user has scrolled past hero
  const isVisible = heroProgress >= 0.82;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero-track" },
    { label: "Our Story", href: "#story" },
    { label: "Flavours", href: "#flavours" },
    { label: "Menu", href: "#menu" },
    { label: "Experience", href: "#experience" },
    { label: "Reviews", href: "#reviews" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit Us", href: "#location" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = href === '#hero-track' ? 0 : element.getBoundingClientRect().top + window.scrollY - 75;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 100,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: isVisible ? 'auto' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled
            ? 'rgba(36, 6, 36, 0.85)'
            : 'rgba(36, 6, 36, 0.65)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.25)' : 'none',
        }}
      >
        <div 
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'var(--nav-height)',
          }}
        >
          {/* Brand Logo */}
          <a
            href="#hero-track"
            onClick={(e) => handleLinkClick(e, '#hero-track')}
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}>
              MERRY <span style={{ color: 'var(--color-berry-pink)' }}>BERRY</span>
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: 'var(--color-mango)',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}>
              ICE CREAM CAFE
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.8rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  position: 'relative',
                  padding: '0.3rem 0',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--color-berry-pink)')}
                onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.85)')}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={onOpenCart}
              className="btn-primary"
              aria-label="View order tray"
              style={{
                padding: '0.6rem 1.1rem',
                fontSize: '0.8rem',
                gap: '0.4rem',
                minHeight: '40px',
              }}
            >
              <ShoppingBag size={16} />
              <span className="nav-order-label">ORDER</span>
              {cartCount > 0 && (
                <span
                  style={{
                    background: '#FFFFFF',
                    color: 'var(--color-purple-primary)',
                    borderRadius: '9999px',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="mobile-hamburger"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(20, 3, 20, 0.96)',
          backdropFilter: 'blur(24px)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.4rem',
          padding: '2rem',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          opacity: mobileMenuOpen ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.8rem',
          letterSpacing: '0.3em',
          color: 'var(--color-mango)',
          textTransform: 'uppercase',
          fontWeight: 800,
        }}>
          NAVIGATION
        </span>

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            style={{
              color: '#FFFFFF',
              textDecoration: 'none',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'color 0.2s ease',
            }}
          >
            {link.label}
          </a>
        ))}

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%', maxWidth: '280px' }}>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            <ShoppingBag size={18} />
            ORDER ONLINE {cartCount > 0 ? `(${cartCount})` : ''}
          </button>
          
          <a
            href={`tel:${CAFE_INFO.phoneClean}`}
            className="btn-ghost-light"
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Phone size={16} /> CALL {CAFE_INFO.phone}
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
