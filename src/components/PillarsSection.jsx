import React from 'react';
import { Sparkles, Layers, HeartHandshake, Coffee } from 'lucide-react';
import { CAFE_PILLARS } from '../data/cafeData';

export default function PillarsSection() {
  const iconMap = {
    Sparkles: <Sparkles size={28} />,
    Layers: <Layers size={28} />,
    HeartHandshake: <HeartHandshake size={28} />,
    Coffee: <Coffee size={28} />,
  };

  return (
    <section 
      style={{
        backgroundColor: '#240624',
        color: '#FFFFFF',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4.5rem' }}>
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
            THE MERRY BERRY DIFFERENCE
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            lineHeight: 1.1,
          }}>
            WHY PEOPLE LOVE <br />
            <span className="gradient-text-berry" style={{ WebkitTextFillColor: 'initial', color: 'var(--color-berry-pink)' }}>
              MERRY BERRY
            </span>
          </h2>
        </div>

        {/* 4 Pillars Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
          }}
        >
          {CAFE_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="pillar-card"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '2.5rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.35s ease',
              }}
            >
              {/* Pillar Number */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '2rem',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(230, 57, 123, 0.25), rgba(69, 13, 70, 0.5))',
                  border: '1px solid rgba(230, 57, 123, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-berry-pink)',
                }}>
                  {iconMap[pillar.icon]}
                </div>

                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.4rem',
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.15)',
                  lineHeight: 1,
                }}>
                  0{idx + 1}
                </span>
              </div>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '0.3rem',
                }}>
                  {pillar.title}
                </h3>

                <h4 style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--color-mango)',
                  marginBottom: '1rem',
                }}>
                  {pillar.subtitle}
                </h4>

                <p style={{
                  fontSize: '0.92rem',
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: 1.6,
                }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .pillar-card:hover {
          transform: translateY(-8px);
          background-color: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(230, 57, 123, 0.45) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>
    </section>
  );
}
