import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import CinematicHero from './components/CinematicHero';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import FlavoursSection from './components/FlavoursSection';
import MenuSection from './components/MenuSection';
import ExperienceSection from './components/ExperienceSection';
import ReviewsSection from './components/ReviewsSection';
import PillarsSection from './components/PillarsSection';
import GallerySection from './components/GallerySection';
import LocationSection from './components/LocationSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';
import { ShoppingBag, Sparkles, Check, Phone } from 'lucide-react';
import { CAFE_INFO } from './data/cafeData';

export default function App() {
  const [heroProgress, setHeroProgress] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Cart operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Trigger toast notification
    setToastMessage(`Added ${product.name} to order!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-cream text-dark selection:bg-pink selection:text-white">
      {/* Sticky Global Navbar */}
      <Navbar
        heroProgress={heroProgress}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* CORE EXPERIENCE: Scroll-Driven Cinematic Hero */}
      <CinematicHero
        onProgressUpdate={(progress) => setHeroProgress(progress)}
      />

      {/* MAIN WEBSITE: Continuous Organic Content Flow */}
      <main id="main-content">
        {/* About Cafe Section */}
        <AboutSection />

        {/* Interactive Flavours Section */}
        <FlavoursSection onAddToCart={addToCart} />

        {/* Signature Menu Section with Featured Falooda */}
        <MenuSection onAddToCart={addToCart} />

        {/* Cafe Experience Section */}
        <ExperienceSection />

        {/* Customer Reviews Section */}
        <ReviewsSection />

        {/* Why People Love Merry Berry */}
        <PillarsSection />

        {/* Masonry Gallery Section */}
        <GallerySection />

        {/* Location & Custom Map Section */}
        <LocationSection />

        {/* Order Online CTA Section */}
        <CtaSection onOpenCart={() => setIsCartOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Vercel Analytics */}
      <Analytics />

      {/* Cart & Online Order Drawer Modal */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
      />

      {/* Floating Cart Button for Quick Checkout (appears when cart has items) */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="btn-primary animate-pulse-subtle"
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            zIndex: 150,
            padding: '0.85rem 1.6rem',
            boxShadow: '0 10px 30px rgba(230, 57, 123, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <ShoppingBag size={20} />
          <span>VIEW TRAY ({totalCartCount})</span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(34, 5, 36, 0.95)',
            color: '#FFFFFF',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '0.8rem 1.8rem',
            borderRadius: '9999px',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.35)',
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          <div style={{ background: '#10B981', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={12} color="#fff" strokeWidth={3} />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, 15px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
