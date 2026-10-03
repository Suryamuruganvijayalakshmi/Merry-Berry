import React from 'react';
import { Sparkles, Heart, ShieldCheck, Users, Clock, Award, Star } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export default function AboutSection() {
  const pillars = [
    {
      title: "Fresh Ingredients",
      desc: "Wholesome fresh milk, farm-picked real berries, and natural extracts — zero artificial short-cuts.",
      icon: <Sparkles size={22} className="text-berry" />,
    },
    {
      title: "Delicious Flavours",
      desc: "From wild berry infusions and royal kulfi faloodas to decadent Belgian chocolate truffles.",
      icon: <Award size={22} className="text-berry" />,
    },
    {
      title: "Generous Portions",
      desc: "Hefty multi-layered scoops and lavish toppings that guarantee complete sweet satisfaction.",
      icon: <Heart size={22} className="text-berry" />,
    },
    {
      title: "Friendly Service",
      desc: "Warm smiles, cozy velvet seating, and a genuine heartfelt hospitality that makes you feel at home.",
      icon: <Users size={22} className="text-berry" />,
    },
  ];

  return (
    <section 
      id="story"
      style={{
        position: 'relative',
        backgroundColor: '#240624',
        color: '#FFFFFF',
        paddingTop: '6rem',
        paddingBottom: '8rem',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 57, 123, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(106, 20, 107, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              letterSpacing: '0.3em',
              fontWeight: 800,
              color: 'var(--color-mango)',
              textTransform: 'uppercase',
              background: 'rgba(255, 179, 0, 0.12)',
              border: '1px solid rgba(255, 179, 0, 0.25)',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
            }}>
              OUR STORY & PHILOSOPHY
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: '1.5rem',
          }}>
            MORE THAN JUST <br />
            <span className="gradient-text-berry" style={{ WebkitTextFillColor: 'initial', color: 'var(--color-berry-pink)' }}>
              ICE CREAM
            </span>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: 400,
          }}>
            Merry Berry Ice Cream Cafe is a welcoming destination for delicious ice creams, sundaes, 
            faloodas and refreshing treats, with a relaxed atmosphere and friendly service in Solar, Erode.
          </p>
        </div>

        {/* Editorial Feature Layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
        >
          {/* Left: Atmospheric Cafe Photo */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                position: 'relative',
              }}
            >
              <img 
                src="/images/cafe_interior.jpg" 
                alt="Merry Berry Ice Cream Cafe Interior at Ayana Plaza, Solar, Erode"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.7s ease',
                }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(20, 3, 20, 0.85) 100%)',
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem' }}>
                    AYANA PLAZA, SOLAR
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                    Opposite Golden Mahal, Erode
                  </div>
                </div>
                <div style={{
                  background: 'rgba(230, 57, 123, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                }}>
                  OPEN DAILY TILL 10 PM
                </div>
              </div>
            </div>

            {/* Floating Highlight Badge */}
            <div 
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: 'rgba(36, 6, 36, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.6rem 1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
                zIndex: 5,
              }}
              className="animate-float-soft"
            >
              <div style={{
                background: '#FFB300',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#240624',
                fontWeight: 900,
                flexShrink: 0,
              }}>
                <Star size={18} fill="#240624" />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '0.95rem', color: '#FFFFFF' }}>4.9 ★ RATED</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.7)' }}>64 Google Reviews</div>
              </div>
            </div>
          </div>

          {/* Right: 4 Core Pillars Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--color-mango)',
            }}>
              THE MERRY BERRY PROMISE
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {pillars.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '1.6rem',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.09)';
                    e.currentTarget.style.borderColor = 'rgba(230, 57, 123, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
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
                    marginBottom: '1rem',
                  }}>
                    {item.icon}
                  </div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    marginBottom: '0.4rem',
                    color: '#FFFFFF',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'rgba(255, 255, 255, 0.72)',
                    lineHeight: 1.5,
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
