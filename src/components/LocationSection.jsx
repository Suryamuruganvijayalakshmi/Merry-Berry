import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Sparkles, Utensils, CheckCircle } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export default function LocationSection() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(`${CAFE_INFO.name}, ${CAFE_INFO.location}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="location"
      style={{
        backgroundColor: '#240624',
        color: '#FFFFFF',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow effects */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(230, 57, 123, 0.22) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            letterSpacing: '0.3em',
            fontWeight: 800,
            color: 'var(--color-mango)',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '0.8rem',
          }}>
            FIND YOUR HAPPINESS
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            COME FIND <span className="gradient-text-berry" style={{ WebkitTextFillColor: 'initial', color: 'var(--color-berry-pink)' }}>US</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 400,
          }}>
            Located conveniently at Ayana Plaza, right opposite Golden Mahal on Solar Pirivu, Erode.
          </p>
        </div>

        {/* Location Grid: Details Card & Interactive Custom Map */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'stretch',
          }}
        >
          {/* Left: Detail Card */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(230, 57, 123, 0.18)',
                color: 'var(--color-berry-pink)',
                border: '1px solid rgba(230, 57, 123, 0.35)',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.2rem',
              }}>
                CAFE DESTINATION
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.15,
                marginBottom: '1.8rem',
              }}>
                MERRY BERRY <br />
                <span style={{ color: 'var(--color-mango)' }}>ICE CREAM CAFE</span>
              </h3>

              {/* Address item */}
              <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(230, 57, 123, 0.15)',
                  border: '1px solid rgba(230, 57, 123, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-berry-pink)',
                  flexShrink: 0,
                }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    ADDRESS
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.82)', lineHeight: 1.5 }}>
                    AYANA PLAZA, opposite to GOLDEN MAHAL,<br />
                    Solar Pirivu, Solar,<br />
                    Erode, Tamil Nadu 638002
                  </p>
                  <button
                    onClick={copyAddress}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-mango)',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      marginTop: '0.5rem',
                      padding: 0,
                    }}
                  >
                    {copied ? <CheckCircle size={14} color="#10B981" /> : null}
                    {copied ? "COPIED TO CLIPBOARD" : "COPY FULL ADDRESS"}
                  </button>
                </div>
              </div>

              {/* Phone item */}
              <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.6rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(230, 57, 123, 0.15)',
                  border: '1px solid rgba(230, 57, 123, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-berry-pink)',
                  flexShrink: 0,
                }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    PHONE
                  </h4>
                  <a
                    href={`tel:${CAFE_INFO.phoneClean}`}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: 900,
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {CAFE_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Hours item */}
              <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '2.5rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  flexShrink: 0,
                }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    OPERATING HOURS
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#10B981' }}>
                      Open Daily
                    </span>
                    <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>· Closes 10:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Prominent Action Buttons */}
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <a
                href={CAFE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: '1 1 auto', minWidth: '160px' }}
              >
                <Navigation size={18} />
                GET DIRECTIONS
              </a>

              <a
                href={`tel:${CAFE_INFO.phoneClean}`}
                className="btn-secondary"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  flex: '1 1 auto',
                  minWidth: '140px',
                }}
              >
                <Phone size={18} />
                CALL US
              </a>

              <a
                href="#menu"
                className="btn-ghost-light"
                style={{ flex: '1 1 auto', minWidth: '140px' }}
              >
                <Utensils size={18} />
                VIEW MENU
              </a>
            </div>
          </div>

          {/* Right: Custom Visually-Integrated Interactive Map UI */}
          <div
            style={{
              backgroundColor: '#1E0520',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '440px',
            }}
          >
            {/* Map Top Bar */}
            <div
              style={{
                padding: '1rem 1.5rem',
                background: 'rgba(36, 6, 36, 0.9)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase' }}>
                  SOLAR PIRIVU, ERODE
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'monospace' }}>
                11.3198° N, 77.7478° E
              </span>
            </div>

            {/* Styled Map Canvas View */}
            <div
              style={{
                flexGrow: 1,
                position: 'relative',
                background: 'radial-gradient(circle at 50% 50%, #2A092B 0%, #150217 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '360px',
              }}
            >
              {/* Map grid lines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Road representations */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '14px',
                background: 'rgba(255, 255, 255, 0.12)',
                transform: 'rotate(-12deg)',
                boxShadow: '0 0 15px rgba(230, 57, 123, 0.2)',
              }}>
                <span style={{
                  position: 'absolute',
                  left: '12%',
                  top: '-20px',
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: 'rgba(255, 255, 255, 0.5)',
                  letterSpacing: '0.1em',
                }}>
                  SOLAR MAIN ROAD / KARUR HIGHWAY
                </span>
              </div>

              <div style={{
                position: 'absolute',
                width: '12px',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                left: '42%',
              }}>
                <span style={{
                  position: 'absolute',
                  bottom: '10%',
                  left: '16px',
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}>
                  SOLAR PIRIVU JUNCTION
                </span>
              </div>

              {/* Landmark 1: GOLDEN MAHAL */}
              <div
                style={{
                  position: 'absolute',
                  top: '25%',
                  left: '22%',
                  background: 'rgba(255, 179, 0, 0.15)',
                  border: '1px solid rgba(255, 179, 0, 0.4)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '10px',
                  color: 'var(--color-mango)',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  textAlign: 'center',
                }}
              >
                🏛️ GOLDEN MAHAL
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  Opposite to Cafe
                </div>
              </div>

              {/* Central Destination Pin: MERRY BERRY CAFE */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Pulsing beacon waves */}
                <div
                  className="animate-pulse-subtle"
                  style={{
                    position: 'absolute',
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'rgba(230, 57, 123, 0.3)',
                    top: '-15px',
                  }}
                />

                <div
                  style={{
                    background: 'linear-gradient(135deg, var(--color-strawberry), var(--color-purple-primary))',
                    border: '2px solid #FFFFFF',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(230, 57, 123, 0.8)',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <span style={{ fontSize: '1.8rem' }}>🍨</span>
                </div>

                {/* Card tag */}
                <div
                  style={{
                    marginTop: '0.8rem',
                    background: '#FFFFFF',
                    color: 'var(--color-purple-deep)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '14px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    textAlign: 'center',
                    border: '2px solid var(--color-berry-pink)',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    letterSpacing: '0.04em',
                  }}>
                    MERRY BERRY ICE CREAM CAFE
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-text-muted)',
                    fontWeight: 700,
                  }}>
                    Ayana Plaza · Solar Pirivu, Erode
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Map Controls */}
            <div
              style={{
                padding: '1rem 1.5rem',
                background: 'rgba(36, 6, 36, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.82rem' }}>
                <Navigation size={15} color="var(--color-berry-pink)" />
                Easy Parking Available at Ayana Plaza
              </div>

              <a
                href={CAFE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--color-mango)',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                OPEN GOOGLE MAPS <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
