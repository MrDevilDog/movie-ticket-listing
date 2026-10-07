import React from 'react';
import { SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

export default function FilterBar({
  selectedLanguage,
  onSelectLanguage,
  selectedFormat,
  onSelectFormat,
  selectedGenre,
  onSelectGenre,
  sortBy,
  onSelectSortBy,
  categoryTab,
  onSelectCategoryTab,
  totalResults,
  selectedCity,
  onResetFilters
}) {
  const languages = ['All', 'English', 'Hindi', 'Telugu', 'Tamil'];
  const formats = ['All', '2D', '3D', 'IMAX 3D', '4DX'];
  const genres = ['All', 'Action', 'Sci-Fi', 'Comedy', 'Horror', 'Adventure'];

  const hasActiveFilters = 
    selectedLanguage !== 'All' || 
    selectedFormat !== 'All' || 
    selectedGenre !== 'All' ||
    sortBy !== 'rating';

  return (
    <div className="filter-bar-wrapper">
      <div className="container">
        
        {/* Main Category Tabs */}
        <div className="category-tabs-row">
          <div className="category-tabs">
            <button
              type="button"
              className={`cat-tab ${categoryTab === 'now-showing' ? 'active' : ''}`}
              onClick={() => onSelectCategoryTab('now-showing')}
            >
              <span className="live-dot" />
              Now Showing
            </button>
            <button
              type="button"
              className={`cat-tab ${categoryTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => onSelectCategoryTab('upcoming')}
            >
              Upcoming Releases
            </button>
            <button
              type="button"
              className={`cat-tab ${categoryTab === 'imax' ? 'active' : ''}`}
              onClick={() => onSelectCategoryTab('imax')}
            >
              <Sparkles size={14} className="sparkle-icon" />
              IMAX & 4DX Specials
            </button>
          </div>

          {/* Results Summary */}
          <div className="filter-summary">
            <span className="results-count">
              Showing <strong>{totalResults}</strong> movies in <strong>{selectedCity}</strong>
            </span>
            {hasActiveFilters && (
              <button 
                type="button" 
                className="reset-filters-btn"
                onClick={onResetFilters}
                title="Reset all filters"
              >
                <RotateCcw size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills Toolbar */}
        <div className="filters-toolbar">
          
          {/* Language Pills */}
          <div className="filter-group">
            <span className="filter-label">Language:</span>
            <div className="pills-scroll">
              {languages.map(lang => (
                <button
                  key={lang}
                  type="button"
                  className={`filter-pill ${selectedLanguage === lang ? 'active' : ''}`}
                  onClick={() => onSelectLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider" />

          {/* Format Pills */}
          <div className="filter-group">
            <span className="filter-label">Format:</span>
            <div className="pills-scroll">
              {formats.map(fmt => (
                <button
                  key={fmt}
                  type="button"
                  className={`filter-pill ${selectedFormat === fmt ? 'active' : ''}`}
                  onClick={() => onSelectFormat(fmt)}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-divider" />

          {/* Genre Pills */}
          <div className="filter-group">
            <span className="filter-label">Genre:</span>
            <div className="pills-scroll">
              {genres.map(g => (
                <button
                  key={g}
                  type="button"
                  className={`filter-pill ${selectedGenre === g ? 'active' : ''}`}
                  onClick={() => onSelectGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Selector */}
          <div className="sort-group">
            <span className="filter-label">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              className="sort-select"
              id="movie-sort-select"
            >
              <option value="rating">★ Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title">Movie Title (A-Z)</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}
