import React, { useState } from 'react';
import { X, Calendar, MapPin, Info, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function ShowtimeSelectorModal({
  movie,
  onClose,
  onSelectShowtime
}) {
  if (!movie) return null;

  // Generate 5 days starting from today
  const dates = [
    { day: 'TODAY', date: '07 OCT', fullDate: 'Wed, 07 Oct 2026' },
    { day: 'THU', date: '08 OCT', fullDate: 'Thu, 08 Oct 2026' },
    { day: 'FRI', date: '09 OCT', fullDate: 'Fri, 09 Oct 2026' },
    { day: 'SAT', date: '10 OCT', fullDate: 'Sat, 10 Oct 2026' },
    { day: 'SUN', date: '11 OCT', fullDate: 'Sun, 11 Oct 2026' }
  ];

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  // Theatres with shows
  const theatresList = movie.theatres && movie.theatres.length > 0 ? movie.theatres : [
    {
      name: movie.theatre || 'PVR ICON Cinemas',
      location: `${movie.city || 'Mumbai'} Central Mall`,
      amenities: ['M-Ticket', 'Dolby Atmos 7.1', 'Food & Beverage'],
      shows: [
        { time: movie.show_time || '07:30 PM', format: movie.format || '2D', price: movie.price || 250, status: 'filling' },
        { time: '10:15 PM', format: movie.format || '2D', price: (movie.price || 250) + 30, status: 'available' }
      ]
    },
    {
      name: 'INOX Megaplex',
      location: `${movie.city || 'Mumbai'} Grand Mall`,
      amenities: ['M-Ticket', 'Recliner Seats', 'Gourmet F&B'],
      shows: [
        { time: '01:45 PM', format: movie.format || '2D', price: movie.price || 250, status: 'available' },
        { time: '05:30 PM', format: movie.format || '2D', price: (movie.price || 250) + 40, status: 'almost_full' },
        { time: '09:00 PM', format: movie.format || '2D', price: (movie.price || 250) + 50, status: 'filling' }
      ]
    }
  ];

  const handlePickShow = (theatre, show) => {
    onSelectShowtime({
      movie,
      theatreName: theatre.name,
      theatreLocation: theatre.location,
      dateInfo: dates[selectedDateIndex],
      showTime: show.time,
      format: show.format || movie.format,
      basePrice: show.price || movie.price
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content showtime-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="showtime-modal-header">
          <div className="showtime-header-left">
            <h2 className="showtime-movie-title">{movie.movie}</h2>
            <div className="showtime-header-tags">
              <span className="badge-cert">{movie.certificate || 'UA 16+'}</span>
              <span className="badge-lang">{movie.language || 'English'}</span>
              <span className="badge-fmt">{movie.format || '2D'}</span>
              <span className="showtime-genre-tag">{movie.genre}</span>
            </div>
          </div>
          
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close showtimes"
          >
            <X size={20} />
          </button>
        </div>

        {/* Date Selection Bar */}
        <div className="date-strip-wrapper">
          <div className="date-strip">
            {dates.map((d, idx) => (
              <button
                key={idx}
                type="button"
                className={`date-pill ${selectedDateIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedDateIndex(idx)}
              >
                <span className="date-day-label">{d.day}</span>
                <span className="date-num-label">{d.date}</span>
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="showtime-legend">
            <div className="legend-item">
              <span className="legend-dot status-available" />
              <span>Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot status-filling" />
              <span>Filling Fast</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot status-almost-full" />
              <span>Almost Full</span>
            </div>
          </div>
        </div>

        {/* Theatres & Showtimes List */}
        <div className="theatres-listing-body">
          {theatresList.map((theatre, tIdx) => (
            <div key={tIdx} className="theatre-listing-row">
              
              {/* Theatre Info Column */}
              <div className="theatre-info-col">
                <div className="theatre-title-wrap">
                  <Heart size={16} className="theatre-fav-icon" />
                  <h4 className="theatre-name">{theatre.name}</h4>
                </div>
                <div className="theatre-location-line">
                  <MapPin size={13} />
                  <span>{theatre.location}</span>
                </div>
                
                {/* Amenity Badges */}
                <div className="theatre-amenities">
                  {theatre.amenities && theatre.amenities.map((am, aIdx) => (
                    <span key={aIdx} className="amenity-tag">
                      {am}
                    </span>
                  ))}
                </div>
              </div>

              {/* Showtimes Pills Column */}
              <div className="theatre-times-col">
                <div className="shows-grid">
                  {theatre.shows.map((show, sIdx) => {
                    const statusClass = 
                      show.status === 'almost_full' ? 'status-almost-full' :
                      show.status === 'filling' ? 'status-filling' : 'status-available';

                    return (
                      <button
                        key={sIdx}
                        type="button"
                        className={`show-time-btn ${statusClass}`}
                        onClick={() => handlePickShow(theatre, show)}
                        title={`Format: ${show.format} | Price: ₹${show.price}`}
                      >
                        <span className="time-val">{show.time}</span>
                        <div className="show-subinfo">
                          <span className="show-fmt">{show.format}</span>
                          <span className="show-price">₹{show.price}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="cancellation-info">
                  <Info size={12} />
                  <span>Cancellation available up to 20 mins prior to showtime</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
