import React from 'react';
import { X, Ticket, Calendar, Clock, MapPin, QrCode, Trash2, ExternalLink } from 'lucide-react';

export default function MyBookingsDrawer({
  isOpen,
  onClose,
  bookings = [],
  onViewTicketPass,
  onCancelBooking
}) {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container" onClick={e => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-row">
            <div className="drawer-icon-box">
              <Ticket size={20} className="accent-color" />
            </div>
            <div>
              <h3 className="drawer-title">My Bookings</h3>
              <p className="drawer-sub">{bookings.length} Confirmed Ticket{bookings.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="drawer-body">
          {bookings.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-ticket-icon">
                <Ticket size={48} />
              </div>
              <h4>No Bookings Yet</h4>
              <p>You haven't booked any movie tickets yet. Pick a blockbuster and reserve your seats!</p>
              <button 
                type="button" 
                className="btn-primary" 
                onClick={onClose}
              >
                Browse Now Showing
              </button>
            </div>
          ) : (
            <div className="bookings-list">
              {bookings.map((b) => (
                <div key={b.bookingId} className="booking-card-item">
                  
                  {/* Status Strip */}
                  <div className="booking-item-top">
                    <span className="badge-confirmed">CONFIRMED</span>
                    <span className="booking-id-text">ID: {b.bookingId}</span>
                  </div>

                  {/* Movie Info */}
                  <div className="booking-movie-row">
                    <img 
                      src={b.movie.poster} 
                      alt={b.movie.movie} 
                      className="booking-poster"
                    />
                    <div className="booking-details-col">
                      <h4 className="b-movie-title">{b.movie.movie}</h4>
                      <div className="b-meta-chips">
                        <span>{b.format}</span>
                        <span>{b.movie.language}</span>
                      </div>
                      <p className="b-theatre-name">{b.theatreName}</p>
                      <p className="b-datetime">
                        {b.dateInfo?.fullDate || 'Today'} • {b.showTime}
                      </p>
                    </div>
                  </div>

                  {/* Confirmed Seats Pill */}
                  <div className="b-seats-box">
                    <span className="b-seats-label">Seats:</span>
                    <div className="b-seat-badges">
                      {b.selectedSeats.map(s => (
                        <span key={s.id} className="b-seat-pill">
                          {s.row}{s.num}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="booking-item-footer">
                    <div className="b-price-paid">
                      <span>Paid:</span>
                      <strong>₹{b.grandTotal}</strong>
                    </div>

                    <div className="b-actions-row">
                      <button
                        type="button"
                        className="btn-view-pass"
                        onClick={() => onViewTicketPass(b)}
                      >
                        <QrCode size={15} />
                        <span>View Pass</span>
                      </button>

                      {onCancelBooking && (
                        <button
                          type="button"
                          className="btn-cancel-booking"
                          onClick={() => onCancelBooking(b.bookingId)}
                          title="Cancel ticket"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
