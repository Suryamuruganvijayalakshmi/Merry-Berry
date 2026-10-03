import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Heart } from 'lucide-react';

const EXPERIENCE_MOMENTS = [
  {
    title: "Laughter Over Sweet Scoops",
    tag: "Friendship & Joy",
    image: "/images/friends.jpg",
    caption: "The sound of laughter echoing across our velvet booths as friends share towering sundaes.",
  },
  {
    title: "Chic Velvet Cafe Lounge",
    tag: "Modern Ambiance",
    image: "/images/cafe_interior.jpg",
    caption: "Designed with warm ambient lighting, marble tables, and rich berry-purple plush seating.",
  },
  {
    title: "The Royal Falooda Ritual",
    tag: "Signature Dessert",
    image: "/images/falooda.jpg",
    caption: "Layer upon layer of rose syrup, soaked basil seeds, and handcrafted ice cream.",
  },
  {
    title: "Sundaes Made to Share",
    tag: "Celebration",
    image: "/images/sundae_special.jpg",
    caption: "Decadent multi-scoop creations dripping with hot berry compote and dark fudge.",
  },
  {
    title: "Savory Crunch Perfection",
    tag: "Cafe Bites",
    image: "/images/chicken_bites.jpg",
    caption: "Freshly fried crispy golden chicken bites with artisanal dips for the perfect savory contrast.",
  },
  {
    title: "Artisanal Craftsmanship",
    tag: "Pure Ingredients",
    image: "/images/strawberry.jpg",
    caption: "Every single scoop made with passion, real cream, and pure handpicked berries.",
  },
];

export default function ExperienceSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="experience"
      style={{
        backgroundColor: '#240624',
        color: '#FFFFFF',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Ambient Glows */}
      <div 
        style={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 57, 123, 0.25) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 179, 0, 0.15) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
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
              THE CAFE EXPERIENCE
            </span>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}>
              COME FOR THE SCOOP.<br />
              <span className="gradient-text-berry" style={{ WebkitTextFillColor: 'initial', color: 'var(--color-berry-pink)' }}>
                STAY FOR THE MOMENTS.
              </span>
            </h2>
          </div>

          {/* Navigation arrow buttons */}
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-berry-pink)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-berry-pink)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Parallax Scroller Row */}
      <div 
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '2rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2))',
          paddingRight: '2rem',
          paddingBottom: '2.5rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {EXPERIENCE_MOMENTS.map((moment, idx) => (
          <div
            key={idx}
            style={{
              flex: '0 0 auto',
              width: 'clamp(300px, 40vw, 420px)',
              scrollSnapAlign: 'start',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backgroundColor: '#1E051F',
              transition: 'transform 0.4s ease',
            }}
            className="experience-card"
          >
            <div style={{ height: '360px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={moment.image}
                alt={moment.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.6s ease',
                }}
                className="exp-img"
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 40%, rgba(20, 3, 20, 0.9) 100%)',
                }}
              />
              <span style={{
                position: 'absolute',
                top: '1.2rem',
                left: '1.2rem',
                background: 'rgba(230, 57, 123, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
              }}>
                {moment.tag}
              </span>
            </div>

            <div style={{ padding: '1.8rem', background: '#200520' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 800,
                marginBottom: '0.6rem',
                color: '#FFFFFF',
              }}>
                {moment.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.5,
              }}>
                {moment.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .experience-card:hover {
          transform: translateY(-6px);
        }
        .experience-card:hover .exp-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
