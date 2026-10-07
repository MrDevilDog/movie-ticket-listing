import React from 'react';
import { X, Star, Calendar, Clock, Film, Ticket, Share2, ShieldCheck, Heart } from 'lucide-react';

export default function MovieDetailsModal({
  movie,
  onClose,
  onProceedToShowtimes,
  isFavorite,
  onToggleFavorite
}) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content movie-detail-modal" onClick={e => e.stopPropagation()}>
        
        {/* Close Button */}
        <button 
          type="button" 
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Backdrop Hero */}
        <div className="modal-backdrop-wrap">
          <img 
            src={movie.backdrop || movie.poster} 
            alt={movie.movie}
            className="modal-backdrop-img"
          />
          <div className="modal-backdrop-gradient" />
          
          <div className="modal-hero-content">
            <div className="modal-poster-thumb">
              <img src={movie.poster} alt={movie.movie} />
            </div>

            <div className="modal-hero-info">
              <div className="modal-badges-row">
                <span className="badge-cert">{movie.certificate || 'UA 16+'}</span>
                <span className="badge-fmt">{movie.format || '2D'}</span>
                <span className="badge-lang">{movie.language || 'English'}</span>
              </div>

              <h2 className="modal-movie-title">{movie.movie}</h2>

              <div className="modal-ratings-bar">
                <div className="modal-rating-pill">
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <span className="rating-score-bold">{movie.rating || 9.0}/10</span>
                  <span className="rating-votes-count">({movie.votes || '25K'} Votes)</span>
                </div>
                <button 
                  type="button"
                  className={`modal-wishlist-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => onToggleFavorite(movie.id)}
                >
                  <Heart size={16} fill={isFavorite ? "#EB3656" : "none"} />
                  <span>{isFavorite ? 'Wishlisted' : 'Wishlist'}</span>
                </button>
              </div>

              <div className="modal-specs-row">
                <div className="spec-item">
                  <Clock size={15} />
                  <span>{movie.duration || '2h 30m'}</span>
                </div>
                <div className="spec-divider">•</div>
                <div className="spec-item">
                  <Calendar size={15} />
                  <span>{movie.releaseDate || 'Now In Cinemas'}</span>
                </div>
                <div className="spec-divider">•</div>
                <div className="spec-item">
                  <span>{movie.genre || 'Action / Drama'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body-content">
          
          {/* About Section */}
          <div className="detail-section">
            <h4 className="detail-section-title">About the Movie</h4>
            <p className="synopsis-text">{movie.synopsis}</p>
          </div>

          {/* Cast & Crew Section */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="detail-section">
              <h4 className="detail-section-title">Cast & Characters</h4>
              <div className="cast-grid">
                {movie.cast.map((actor, idx) => (
                  <div key={idx} className="cast-card">
                    <img 
                      src={actor.avatar} 
                      alt={actor.name} 
                      className="cast-avatar"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <div className="cast-info">
                      <span className="actor-name">{actor.name}</span>
                      <span className="character-role">{actor.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities & Security */}
          <div className="safety-amenities-box">
            <ShieldCheck size={20} className="shield-icon" />
            <div>
              <strong>100% Contactless & Safe Cinema Experience</strong>
              <p>M-Tickets delivered instantly via SMS and E-mail. Temperature monitoring and sanitized seating.</p>
            </div>
          </div>

          {/* CTA Footer Bar */}
          <div className="modal-bottom-cta">
            <div className="ticket-pricing-teaser">
              <span className="teaser-label">Tickets starting at</span>
              <span className="teaser-price">₹{movie.price}</span>
            </div>
            <button
              type="button"
              className="btn-primary modal-book-cta-btn"
              onClick={() => {
                onProceedToShowtimes(movie);
              }}
              id="modal-proceed-showtimes-btn"
            >
              <Ticket size={18} />
              <span>Select Theatres & Showtimes</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
