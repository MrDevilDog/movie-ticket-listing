import React, { useState } from 'react';
import { 
  Film, 
  MapPin, 
  Search, 
  Ticket, 
  PlusCircle, 
  ChevronDown, 
  Bell, 
  User, 
  Sparkles,
  SlidersHorizontal,
  X,
  Database
} from 'lucide-react';
import { POPULAR_CITIES } from '../data/mockData';

export default function Navbar({
  selectedCity,
  onSelectCity,
  searchQuery,
  onSearchChange,
  bookingsCount,
  onOpenMyBookings,
  onOpenAddTicket,
  onOpenSupabaseModal,
  isSupabaseActive,
  activeNavTab,
  onSelectNavTab
}) {

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const subNavItems = [
    { id: 'movies', label: 'Movies' },
    { id: 'stream', label: 'Stream' },
    { id: 'events', label: 'Events' },
    { id: 'plays', label: 'Plays' },
    { id: 'sports', label: 'Sports' },
    { id: 'activities', label: 'Activities' },
    { id: 'offers', label: 'Offers & Deals', badge: 'NEW' },
    { id: 'giftcards', label: 'Gift Cards' }
  ];

  return (
    <header className="navbar-wrapper">
      {/* Top Banner Notice */}
      <div className="top-strip">
        <div className="container top-strip-inner">
          <div className="top-strip-left">
            <span className="top-strip-tag">PROMO</span>
            <span>Get flat <strong>₹75 OFF</strong> on your first movie booking with code <strong>BMSFIRST</strong></span>
          </div>
          <div className="top-strip-right">
            <span>24/7 Cinema Support</span>
            <span className="divider">•</span>
            <span>List Your Cinema / Multiplex</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-navbar">
        <div className="container navbar-content">
          
          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => onSelectNavTab('movies')} title="ShowTicket - Book Movie Tickets">
            <div className="logo-icon-wrapper">
              <Film className="logo-icon" size={24} />
            </div>
            <div className="logo-text">
              <span className="logo-title">SHOW<span className="logo-highlight">TICKET</span></span>
              <span className="logo-subtitle">Cinemas & Entertainment</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="search-bar-container">
            <Search className="search-icon" size={19} />
            <input 
              type="text"
              id="movie-search-input"
              placeholder="Search for Movies, Theatres, Genres, or Languages..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <div className="search-badge">
              <span>⌘K</span>
            </div>
          </div>

          {/* Actions & Utilities */}
          <div className="navbar-actions">
            
            {/* City Selector */}
            <div className="city-selector-wrapper">
              <button 
                type="button"
                className="city-btn"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                id="city-selector-btn"
              >
                <MapPin className="city-icon" size={17} />
                <span className="city-name">{selectedCity}</span>
                <ChevronDown className={`chevron-icon ${isCityDropdownOpen ? 'rotated' : ''}`} size={16} />
              </button>

              {isCityDropdownOpen && (
                <>
                  <div className="dropdown-overlay" onClick={() => setIsCityDropdownOpen(false)} />
                  <div className="city-dropdown-menu">
                    <div className="city-dropdown-header">
                      <h4>Popular Cinema Hubs</h4>
                      <p>Select your city to view local multiplexes</p>
                    </div>
                    <div className="city-grid">
                      {POPULAR_CITIES.map(c => (
                        <button
                          key={c.id}
                          type="button"
                          className={`city-pill ${selectedCity === c.name ? 'selected' : ''}`}
                          onClick={() => {
                            onSelectCity(c.name);
                            setIsCityDropdownOpen(false);
                          }}
                        >
                          <span className="city-emoji">{c.icon}</span>
                          <span className="city-label">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Database / Supabase Setup Button */}
            <button 
              type="button"
              className={`btn-database ${isSupabaseActive ? 'active' : ''}`}
              onClick={onOpenSupabaseModal}
              id="supabase-db-btn"
              title="Configure Supabase Database"
            >
              <Database size={16} />
              <span>Database</span>
              {isSupabaseActive && <span className="db-active-dot" />}
            </button>

            {/* Add / List Ticket Button (Directly connects to Flask API) */}
            <button 
              type="button"
              className="btn-add-ticket"
              onClick={onOpenAddTicket}
              id="list-shows-btn"
              title="Add a new movie showtime to backend"
            >
              <PlusCircle size={17} />
              <span>List Show</span>
            </button>


            {/* My Bookings Button */}
            <button 
              type="button"
              className="btn-bookings"
              onClick={onOpenMyBookings}
              id="my-bookings-btn"
              title="View your booked tickets"
            >
              <Ticket size={18} />
              <span>My Tickets</span>
              {bookingsCount > 0 && (
                <span className="bookings-badge">{bookingsCount}</span>
              )}
            </button>

            {/* Profile Avatar */}
            <div className="user-profile-badge" title="Aquib (Verified User)">
              <div className="user-avatar">
                <span>AM</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Secondary Categories Sub-Bar */}
      <div className="sub-navbar">
        <div className="container sub-navbar-content">
          <nav className="sub-nav-links">
            {subNavItems.map(item => (
              <button
                key={item.id}
                type="button"
                className={`sub-nav-link ${activeNavTab === item.id ? 'active' : ''}`}
                onClick={() => onSelectNavTab(item.id)}
              >
                {item.label}
                {item.badge && <span className="sub-nav-badge">{item.badge}</span>}
              </button>
            ))}
          </nav>
          
          <div className="sub-nav-extras">
            <span className="corp-booking-link">Corporate Bookings</span>
            <span className="divider">•</span>
            <span className="gift-card-link">Offers & Vouchers</span>
          </div>
        </div>
      </div>
    </header>
  );
}
