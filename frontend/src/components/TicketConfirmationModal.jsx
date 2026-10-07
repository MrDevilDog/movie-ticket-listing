import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  X, 
  Download, 
  Printer, 
  Share2, 
  Calendar, 
  MapPin, 
  Ticket, 
  Clock, 
  QrCode,
  Sparkles
} from 'lucide-react';

export default function TicketConfirmationModal({
  confirmedBooking,
  onClose,
  onBookAnother
}) {
  if (!confirmedBooking) return null;

  const {
    bookingId,
    movie,
    theatreName,
    theatreLocation,
    dateInfo,
    showTime,
    format,
    selectedSeats,
    grandTotal,
    paymentMethod,
    selectedSnacks = []
  } = confirmedBooking;

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EB3656', '#F59E0B', '#10B981', '#3B82F6', '#FAF7F2']
      });
    } catch (e) {
      console.log('Confetti effect:', e);
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirmation-modal" onClick={e => e.stopPropagation()}>
        
        {/* Top Success Banner */}
        <div className="confirmation-banner">
          <div className="conf-icon-circle">
            <CheckCircle2 size={36} className="conf-check-icon" />
          </div>
          <h2 className="conf-heading">Booking Confirmed!</h2>
          <p className="conf-sub">
            Your M-Ticket has been issued and sent to your registered mobile and email.
          </p>
        </div>

        {/* The Digital M-Ticket Pass (BookMyShow Signature Design) */}
        <div className="ticket-pass-card" id="printable-ticket">
          
          {/* Perforated Notches */}
          <div className="notch left" />
          <div className="notch right" />

          {/* Ticket Header */}
          <div className="ticket-header-strip">
            <div className="ticket-brand">
              <span className="brand-dot" />
              <span>SHOWTICKET M-PASS</span>
            </div>
            <div className="ticket-booking-id">
              <span>BOOKING ID:</span>
              <strong>{bookingId}</strong>
            </div>
          </div>

          {/* Ticket Body Content */}
          <div className="ticket-body-content">
            
            <div className="ticket-main-info">
              <div className="ticket-poster-box">
                <img src={movie.poster} alt={movie.movie} />
              </div>

              <div className="ticket-details-col">
                <div className="ticket-tags-row">
                  <span className="tag-cert">{movie.certificate || 'UA 16+'}</span>
                  <span className="tag-format">{format || '2D'}</span>
                  <span className="tag-lang">{movie.language || 'English'}</span>
                </div>

                <h3 className="ticket-movie-title">{movie.movie}</h3>
                
                <div className="ticket-theatre-line">
                  <MapPin size={14} className="t-icon" />
                  <span>{theatreName}</span>
                </div>

                <div className="ticket-grid-meta">
                  <div className="meta-cell">
                    <span className="meta-label">DATE</span>
                    <strong className="meta-val">{dateInfo?.fullDate || 'Today'}</strong>
                  </div>
                  <div className="meta-cell">
                    <span className="meta-label">SHOWTIME</span>
                    <strong className="meta-val">{showTime}</strong>
                  </div>
                  <div className="meta-cell">
                    <span className="meta-label">AUDI / SCREEN</span>
                    <strong className="meta-val">Audi 03 (Dolby)</strong>
                  </div>
                  <div className="meta-cell">
                    <span className="meta-label">TOTAL SEATS</span>
                    <strong className="meta-val">{selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="ticket-perforated-line" />

            {/* Ticket Seat Numbers Bar */}
            <div className="ticket-seats-highlight">
              <div className="seats-list-block">
                <span className="seats-caption">CONFIRMED SEATS</span>
                <div className="seat-badge-group">
                  {selectedSeats.map(s => (
                    <span key={s.id} className="seat-confirmed-pill">
                      {s.row}{s.num}
                    </span>
                  ))}
                </div>
              </div>

              {/* QR Code Graphic */}
              <div className="ticket-qr-block">
                {/* Embedded SVG QR representation */}
                <div className="qr-box">
                  <svg viewBox="0 0 100 100" width="80" height="80" className="qr-svg">
                    <rect width="100" height="100" fill="#FFFFFF"/>
                    {/* Corners */}
                    <rect x="5" y="5" width="28" height="28" rx="4" fill="#1C1917"/>
                    <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFFFF"/>
                    <rect x="13" y="13" width="12" height="12" rx="1" fill="#EB3656"/>

                    <rect x="67" y="5" width="28" height="28" rx="4" fill="#1C1917"/>
                    <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFFFF"/>
                    <rect x="75" y="13" width="12" height="12" rx="1" fill="#EB3656"/>

                    <rect x="5" y="67" width="28" height="28" rx="4" fill="#1C1917"/>
                    <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFFFF"/>
                    <rect x="13" y="75" width="12" height="12" rx="1" fill="#EB3656"/>

                    {/* Matrix dots */}
                    <rect x="40" y="10" width="6" height="6" fill="#1C1917"/>
                    <rect x="52" y="15" width="6" height="6" fill="#1C1917"/>
                    <rect x="40" y="25" width="6" height="6" fill="#1C1917"/>
                    <rect x="48" y="35" width="6" height="6" fill="#1C1917"/>
                    <rect x="10" y="45" width="6" height="6" fill="#1C1917"/>
                    <rect x="25" y="45" width="6" height="6" fill="#1C1917"/>
                    <rect x="40" y="48" width="8" height="8" fill="#EB3656"/>
                    <rect x="60" y="45" width="6" height="6" fill="#1C1917"/>
                    <rect x="75" y="45" width="6" height="6" fill="#1C1917"/>
                    <rect x="45" y="65" width="6" height="6" fill="#1C1917"/>
                    <rect x="58" y="75" width="6" height="6" fill="#1C1917"/>
                    <rect x="75" y="68" width="6" height="6" fill="#1C1917"/>
                    <rect x="85" y="80" width="6" height="6" fill="#1C1917"/>
                  </svg>
                </div>
                <span className="qr-scan-text">Scan at Entrance</span>
              </div>
            </div>

            {/* F&B summary if any */}
            {selectedSnacks.length > 0 && (
              <div className="ticket-fnb-summary">
                <span className="fnb-badge-tag">SNACKS INCLUDED:</span>
                <span>{selectedSnacks.map(s => `${s.name} (x${s.quantity})`).join(', ')}</span>
              </div>
            )}

            {/* Payment Footer */}
            <div className="ticket-footer-bar">
              <div className="paid-info">
                <span>TOTAL PAID</span>
                <strong>₹{grandTotal}</strong>
              </div>
              <div className="payment-mode-tag">
                <span>Paid via {paymentMethod.toUpperCase()}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="confirmation-actions">
          <button 
            type="button" 
            className="btn-secondary conf-btn"
            onClick={handlePrint}
          >
            <Printer size={16} />
            <span>Print M-Ticket</span>
          </button>
          
          <button 
            type="button" 
            className="btn-primary conf-btn"
            onClick={onBookAnother}
          >
            <Sparkles size={16} />
            <span>Book Another Movie</span>
          </button>
        </div>

        {/* Close Modal Cross */}
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} />
        </button>

      </div>
    </div>
  );
}
