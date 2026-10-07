import React, { useState } from 'react';
import { Star, Heart, Clock, MapPin, Ticket, Info, Film } from 'lucide-react';

export default function MovieCard({
  movie,
  onBookTickets,
  onViewDetails,
  isFavorite,
  onToggleFavorite
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="movie-card" id={`movie-card-${movie.id}`}>
      
      {/* Poster Media Box */}
      <div className="movie-poster-wrap" onClick={() => onViewDetails(movie)}>
        <img 
          src={imageError ? 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80' : movie.poster} 
          alt={movie.movie}
          className="movie-poster-img"
          onError={() => setImageError(true)}
          loading="lazy"
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          className={`movie-fav-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          aria-label="Add to wishlist"
          title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} fill={isFavorite ? "#EB3656" : "none"} />
        </button>

        {/* Top Badges */}
        <div className="poster-top-badges">
          {movie.badge && (
            <span className="badge-promo">{movie.badge}</span>
          )}
          {movie.certificate && (
            <span className="badge-cert">{movie.certificate}</span>
          )}
        </div>

        {/* Rating Bar (BookMyShow style strip) */}
        <div className="poster-rating-strip">
          <div className="rating-score">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span className="rating-val">{movie.rating || 9.0}/10</span>
          </div>
          <span className="votes-count">{movie.votes || '25K'} Votes</span>
        </div>

        {/* Format overlay on hover */}
        <div className="poster-hover-overlay">
          <button 
            type="button" 
            className="hover-quick-btn"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(movie);
            }}
          >
            <Info size={15} />
            <span>Synopsis & Cast</span>
          </button>
        </div>
      </div>

      {/* Movie Details Info */}
      <div className="movie-card-info">
        
        {/* Formats and Languages Chips */}
        <div className="movie-formats-row">
          <span className="format-tag">{movie.format || '2D'}</span>
          <span className="lang-tag">{movie.language || 'English'}</span>
          {movie.duration && (
            <span className="duration-tag">
              <Clock size={11} />
              {movie.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="movie-card-title" onClick={() => onViewDetails(movie)} title={movie.movie}>
          {movie.movie}
        </h3>

        {/* Genre */}
        <p className="movie-card-genre">{movie.genre || 'Action / Drama'}</p>

        {/* Multiplex & Showtime preview */}
        <div className="movie-theatre-snippet">
          <div className="theatre-line" title={movie.theatre}>
            <MapPin size={12} className="theatre-pin-icon" />
            <span className="theatre-name-text">{movie.theatre}</span>
          </div>
          <div className="showtime-price-line">
            <span className="snippet-time">{movie.show_time || '07:30 PM'}</span>
            <span className="snippet-price">₹{movie.price}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="movie-card-actions">
          <button
            type="button"
            className="btn-primary btn-book-card"
            onClick={() => onBookTickets(movie)}
            id={`book-now-btn-${movie.id}`}
          >
            <Ticket size={16} />
            <span>Book Tickets</span>
          </button>
        </div>

      </div>

    </div>
  );
}
