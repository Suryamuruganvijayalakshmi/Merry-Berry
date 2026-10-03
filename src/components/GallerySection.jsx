import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/cafeData';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ['All', 'Ice Cream', 'Falooda', 'Sundaes', 'Ambiance', 'Moments'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  return (
    <section 
      id="gallery"
      style={{
        backgroundColor: '#FFFFFF',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3.5rem' }}>
          <span className="badge-berry" style={{ marginBottom: '0.8rem' }}>
            <Sparkles size={14} /> VISUAL FEAST
          </span>

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
            THE MERRY BERRY <span className="gradient-text-berry">GALLERY</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}>
            A glimpse into handcrafted indulgence, cozy cafe corners, and sweet smiles.
          </p>

          {/* Filter Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  border: 'none',
                  background: activeFilter === cat ? 'var(--color-purple-primary)' : 'rgba(69, 13, 70, 0.05)',
                  color: activeFilter === cat ? '#FFFFFF' : 'var(--color-purple-deep)',
                  padding: '0.55rem 1.2rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="gallery-tile"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                height: item.span === 'tall' ? '400px' : '300px',
                boxShadow: '0 10px 25px rgba(34, 5, 36, 0.08)',
                cursor: 'pointer',
                backgroundColor: '#F5EBF5',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="gallery-img"
              />

              {/* Hover overlay with title & expand icon */}
              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(36, 6, 36, 0.85) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <span style={{
                      color: 'var(--color-mango)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {item.category}
                    </span>
                    <h4 style={{
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      marginTop: '0.2rem',
                    }}>
                      {item.title}
                    </h4>
                  </div>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}>
                    <Maximize2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 3, 20, 0.94)',
            backdropFilter: 'blur(20px)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              aria-label="Close image preview"
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>

            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              style={{
                width: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                backgroundColor: '#120214',
                display: 'block',
              }}
            />

            <div style={{
              padding: '1.5rem 2rem',
              backgroundColor: '#240624',
              color: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <span style={{ color: 'var(--color-mango)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {lightboxImage.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800 }}>
                  {lightboxImage.title}
                </h3>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                Merry Berry Ice Cream Cafe, Erode
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-tile:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .gallery-tile:hover .gallery-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
