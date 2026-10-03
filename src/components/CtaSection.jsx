import React from 'react';
import { ShoppingBag, Utensils, Sparkles, Heart } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export default function CtaSection({ onOpenCart }) {
  return (
    <section 
      style={{
        position: 'relative',
        backgroundColor: '#240624',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background Animated Gradient World */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, #5E125F 0%, #240624 85%)',
          opacity: 0.95,
        }}
      />

      {/* Floating Fruit Elements in Background */}
      <div 
        className="animate-float-soft"
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          fontSize: '3.5rem',
          filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
          pointerEvents: 'none',
        }}
      >
        🍓
      </div>

      <div 
        className="animate-float-reverse"
        style={{
          position: 'absolute',
          top: '25%',
          right: '10%',
          fontSize: '3.2rem',
          filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
          pointerEvents: 'none',
        }}
      >
        🫐
      </div>

      <div 
        className="animate-float-soft"
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '12%',
          fontSize: '3rem',
          filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
          pointerEvents: 'none',
        }}
      >
        🥭
      </div>

      <div 
        className="animate-float-reverse"
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          fontSize: '3.5rem',
          filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))',
          pointerEvents: 'none',
        }}
      >
        🍨
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 3, maxWidth: '850px' }}>
        
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          color: '#FFFFFF',
          padding: '0.45rem 1.2rem',
          borderRadius: '9999px',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          <Sparkles size={16} color="var(--color-mango)" /> INDULGE TODAY
        </span>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 7vw, 5.2rem)',
          fontWeight: 900,
          letterSpacing: '0.04em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          lineHeight: 1.05,
          marginBottom: '1.5rem',
          textShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
        }}>
          YOUR NEXT SCOOP <br />
          <span style={{ color: 'var(--color-berry-pink)' }}>IS WAITING.</span>
        </h2>

        <p style={{
          fontFamily: 'var(--font-accent)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)',
          color: '#FAF7F2',
          marginBottom: '2.8rem',
          lineHeight: 1.5,
          textShadow: '0 4px 15px rgba(0,0,0,0.3)',
        }}>
          “{CAFE_INFO.tagline}”
        </p>

        {/* Buttons: ORDER ONLINE, VIEW MENU */}
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenCart}
            className="btn-primary"
            style={{
              padding: '1.1rem 2.8rem',
              fontSize: '1rem',
              boxShadow: '0 12px 35px rgba(230, 57, 123, 0.5)',
            }}
          >
            <ShoppingBag size={20} />
            ORDER ONLINE
          </button>

          <a
            href="#menu"
            className="btn-ghost-light"
            style={{
              padding: '1.1rem 2.5rem',
              fontSize: '1rem',
            }}
          >
            <Utensils size={20} />
            VIEW MENU
          </a>
        </div>

      </div>
    </section>
  );
}
