import React, { useState } from 'react';
import { X, ArrowLeft, Armchair, ChevronRight, Check, AlertCircle } from 'lucide-react';

export default function SeatSelectorModal({
  bookingContext,
  onClose,
  onBackToShowtimes,
  onProceedToFood
}) {
  if (!bookingContext) return null;

  const { movie, theatreName, dateInfo, showTime, format, basePrice } = bookingContext;

  // Pricing for tiers relative to basePrice
  const tiers = {
    recliner: {
      name: 'ROYAL RECLINER',
      price: Math.max(basePrice + 120, 450),
      rows: ['A', 'B']
    },
    prime: {
      name: 'PRIME / EXECUTIVE',
      price: Math.max(basePrice + 50, 320),
      rows: ['C', 'D', 'E']
    },
    classic: {
      name: 'CLASSIC',
      price: Math.max(basePrice, 220),
      rows: ['F', 'G', 'H']
    }
  };

  // Preset sold seats for realistic cinema feel
  const [soldSeats] = useState(() => new Set([
    'A-3', 'A-4', 'B-7', 'B-8',
    'C-5', 'C-6', 'C-7', 'D-1', 'D-2', 'D-11', 'D-12',
    'E-5', 'E-6', 'E-7', 'E-8',
    'F-3', 'F-4', 'G-9', 'G-10', 'H-1', 'H-2'
  ]));

  // Number of tickets requested
  const [seatCount, setSeatCount] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState([
    { id: 'C-7', row: 'C', num: 7, tier: 'prime', price: tiers.prime.price },
    { id: 'C-8', row: 'C', num: 8, tier: 'prime', price: tiers.prime.price }
  ].filter(s => !soldSeats.has(s.id)));

  const handleSeatClick = (row, num, tierKey) => {
    const seatId = `${row}-${num}`;
    if (soldSeats.has(seatId)) return;

    const exists = selectedSeats.some(s => s.id === seatId);

    if (exists) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= seatCount) {
        // Shift window: remove oldest and append new, or replace
        const updated = [...selectedSeats.slice(1), {
          id: seatId,
          row,
          num,
          tier: tierKey,
          price: tiers[tierKey].price
        }];
        setSelectedSeats(updated);
      } else {
        setSelectedSeats([...selectedSeats, {
          id: seatId,
          row,
          num,
          tier: tierKey,
          price: tiers[tierKey].price
        }]);
      }
    }
  };

  const handleSeatCountChange = (count) => {
    setSeatCount(count);
    if (selectedSeats.length > count) {
      setSelectedSeats(selectedSeats.slice(0, count));
    }
  };

  // Calculate Subtotal
  const ticketsSubtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handleContinue = () => {
    if (selectedSeats.length === 0) return;
    onProceedToFood({
      ...bookingContext,
      seatCount: selectedSeats.length,
      selectedSeats,
      ticketsSubtotal
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content seat-modal" onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="seat-modal-header">
          <div className="seat-header-left">
            <button 
              type="button" 
              className="back-btn"
              onClick={onBackToShowtimes}
              aria-label="Back to showtimes"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h3 className="seat-movie-title">{movie.movie}</h3>
              <p className="seat-show-subtext">
                {theatreName} • {dateInfo?.fullDate || 'Today'} • {showTime} ({format})
              </p>
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

        {/* Seat Count Quick Selector Bar */}
        <div className="seat-count-bar">
          <span className="count-label">Select Number of Seats:</span>
          <div className="count-pills">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                type="button"
                className={`count-pill ${seatCount === num ? 'active' : ''}`}
                onClick={() => handleSeatCountChange(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Seat Hall Viewport */}
        <div className="seat-hall-viewport">
          
          {/* Curved Cinema Screen */}
          <div className="cinema-screen-container">
            <div className="screen-curve-arc" />
            <span className="screen-tag">SCREEN THIS WAY</span>
            <div className="screen-glow-reflection" />
          </div>

          {/* Seat Layout by Tiers */}
          <div className="seat-layout-grid">
            
            {/* TIER: RECLINER */}
            <div className="seat-tier-block">
              <div className="tier-header">
                <span className="tier-title">{tiers.recliner.name}</span>
                <span className="tier-price-tag">₹{tiers.recliner.price}</span>
              </div>
              <div className="tier-rows">
                {tiers.recliner.rows.map(row => (
                  <div key={row} className="seat-row">
                    <span className="row-letter">{row}</span>
                    <div className="seat-row-seats">
                      {/* Left Block 1-4 */}
                      <div className="seat-block">
                        {[1, 2, 3, 4].map(num => renderSeat(row, num, 'recliner'))}
                      </div>
                      <div className="aisle-gap" />
                      {/* Center Block 5-8 */}
                      <div className="seat-block">
                        {[5, 6, 7, 8].map(num => renderSeat(row, num, 'recliner'))}
                      </div>
                      <div className="aisle-gap" />
                      {/* Right Block 9-12 */}
                      <div className="seat-block">
                        {[9, 10, 11, 12].map(num => renderSeat(row, num, 'recliner'))}
                      </div>
                    </div>
                    <span className="row-letter">{row}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER: PRIME */}
            <div className="seat-tier-block">
              <div className="tier-header">
                <span className="tier-title">{tiers.prime.name}</span>
                <span className="tier-price-tag">₹{tiers.prime.price}</span>
              </div>
              <div className="tier-rows">
                {tiers.prime.rows.map(row => (
                  <div key={row} className="seat-row">
                    <span className="row-letter">{row}</span>
                    <div className="seat-row-seats">
                      <div className="seat-block">
                        {[1, 2, 3, 4].map(num => renderSeat(row, num, 'prime'))}
                      </div>
                      <div className="aisle-gap" />
                      <div className="seat-block">
                        {[5, 6, 7, 8].map(num => renderSeat(row, num, 'prime'))}
                      </div>
                      <div className="aisle-gap" />
                      <div className="seat-block">
                        {[9, 10, 11, 12].map(num => renderSeat(row, num, 'prime'))}
                      </div>
                    </div>
                    <span className="row-letter">{row}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TIER: CLASSIC */}
            <div className="seat-tier-block">
              <div className="tier-header">
                <span className="tier-title">{tiers.classic.name}</span>
                <span className="tier-price-tag">₹{tiers.classic.price}</span>
              </div>
              <div className="tier-rows">
                {tiers.classic.rows.map(row => (
                  <div key={row} className="seat-row">
                    <span className="row-letter">{row}</span>
                    <div className="seat-row-seats">
                      <div className="seat-block">
                        {[1, 2, 3, 4].map(num => renderSeat(row, num, 'classic'))}
                      </div>
                      <div className="aisle-gap" />
                      <div className="seat-block">
                        {[5, 6, 7, 8].map(num => renderSeat(row, num, 'classic'))}
                      </div>
                      <div className="aisle-gap" />
                      <div className="seat-block">
                        {[9, 10, 11, 12].map(num => renderSeat(row, num, 'classic'))}
                      </div>
                    </div>
                    <span className="row-letter">{row}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Seat Legend */}
          <div className="seat-legend-bar">
            <div className="legend-item">
              <div className="seat-sample available" />
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="seat-sample selected" />
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="seat-sample sold" />
              <span>Sold Out</span>
            </div>
            <div className="legend-item">
              <div className="seat-sample recliner" />
              <span>Royal Recliner</span>
            </div>
          </div>

        </div>

        {/* Floating Bottom Action Bar */}
        <div className="seat-bottom-bar">
          <div className="seat-summary-left">
            <div className="selected-seats-pills">
              {selectedSeats.length > 0 ? (
                selectedSeats.map(s => (
                  <span key={s.id} className="selected-seat-chip">
                    {s.row}{s.num}
                  </span>
                ))
              ) : (
                <span className="no-seat-hint">Please choose your seats on the layout above</span>
              )}
            </div>
            <div className="price-calc-display">
              <span className="price-label">Tickets Subtotal:</span>
              <span className="price-amount">₹{ticketsSubtotal}</span>
              <span className="tickets-qty">({selectedSeats.length} of {seatCount} seats)</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary seat-proceed-btn"
            disabled={selectedSeats.length === 0}
            onClick={handleContinue}
            id="proceed-fnb-btn"
          >
            <span>Proceed to Food & Beverages</span>
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );

  function renderSeat(row, num, tierKey) {
    const seatId = `${row}-${num}`;
    const isSold = soldSeats.has(seatId);
    const isSelected = selectedSeats.some(s => s.id === seatId);

    let seatClasses = `seat-btn tier-${tierKey}`;
    if (isSold) seatClasses += ' sold';
    if (isSelected) seatClasses += ' selected';

    return (
      <button
        key={seatId}
        type="button"
        className={seatClasses}
        disabled={isSold}
        onClick={() => handleSeatClick(row, num, tierKey)}
        title={isSold ? `Seat ${row}${num} (Booked)` : `Seat ${row}${num} (₹${tiers[tierKey].price})`}
      >
        {isSelected ? (
          <Check size={10} strokeWidth={3} />
        ) : (
          <span className="seat-num">{num}</span>
        )}
      </button>
    );
  }
}
