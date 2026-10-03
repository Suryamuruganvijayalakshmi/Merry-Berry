import React, { useState } from 'react';
import { Plus, Check, Sparkles, Heart } from 'lucide-react';
import { SIGNATURE_FLAVOURS } from '../data/cafeData';

export default function FlavoursSection({ onAddToCart }) {
  const [activeMood, setActiveMood] = useState('all');
  const [addedId, setAddedId] = useState(null);

  const moods = [
    { id: 'all', label: 'All Moods', emoji: '✨' },
    { id: 'berry', label: 'Berry Obsession', emoji: '🍓' },
    { id: 'rich', label: 'Decadent & Rich', emoji: '🍫' },
    { id: 'tropical', label: 'Tropical & Royal', emoji: '🥭' },
  ];

  const filteredFlavours = SIGNATURE_FLAVOURS.filter(item => {
    if (activeMood === 'all') return true;
    if (activeMood === 'berry') return item.id === 'strawberry' || item.id === 'blueberry';
    if (activeMood === 'rich') return item.id === 'chocolate' || item.id === 'vanilla';
    if (activeMood === 'tropical') return item.id === 'mango' || item.id === 'falooda';
    return true;
  });

  const handleAdd = (flavour) => {
    onAddToCart({
      id: flavour.id,
      name: flavour.name,
      price: flavour.price,
      image: flavour.image,
      category: 'Flavour Scoop',
    });
    setAddedId(flavour.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section 
      id="flavours"
      style={{
        backgroundColor: '#FAF7F2',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background shapes */}
      <div 
        style={{
          position: 'absolute',
          top: '5%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(230, 57, 123, 0.05)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 179, 0, 0.08)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}>
            <span className="badge-berry">
              <Sparkles size={14} /> ARTISANAL COLLECTION
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-purple-deep)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            WHAT'S YOUR <span className="gradient-text-berry">MOOD?</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}>
            Every scoop is sculpted from rich farm dairy and authentic whole fruit infusions. 
            Choose your mood, indulge your senses.
          </p>

          {/* Mood filter pill tabs (horizontal touch swipe on mobile) */}
          <div 
            className="horizontal-scroll-touch"
            style={{
              gap: '0.5rem',
              marginTop: '1.8rem',
              padding: '0.4rem 0.6rem',
              background: 'rgba(69, 13, 70, 0.06)',
              borderRadius: '9999px',
              border: '1px solid rgba(69, 13, 70, 0.1)',
              maxWidth: '100%',
              justifyContent: 'center',
            }}
          >
            {moods.map((m) => {
              const active = activeMood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMood(m.id)}
                  style={{
                    border: 'none',
                    background: active ? 'var(--color-purple-primary)' : 'transparent',
                    color: active ? '#FFFFFF' : 'var(--color-purple-deep)',
                    padding: '0.55rem 1.1rem',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: active ? '0 4px 15px rgba(69, 13, 70, 0.25)' : 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ marginRight: '0.4rem' }}>{m.emoji}</span>
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Signature Flavour Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {filteredFlavours.map((item) => (
            <div
              key={item.id}
              className="flavour-card"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '1.8rem',
                boxShadow: '0 12px 35px rgba(34, 5, 36, 0.07)',
                border: '1px solid rgba(69, 13, 70, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Badge */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}>
                <span style={{
                  background: item.bgGradient,
                  color: item.color,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  border: `1px solid ${item.color}30`,
                }}>
                  {item.badge}
                </span>

                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  {item.calories}
                </span>
              </div>

              {/* Large Food Image with Hover Rotate & Zoom */}
              <div 
                style={{
                  width: '100%',
                  height: '270px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#F7EEF8',
                  marginBottom: '1.5rem',
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.name} at Merry Berry Ice Cream Cafe`}
                  loading="lazy"
                  className="flavour-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                  }}
                >
                  {item.emoji}
                </div>
              </div>

              {/* Text Information */}
              <div>
                <div style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: item.color,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  {item.tagline}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  color: 'var(--color-purple-deep)',
                  marginBottom: '0.6rem',
                  lineHeight: 1.2,
                }}>
                  {item.name}
                </h3>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                  marginBottom: '1.5rem',
                }}>
                  {item.description}
                </p>
              </div>

              {/* Price & Order Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(69, 13, 70, 0.08)',
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', textTransform: 'uppercase' }}>
                    Single Scoop
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    fontWeight: 900,
                    color: 'var(--color-purple-deep)',
                  }}>
                    ₹{item.price}
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(item)}
                  className="btn-primary"
                  style={{
                    padding: '0.65rem 1.3rem',
                    fontSize: '0.85rem',
                    background: addedId === item.id ? '#10B981' : undefined,
                  }}
                >
                  {addedId === item.id ? (
                    <>
                      <Check size={16} /> ADDED
                    </>
                  ) : (
                    <>
                      <Plus size={16} /> ORDER NOW
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .flavour-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 45px rgba(69, 13, 70, 0.14) !important;
          border-color: rgba(230, 57, 123, 0.3) !important;
        }
        .flavour-card:hover .flavour-image {
          transform: scale(1.08) rotate(1.5deg);
        }
      `}</style>
    </section>
  );
}
