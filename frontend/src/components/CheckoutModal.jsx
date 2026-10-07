import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Tag, 
  CheckCircle2, 
  Sparkles,
  Ticket,
  Lock
} from 'lucide-react';
import { PROMO_COUPONS } from '../data/mockData';

export default function CheckoutModal({
  bookingContext,
  onClose,
  onBackToFood,
  onConfirmPayment
}) {
  if (!bookingContext) return null;

  const {
    movie,
    theatreName,
    theatreLocation,
    dateInfo,
    showTime,
    format,
    selectedSeats,
    ticketsSubtotal,
    selectedSnacks = [],
    snacksSubtotal = 0
  } = bookingContext;

  // Convenience fees & GST
  const convenienceFee = Math.round(selectedSeats.length * 28);
  const gst = Math.round((ticketsSubtotal + snacksSubtotal + convenienceFee) * 0.05);

  // Promo Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Payment tab: 'upi' | 'card' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('aquib@oksbi');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8812');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('321');
  const [isProcessing, setIsProcessing] = useState(false);

  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, ticketsSubtotal + snacksSubtotal + convenienceFee + gst - discountAmount);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    setCouponError('');
    if (!code) return;

    const coupon = PROMO_COUPONS[code];
    if (coupon) {
      if ((ticketsSubtotal + snacksSubtotal) < coupon.minOrder) {
        setCouponError(`Minimum order amount of ₹${coupon.minOrder} required.`);
        return;
      }
      setAppliedCoupon(coupon);
      setCouponCode(code);
    } else {
      setCouponError('Invalid coupon code. Try BMSFIRST or BLOCKBUSTER50');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onConfirmPayment({
        ...bookingContext,
        convenienceFee,
        gst,
        discountAmount,
        appliedCoupon: appliedCoupon?.code || null,
        grandTotal,
        paymentMethod,
        bookingId: `BMS-${Math.floor(100000 + Math.random() * 900000)}-${movie.movie.substring(0, 2).toUpperCase()}`,
        bookedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content checkout-modal" onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="checkout-modal-header">
          <div className="checkout-header-left">
            <button 
              type="button" 
              className="back-btn"
              onClick={onBackToFood}
              aria-label="Back to snacks"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h3 className="checkout-title">Review Booking & Secure Payment</h3>
              <p className="checkout-subtitle">100% Encrypted & Safe Cinema Checkout</p>
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

        {/* 2-Column Checkout Layout */}
        <div className="checkout-layout-grid">
          
          {/* Left Column: Payment Details */}
          <div className="checkout-col-left">
            <div className="payment-options-card">
              <h4 className="payment-heading">
                <Lock size={16} className="lock-icon" />
                Select Payment Mode
              </h4>

              {/* Payment Tabs */}
              <div className="payment-tabs-bar">
                <button
                  type="button"
                  className={`pay-tab-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Smartphone size={17} />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  className={`pay-tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={17} />
                  <span>Cards</span>
                </button>
                <button
                  type="button"
                  className={`pay-tab-btn ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  <Building2 size={17} />
                  <span>Netbanking</span>
                </button>
              </div>

              {/* Payment Tab Forms */}
              <div className="payment-form-content">
                {paymentMethod === 'upi' && (
                  <div className="upi-form">
                    <p className="form-helper-text">Pay instantly using any UPI App (Google Pay, PhonePe, Paytm, Cred)</p>
                    <div className="upi-app-logos">
                      <span className="upi-pill">GPay</span>
                      <span className="upi-pill">PhonePe</span>
                      <span className="upi-pill">Paytm</span>
                      <span className="upi-pill">BHIM UPI</span>
                    </div>
                    <div className="input-group">
                      <label htmlFor="upi-id-input">Virtual Payment Address (VPA / UPI ID)</label>
                      <input
                        type="text"
                        id="upi-id-input"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="username@upi / mobile@okhdfcbank"
                        className="checkout-text-input"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="card-form">
                    <p className="form-helper-text">Visa, Mastercard, RuPay & American Express accepted</p>
                    <div className="input-group">
                      <label htmlFor="card-number-input">Card Number</label>
                      <input
                        type="text"
                        id="card-number-input"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="checkout-text-input"
                      />
                    </div>
                    <div className="card-row-split">
                      <div className="input-group">
                        <label htmlFor="card-expiry-input">Valid Thru (MM/YY)</label>
                        <input
                          type="text"
                          id="card-expiry-input"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="checkout-text-input"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="card-cvv-input">CVV</label>
                        <input
                          type="password"
                          id="card-cvv-input"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="checkout-text-input"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="netbanking-form">
                    <p className="form-helper-text">Select your bank from popular options:</p>
                    <div className="bank-options-grid">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank, idx) => (
                        <label key={idx} className="bank-radio-label">
                          <input type="radio" name="bankSelect" defaultChecked={idx === 0} />
                          <span>{bank}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Promo Code Voucher Section */}
            <div className="promo-voucher-card">
              <div className="promo-title-row">
                <Tag size={16} className="tag-icon" />
                <h4>Apply Promo Code & Offers</h4>
              </div>

              {!appliedCoupon ? (
                <div className="coupon-input-box">
                  <div className="coupon-field-wrap">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. BMSFIRST)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="coupon-input"
                    />
                    <button
                      type="button"
                      className="btn-apply-coupon"
                      onClick={() => handleApplyCoupon()}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="coupon-error-msg">{couponError}</p>}

                  {/* Quick coupon chips */}
                  <div className="coupon-suggestions">
                    <button
                      type="button"
                      className="coupon-chip"
                      onClick={() => handleApplyCoupon('BMSFIRST')}
                    >
                      <span>BMSFIRST</span>
                      <small>Save ₹75</small>
                    </button>
                    <button
                      type="button"
                      className="coupon-chip"
                      onClick={() => handleApplyCoupon('BLOCKBUSTER50')}
                    >
                      <span>BLOCKBUSTER50</span>
                      <small>Save ₹50</small>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="coupon-applied-banner">
                  <div className="applied-left">
                    <CheckCircle2 size={18} className="applied-check" />
                    <div>
                      <strong>'{appliedCoupon.code}' Applied!</strong>
                      <p>{appliedCoupon.desc}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="coupon-remove-btn"
                    onClick={handleRemoveCoupon}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="checkout-col-right">
            <div className="order-summary-box">
              <h4 className="summary-title">Booking Summary</h4>

              {/* Movie Snippet */}
              <div className="summary-movie-info">
                <img 
                  src={movie.poster} 
                  alt={movie.movie} 
                  className="summary-poster"
                />
                <div className="summary-movie-details">
                  <h5 className="sum-title">{movie.movie}</h5>
                  <div className="sum-badges">
                    <span>{movie.certificate}</span>
                    <span>{format}</span>
                    <span>{movie.language}</span>
                  </div>
                  <p className="sum-theatre">{theatreName}</p>
                  <p className="sum-datetime">{dateInfo?.fullDate} • {showTime}</p>
                </div>
              </div>

              <div className="summary-divider" />

              {/* Seats Breakdown */}
              <div className="summary-line-item">
                <div className="item-desc">
                  <span className="item-name">Cinema Seats ({selectedSeats.length})</span>
                  <span className="item-sub">
                    {selectedSeats.map(s => `${s.row}${s.num}`).join(', ')}
                  </span>
                </div>
                <span className="item-val">₹{ticketsSubtotal}</span>
              </div>

              {/* Snacks Breakdown (if any) */}
              {selectedSnacks.length > 0 && (
                <div className="summary-line-item">
                  <div className="item-desc">
                    <span className="item-name">Snacks & Beverages ({selectedSnacks.length} items)</span>
                    <span className="item-sub">
                      {selectedSnacks.map(s => `${s.name} x${s.quantity}`).join(', ')}
                    </span>
                  </div>
                  <span className="item-val">₹{snacksSubtotal}</span>
                </div>
              )}

              {/* Convenience Fees */}
              <div className="summary-line-item">
                <div className="item-desc">
                  <span className="item-name">Integrated Convenience Fee</span>
                  <span className="item-sub">Base booking handling fee</span>
                </div>
                <span className="item-val">₹{convenienceFee}</span>
              </div>

              {/* GST */}
              <div className="summary-line-item">
                <div className="item-desc">
                  <span className="item-name">Integrated GST (18%)</span>
                </div>
                <span className="item-val">₹{gst}</span>
              </div>

              {/* Discount if coupon applied */}
              {discountAmount > 0 && (
                <div className="summary-line-item discount-row">
                  <div className="item-desc">
                    <span className="item-name">Promo Discount ({appliedCoupon?.code})</span>
                  </div>
                  <span className="item-val discount-val">-₹{discountAmount}</span>
                </div>
              )}

              <div className="summary-divider" />

              {/* Grand Total */}
              <div className="summary-grand-total">
                <span className="grand-label">Amount Payable:</span>
                <span className="grand-val">₹{grandTotal}</span>
              </div>

              {/* Confirmation CTA */}
              <button
                type="button"
                className="btn-primary btn-pay-now"
                onClick={handleSubmitPayment}
                disabled={isProcessing}
                id="btn-confirm-payment"
              >
                {isProcessing ? (
                  <span className="loading-spinner-wrap">
                    <span className="spinner-dot" />
                    <span>Processing Secure Payment...</span>
                  </span>
                ) : (
                  <>
                    <Lock size={16} />
                    <span>Pay ₹{grandTotal} & Confirm Booking</span>
                  </>
                )}
              </button>

              <div className="checkout-trust-banner">
                <ShieldCheck size={16} />
                <span>Verified 256-Bit SSL Cinema Transaction</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
