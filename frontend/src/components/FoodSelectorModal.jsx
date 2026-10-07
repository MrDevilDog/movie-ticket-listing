import React, { useState } from 'react';
import { X, ArrowLeft, Plus, Minus, Utensils, ChevronRight, Check } from 'lucide-react';
import { SNACKS_MENU } from '../data/mockData';

export default function FoodSelectorModal({
  bookingContext,
  onClose,
  onBackToSeats,
  onProceedToCheckout
}) {
  if (!bookingContext) return null;

  const [selectedSnacks, setSelectedSnacks] = useState({});

  const handleQuantity = (snackId, delta) => {
    setSelectedSnacks(prev => {
      const currentQty = prev[snackId] || 0;
      const nextQty = Math.max(0, currentQty + delta);
      if (nextQty === 0) {
        const copy = { ...prev };
        delete copy[snackId];
        return copy;
      }
      return { ...prev, [snackId]: nextQty };
    });
  };

  const snacksSubtotal = Object.entries(selectedSnacks).reduce((sum, [id, qty]) => {
    const item = SNACKS_MENU.find(s => s.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const totalSnacksCount = Object.values(selectedSnacks).reduce((sum, q) => sum + q, 0);

  const handleContinue = () => {
    const snacksList = Object.entries(selectedSnacks).map(([id, qty]) => {
      const item = SNACKS_MENU.find(s => s.id === id);
      return {
        ...item,
        quantity: qty,
        lineTotal: item.price * qty
      };
    });

    onProceedToCheckout({
      ...bookingContext,
      selectedSnacks: snacksList,
      snacksSubtotal
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content fnb-modal" onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="fnb-modal-header">
          <div className="fnb-header-left">
            <button 
              type="button" 
              className="back-btn"
              onClick={onBackToSeats}
              aria-label="Back to seats"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h3 className="fnb-title">Grab a Bite! Popcorn & Refreshments</h3>
              <p className="fnb-subtitle">Pre-book your favorite cinema snacks & skip the long interval queues</p>
            </div>
          </div>

          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Snacks Grid */}
        <div className="fnb-scroll-body">
          <div className="fnb-grid">
            {SNACKS_MENU.map(snack => {
              const qty = selectedSnacks[snack.id] || 0;
              return (
                <div key={snack.id} className="snack-card">
                  <div className="snack-image-wrap">
                    <img 
                      src={snack.image} 
                      alt={snack.name} 
                      className="snack-img"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                    <div className="veg-badge-box">
                      <div className="veg-dot" />
                    </div>
                  </div>

                  <div className="snack-info">
                    <h4 className="snack-name">{snack.name}</h4>
                    <p className="snack-desc">{snack.description}</p>
                    <div className="snack-price-row">
                      <span className="snack-price">₹{snack.price}</span>
                      
                      {/* Quantity Controller */}
                      {qty === 0 ? (
                        <button
                          type="button"
                          className="btn-add-snack"
                          onClick={() => handleQuantity(snack.id, 1)}
                        >
                          <Plus size={14} />
                          <span>ADD</span>
                        </button>
                      ) : (
                        <div className="qty-control-box">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => handleQuantity(snack.id, -1)}
                          >
                            <Minus size={13} />
                          </button>
                          <span className="qty-val">{qty}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => handleQuantity(snack.id, 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fnb-bottom-bar">
          <div className="fnb-summary-left">
            {totalSnacksCount > 0 ? (
              <div>
                <span className="fnb-summary-tag">{totalSnacksCount} Snack Item{totalSnacksCount > 1 ? 's' : ''} added</span>
                <div className="fnb-total-text">
                  Snacks Total: <strong>₹{snacksSubtotal}</strong>
                </div>
              </div>
            ) : (
              <span className="fnb-none-hint">No snacks selected. You can add now or skip to checkout.</span>
            )}
          </div>

          <div className="fnb-actions-right">
            {totalSnacksCount === 0 && (
              <button
                type="button"
                className="btn-skip-fnb"
                onClick={handleContinue}
              >
                Skip Snacks
              </button>
            )}

            <button
              type="button"
              className="btn-primary fnb-proceed-btn"
              onClick={handleContinue}
              id="fnb-proceed-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
