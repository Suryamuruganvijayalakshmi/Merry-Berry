import React from 'react';
import { Heart, Phone, MapPin, Globe, Star, ArrowUp } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      style={{
        backgroundColor: '#150217',
        color: '#FFFFFF',
        paddingTop: '6rem',
        paddingBottom: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Main Footer Row */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4.5rem',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.8rem',
                letterSpacing: '0.08em',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                display: 'block',
              }}>
                MERRY <span style={{ color: 'var(--color-berry-pink)' }}>BERRY</span>
              </span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.3em',
                color: 'var(--color-mango)',
                textTransform: 'uppercase',
              }}>
                ICE CREAM CAFE
              </span>
            </div>

            <p style={{
              fontFamily: 'var(--font-accent)',
              fontStyle: 'italic',
              fontSize: '1.15rem',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '1.5rem',
              lineHeight: 1.4,
            }}>
              “{CAFE_INFO.tagline}”
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.8)',
            }}>
              <Star size={14} fill="#FFB300" color="#FFB300" />
              <span><strong>4.9 ★ Rating</strong> · 64 Google Reviews</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-mango)',
              marginBottom: '1.5rem',
            }}>
              QUICK LINKS
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Home', href: '#hero-track' },
                { name: 'Menu', href: '#menu' },
                { name: 'Flavours', href: '#flavours' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Reviews', href: '#reviews' },
                { name: 'Contact', href: '#location' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-berry-pink)')}
                    onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.75)')}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-mango)',
              marginBottom: '1.5rem',
            }}>
              VISIT US
            </h4>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.2rem', alignItems: 'flex-start' }}>
              <MapPin size={18} color="var(--color-berry-pink)" style={{ flexShrink: 0, marginTop: '3px' }} />
              <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                AYANA PLAZA, opp. GOLDEN MAHAL,<br />
                Solar Pirivu, Solar,<br />
                Erode, Tamil Nadu 638002
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.2rem', alignItems: 'center' }}>
              <Phone size={18} color="var(--color-berry-pink)" style={{ flexShrink: 0 }} />
              <a
                href={`tel:${CAFE_INFO.phoneClean}`}
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textDecoration: 'none',
                }}
              >
                {CAFE_INFO.phone}
              </a>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              Open Daily: 11:00 AM – 10:00 PM
            </p>
          </div>

          {/* Social Icons & Back to Top */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-mango)',
              marginBottom: '1.5rem',
            }}>
              CONNECT WITH US
            </h4>

            <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '2rem' }}>
              {[
                { icon: <InstagramIcon />, label: 'Instagram', href: 'https://instagram.com' },
                { icon: <FacebookIcon />, label: 'Facebook', href: 'https://facebook.com' },
                { icon: <Globe size={18} />, label: 'Google Maps', href: CAFE_INFO.mapsUrl },
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-berry-pink)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="btn-ghost-light"
              style={{
                padding: '0.6rem 1.4rem',
                fontSize: '0.8rem',
                gap: '0.4rem',
              }}
            >
              <ArrowUp size={16} /> BACK TO TOP
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
          color: 'rgba(255, 255, 255, 0.5)',
        }}>
          <div>
            © {new Date().getFullYear()} MERRY BERRY ICE CREAM CAFE. All rights reserved. Erode, Tamil Nadu.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Handcrafted with <Heart size={14} color="var(--color-berry-pink)" fill="var(--color-berry-pink)" /> in Solar Pirivu
          </div>
        </div>

      </div>
    </footer>
  );
}
