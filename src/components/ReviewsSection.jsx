import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { GENUINE_REVIEWS, CAFE_INFO } from '../data/cafeData';

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Subtle auto-advance carousel every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GENUINE_REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + GENUINE_REVIEWS.length) % GENUINE_REVIEWS.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % GENUINE_REVIEWS.length);
  };

  return (
    <section 
      id="reviews"
      style={{
        backgroundColor: '#FAF7F2',
        paddingTop: '7rem',
        paddingBottom: '8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        
        {/* Rating Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(255, 179, 0, 0.15)',
            border: '1px solid rgba(255, 179, 0, 0.3)',
            padding: '0.5rem 1.4rem',
            borderRadius: '9999px',
            marginBottom: '1.2rem',
          }}>
            <div style={{ display: 'flex', color: '#FFB300' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#FFB300" strokeWidth={0} />
              ))}
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '0.95rem',
              color: 'var(--color-purple-deep)',
            }}>
              {CAFE_INFO.rating} ★ ({CAFE_INFO.reviewsCount} Google Reviews)
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
            fontWeight: 900,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-purple-deep)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            VOICES OF <span className="gradient-text-berry">DELIGHT</span>
          </h2>

          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}>
            Authentic feedback from valued guests dining at Merry Berry in Solar, Erode.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          
          {/* Main Review Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '28px',
              padding: 'clamp(2.5rem, 6vw, 4rem)',
              boxShadow: '0 20px 50px rgba(34, 5, 36, 0.08)',
              border: '1px solid rgba(69, 13, 70, 0.08)',
              position: 'relative',
              minHeight: '280px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.4s ease',
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2.5rem',
                color: 'rgba(230, 57, 123, 0.15)',
              }}
            >
              <Quote size={64} />
            </div>

            <div>
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', color: '#FFB300' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="#FFB300" strokeWidth={0} />
                ))}
              </div>

              {/* Quote text */}
              <blockquote style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
                fontStyle: 'italic',
                color: 'var(--color-purple-deep)',
                lineHeight: 1.35,
                marginBottom: '2rem',
              }}>
                "{GENUINE_REVIEWS[currentIndex].quote}"
              </blockquote>
            </div>

            {/* Author info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(69, 13, 70, 0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-berry-pink), var(--color-purple-primary))',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.2rem',
                }}>
                  {GENUINE_REVIEWS[currentIndex].author.charAt(0)}
                </div>

                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    color: 'var(--color-purple-deep)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    {GENUINE_REVIEWS[currentIndex].author}
                    <CheckCircle2 size={16} color="#10B981" />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    {GENUINE_REVIEWS[currentIndex].role}
                  </div>
                </div>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(230, 57, 123, 0.08)',
                color: 'var(--color-berry-pink)',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {GENUINE_REVIEWS[currentIndex].highlight}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            marginTop: '2.5rem',
          }}>
            <button
              onClick={prevReview}
              aria-label="Previous review"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid rgba(69, 13, 70, 0.15)',
                color: 'var(--color-purple-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-purple-primary)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = 'var(--color-purple-deep)';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {GENUINE_REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review ${idx + 1}`}
                  style={{
                    width: idx === currentIndex ? '30px' : '10px',
                    height: '10px',
                    borderRadius: '9999px',
                    background: idx === currentIndex ? 'var(--color-berry-pink)' : 'rgba(69, 13, 70, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              aria-label="Next review"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid rgba(69, 13, 70, 0.15)',
                color: 'var(--color-purple-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-purple-primary)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#FFFFFF';
                e.currentTarget.style.color = 'var(--color-purple-deep)';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
