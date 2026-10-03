import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAFE_INFO } from '../data/cafeData';

export default function OrderDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState('takeaway'); // takeaway or dinein
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E6397B', '#FFB300', '#450D46', '#FFFFFF']
    });

    // Generate formatted itemized message
    let message = `🍨 *NEW ORDER — MERRY BERRY ICE CREAM CAFE*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    if (customerName.trim()) {
      message += `👤 *Customer:* ${customerName.trim()}\n`;
    }
    message += `📍 *Order Type:* ${orderType === 'dinein' ? `Dine-In (Table ${tableNumber || 'Pending'})` : 'Takeaway / Pickup'}\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*ORDER ITEMS:*\n`;

    cart.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL AMOUNT: ₹${totalAmount}*\n`;
    if (specialInstructions.trim()) {
      message += `📝 *Notes:* ${specialInstructions.trim()}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_Ordered via Merry Berry Interactive Web Experience_`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CAFE_INFO.phoneClean}?text=${encoded}`;

    setOrderPlaced(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(20, 3, 20, 0.7)',
        backdropFilter: 'blur(10px)',
      }}
      onClick={onClose}
    >
      <div
        className="order-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-15px 0 40px rgba(0, 0, 0, 0.3)',
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 1.8rem',
          backgroundColor: '#240624',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--color-berry-pink)" />
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase' }}>
              YOUR ORDER ({cart.reduce((a, c) => a + c.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#fff',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content body */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem 1.8rem' }}>
          {orderPlaced ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <CheckCircle size={38} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-purple-deep)' }}>
                ORDER READY FOR DISPATCH!
              </h4>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.6rem', fontSize: '0.92rem', lineHeight: 1.5 }}>
                Opening WhatsApp to connect with Merry Berry Ice Cream Cafe, Solar Pirivu, Erode.
              </p>
              <button
                onClick={() => {
                  setOrderPlaced(false);
                  onClearCart();
                  onClose();
                }}
                className="btn-primary"
                style={{ marginTop: '2rem' }}
              >
                DONE / BACK TO MENU
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍨</div>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-purple-deep)' }}>
                YOUR TRAY IS EMPTY
              </h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Explore our signature scoops, faloodas, and crispy cafe bites to add delicious happiness.
              </p>
              <button
                onClick={onClose}
                className="btn-primary"
                style={{ marginTop: '1.8rem', padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}
              >
                EXPLORE MENU
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {/* Cart items list */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.8rem',
                    backgroundColor: '#FAF7F2',
                    borderRadius: '16px',
                    border: '1px solid rgba(69, 13, 70, 0.08)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <h5 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-purple-deep)' }}>
                      {item.name}
                    </h5>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-berry-pink)', fontWeight: 700 }}>
                      ₹{item.price} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid rgba(69, 13, 70, 0.2)',
                        background: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid rgba(69, 13, 70, 0.2)',
                        background: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'rgba(230, 57, 123, 0.7)',
                      cursor: 'pointer',
                      padding: '0.3rem',
                    }}
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* Order options */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(69, 13, 70, 0.1)' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-purple-deep)', display: 'block', marginBottom: '0.4rem' }}>
                  Dining Preference
                </label>
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '10px',
                      border: orderType === 'takeaway' ? '2px solid var(--color-purple-primary)' : '1px solid #ddd',
                      background: orderType === 'takeaway' ? 'rgba(69, 13, 70, 0.08)' : '#fff',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    🛍️ Takeaway / Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    style={{
                      flex: 1,
                      padding: '0.6rem',
                      borderRadius: '10px',
                      border: orderType === 'dinein' ? '2px solid var(--color-purple-primary)' : '1px solid #ddd',
                      background: orderType === 'dinein' ? 'rgba(69, 13, 70, 0.08)' : '#fff',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    🍽️ Dine-In
                  </button>
                </div>

                {orderType === 'dinein' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                      Table Number (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Table 4"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.9rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(69, 13, 70, 0.2)',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(69, 13, 70, 0.2)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                    Special Requests
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra nuts, less sweet, extra napkins"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(69, 13, 70, 0.2)',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Checkout button */}
        {!orderPlaced && cart.length > 0 && (
          <div style={{
            padding: '1.2rem 1.5rem',
            paddingBottom: 'max(1.2rem, env(safe-area-inset-bottom, 1.2rem))',
            borderTop: '1px solid rgba(69, 13, 70, 0.1)',
            backgroundColor: '#FAF7F2',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Total (Incl. all taxes)
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-purple-deep)' }}>
                ₹{totalAmount}
              </span>
            </div>

            <button
              onClick={handleSendWhatsAppOrder}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '0.88rem',
                gap: '0.5rem',
                minHeight: '48px',
              }}
            >
              <Send size={18} />
              SEND ORDER TO CAFE VIA WHATSAPP
            </button>
            <div style={{ textAlign: 'center', marginTop: '0.4rem', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
              Direct confirmation with Merry Berry staff at {CAFE_INFO.phone}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
