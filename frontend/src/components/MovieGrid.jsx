import React from 'react';
import MovieCard from './MovieCard';
import { Film, Sparkles, SearchX } from 'lucide-react';

export default function MovieGrid({
  movies,
  isLoading,
  onBookTickets,
  onViewDetails,
  favorites,
  onToggleFavorite,
  onResetFilters
}) {
  if (isLoading) {
    return (
      <div className="container movie-grid-container">
        <div className="skeleton-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="skeleton-card">
              <div className="skeleton-poster" />
              <div className="skeleton-line full" />
              <div className="skeleton-line medium" />
              <div className="skeleton-line short" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="container movie-grid-container">
        <div className="empty-state-card">
          <div className="empty-icon-box">
            <SearchX size={44} className="empty-icon" />
          </div>
          <h3>No Movies Found</h3>
          <p>We couldn't find any movie tickets matching your search query or selected filters.</p>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={onResetFilters}
          >
            Clear Filters & View All
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="container movie-grid-container">
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onBookTickets={onBookTickets}
            onViewDetails={onViewDetails}
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
