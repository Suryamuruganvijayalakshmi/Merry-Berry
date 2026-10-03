import React, { useState } from 'react';
import { Plus, Check, Star, Sparkles, Flame, Eye } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/cafeData';

export default function MenuSection({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedId, setAddedId] = useState(null);

  const featuredItem = MENU_ITEMS.find(i => i.id === 'm-falooda-1'); // Classic Vanilla Falooda

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const handleAdd = (item) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section 
      id="menu"
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}>
            <span className="badge-berry">
              <Sparkles size={14} /> COMPLETE CAFE MENU
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.3rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-purple-deep)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            SIGNATURE <span className="gradient-text-berry">CREATIONS</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}>
            From royal layered faloodas to decadent sizzling sundaes, thick milkshakes, and crispy savory bites.
          </p>

          {/* Category Tabs (smooth horizontal swipe on mobile) */}
          <div 
            className="horizontal-scroll-touch"
            style={{
              gap: '0.6rem',
              marginTop: '2rem',
              padding: '0.4rem 0.5rem',
              paddingBottom: '0.8rem',
              justifyContent: 'center',
              maxWidth: '100%',
            }}
          >
            {MENU_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    border: 'none',
                    background: active ? 'var(--color-purple-primary)' : 'rgba(69, 13, 70, 0.05)',
                    color: active ? '#FFFFFF' : 'var(--color-purple-deep)',
                    padding: '0.65rem 1.3rem',
                    borderRadius: '9999px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: active ? '0 6px 18px rgba(69, 13, 70, 0.25)' : 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Spotlight Card: CLASSIC VANILLA FALOODA */}
        {featuredItem && (
          <div
            style={{
              background: 'linear-gradient(135deg, #240624 0%, #450D46 100%)',
              borderRadius: '28px',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#FFFFFF',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center',
              marginBottom: '5rem',
              boxShadow: '0 20px 50px rgba(36, 6, 36, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background art glow */}
            <div 
              style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(230, 57, 123, 0.4) 0%, transparent 70%)',
                filter: 'blur(70px)',
                pointerEvents: 'none',
              }}
            />

            {/* Left Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                <span style={{
                  background: 'rgba(255, 179, 0, 0.2)',
                  color: 'var(--color-mango)',
                  border: '1px solid rgba(255, 179, 0, 0.4)',
                  padding: '0.35rem 1rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  👑 SIGNATURE FEATURED HIGHLIGHT
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                CLASSIC VANILLA <br />
                <span style={{ color: 'var(--color-berry-pink)' }}>FALOODA</span>
              </h3>

              <p style={{
                fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '2rem',
                maxWidth: '520px',
              }}>
                Our most celebrated cafe creation: layered royal rose syrup, chilled sweetened cream milk,
                authentic falooda vermicelli, organic sabja basil seeds, crowned with a velvety scoop of 
                Madagascar Bourbon vanilla bean ice cream and roasted pistachios.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', textTransform: 'uppercase' }}>
                    Special Price
                  </span>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.4rem',
                    fontWeight: 900,
                    color: 'var(--color-mango)',
                  }}>
                    ₹{featuredItem.price}
                  </div>
                </div>

                <button
                  onClick={() => handleAdd(featuredItem)}
                  className="btn-primary"
                  style={{
                    padding: '0.9rem 2rem',
                    fontSize: '0.95rem',
                    background: addedId === featuredItem.id ? '#10B981' : undefined,
                  }}
                >
                  {addedId === featuredItem.id ? (
                    <>
                      <Check size={18} /> ADDED TO ORDER
                    </>
                  ) : (
                    <>
                      <Plus size={18} /> ORDER SIGNATURE FALOODA
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
              <div 
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  maxHeight: '440px',
                  display: 'inline-block',
                  width: '100%',
                }}
              >
                <img
                  src={featuredItem.image}
                  alt="Classic Vanilla Falooda at Merry Berry Ice Cream Cafe"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '420px',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="menu-card"
              style={{
                backgroundColor: '#FAF7F2',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(69, 13, 70, 0.08)',
                boxShadow: '0 8px 25px rgba(34, 5, 36, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="menu-img"
                />
                {item.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '0.8rem',
                    left: '0.8rem',
                    background: 'rgba(36, 6, 36, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}>
                    {item.badge}
                  </span>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: '0.8rem',
                  right: '0.8rem',
                  background: 'rgba(255, 255, 255, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: 'var(--color-purple-deep)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}>
                  <Star size={13} fill="#FFB300" strokeWidth={0} /> {item.rating}
                </div>
              </div>

              <div style={{ padding: '1.4rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: 'var(--color-purple-deep)',
                    marginBottom: '0.5rem',
                    lineHeight: 1.25,
                  }}>
                    {item.name}
                  </h4>
                  <p style={{
                    fontSize: '0.86rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.5,
                    marginBottom: '1.2rem',
                  }}>
                    {item.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '0.8rem',
                  borderTop: '1px solid rgba(69, 13, 70, 0.08)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 900,
                    color: 'var(--color-purple-deep)',
                  }}>
                    ₹{item.price}
                  </span>

                  <button
                    onClick={() => handleAdd(item)}
                    className="btn-primary"
                    style={{
                      padding: '0.55rem 1.1rem',
                      fontSize: '0.8rem',
                      background: addedId === item.id ? '#10B981' : undefined,
                    }}
                  >
                    {addedId === item.id ? (
                      <>
                        <Check size={14} /> ADDED
                      </>
                    ) : (
                      <>
                        <Plus size={14} /> ADD
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .menu-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(34, 5, 36, 0.12) !important;
          border-color: rgba(230, 57, 123, 0.3) !important;
        }
        .menu-card:hover .menu-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
