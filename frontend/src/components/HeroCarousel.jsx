import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar, Sparkles, Play } from 'lucide-react';
import { HERO_BANNERS } from '../data/mockData';

export default function HeroCarousel({ onSelectMovieById }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HERO_BANNERS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % HERO_BANNERS.length);
  };

  const current = HERO_BANNERS[currentIndex];

  return (
    <div 
      className="hero-carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container hero-container">
        <div className="hero-slide-card">
          
          {/* Banner Graphic */}
          <div className="hero-image-wrap">
            <img 
              src={current.image} 
              alt={current.title} 
              className="hero-banner-img"
            />
            <div className="hero-gradient-overlay" />
          </div>

          {/* Banner Overlay Content */}
          <div className="hero-content">
            <div className="hero-meta-badges">
              <span className="hero-tag-badge">
                <Sparkles size={14} />
                {current.badge}
              </span>
              <span className="hero-rating-badge">
                <Star size={14} className="star-fill" />
                {current.rating}/10
              </span>
            </div>

            <h1 className="hero-title">{current.title}</h1>
            <p className="hero-subtitle">{current.subtitle}</p>

            <div className="hero-tags">
              <span className="hero-genre">{current.genre}</span>
              <span className="dot-sep">•</span>
              <span className="hero-date">
                <Calendar size={14} />
                {current.releaseDate}
              </span>
            </div>

            <div className="hero-actions">
              <button 
                type="button" 
                className="btn-primary hero-btn-book"
                onClick={() => onSelectMovieById(current.targetMovieId)}
                id={`hero-book-btn-${current.id}`}
              >
                <span>Book Tickets Now</span>
              </button>
              <button 
                type="button" 
                className="hero-trailer-btn"
                onClick={() => onSelectMovieById(current.targetMovieId)}
              >
                <div className="play-icon-circle">
                  <Play size={15} fill="currentColor" />
                </div>
                <span>Watch Trailer</span>
              </button>
            </div>
          </div>

          {/* Carousel Arrows */}
          <button 
            type="button" 
            className="carousel-nav-btn prev"
            onClick={handlePrev}
            aria-label="Previous banner"
          >
            <ChevronLeft size={22} />
          </button>
          <button 
            type="button" 
            className="carousel-nav-btn next"
            onClick={handleNext}
            aria-label="Next banner"
          >
            <ChevronRight size={22} />
          </button>

          {/* Indicator Dots */}
          <div className="carousel-indicators">
            {HERO_BANNERS.map((banner, idx) => (
              <button
                key={banner.id}
                type="button"
                className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
