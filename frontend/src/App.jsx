import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import MovieDetailsModal from './components/MovieDetailsModal';
import ShowtimeSelectorModal from './components/ShowtimeSelectorModal';
import SeatSelectorModal from './components/SeatSelectorModal';
import FoodSelectorModal from './components/FoodSelectorModal';
import CheckoutModal from './components/CheckoutModal';
import TicketConfirmationModal from './components/TicketConfirmationModal';
import AddTicketModal from './components/AddTicketModal';
import MyBookingsDrawer from './components/MyBookingsDrawer';
import SupabaseModal from './components/SupabaseModal';
import Footer from './components/Footer';

import { fetchMovieListings, addMovieListing, saveBookingToDatabase, checkBackendHealth } from './services/api';
import { isSupabaseConfigured } from './services/supabaseClient';
import './App.css';


export default function App() {
  // Movie listings state
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [dbSource, setDbSource] = useState('flask');

  // User preferences & filters
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryTab, setCategoryTab] = useState('now-showing');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [activeNavTab, setActiveNavTab] = useState('movies');

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('showticket_favorites');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  // Booked tickets history
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('showticket_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Wizard Step States
  const [activeDetailMovie, setActiveDetailMovie] = useState(null);
  const [activeShowtimeMovie, setActiveShowtimeMovie] = useState(null);
  const [bookingContext, setBookingContext] = useState(null);
  const [wizardStep, setWizardStep] = useState(null); // 'seats' | 'food' | 'checkout'
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Initial load
  useEffect(() => {
    loadMovies();
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('showticket_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('showticket_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  async function loadMovies() {
    setIsLoading(true);
    const result = await fetchMovieListings();
    setMovies(result.data);
    setDbSource(result.dbSource || (result.isLiveBackend ? 'flask' : 'local'));
    setIsLiveBackend(result.dbSource === 'flask' || result.isLiveBackend);
    setIsLoading(false);
  }


  // Toggle Favorite
  const handleToggleFavorite = (movieId) => {
    setFavorites(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('All');
    setSelectedFormat('All');
    setSelectedGenre('All');
    setSortBy('rating');
    setCategoryTab('now-showing');
  };

  // Add new movie listing
  const handleAddNewItem = async (newItemData) => {
    const result = await addMovieListing(newItemData);
    if (result.success && result.data) {
      setMovies(prev => [result.data, ...prev]);
      if (result.isLiveBackend) {
        setIsLiveBackend(true);
      }
    }
  };

  // Cancel booking
  const handleCancelBooking = (bookingId) => {
    setBookings(prev => prev.filter(b => b.bookingId !== bookingId));
  };

  // Filter & Search Logic
  const filteredMovies = useMemo(() => {
    return movies
      .filter(m => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = m.movie.toLowerCase().includes(q);
          const matchTheatre = m.theatre.toLowerCase().includes(q);
          const matchGenre = (m.genre || '').toLowerCase().includes(q);
          const matchLang = (m.language || '').toLowerCase().includes(q);
          if (!matchTitle && !matchTheatre && !matchGenre && !matchLang) return false;
        }

        // Language
        if (selectedLanguage !== 'All') {
          if ((m.language || '').toLowerCase() !== selectedLanguage.toLowerCase()) return false;
        }

        // Format
        if (selectedFormat !== 'All') {
          if (!(m.format || '').toLowerCase().includes(selectedFormat.toLowerCase())) return false;
        }

        // Genre
        if (selectedGenre !== 'All') {
          if (!(m.genre || '').toLowerCase().includes(selectedGenre.toLowerCase())) return false;
        }

        // Category Tab
        if (categoryTab === 'imax') {
          const isImax = (m.format || '').includes('IMAX') || (m.format || '').includes('4DX');
          if (!isImax) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
        if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
        if (sortBy === 'title') return a.movie.localeCompare(b.movie);
        return 0;
      });
  }, [movies, searchQuery, selectedLanguage, selectedFormat, selectedGenre, sortBy, categoryTab]);

  // Booking Flow Steps Handlers
  const handleSelectMovieForBooking = (movie) => {
    setActiveDetailMovie(null);
    setActiveShowtimeMovie(movie);
  };

  const handleSelectShowtime = (context) => {
    setActiveShowtimeMovie(null);
    setBookingContext(context);
    setWizardStep('seats');
  };

  const handleProceedToFood = (contextWithSeats) => {
    setBookingContext(contextWithSeats);
    setWizardStep('food');
  };

  const handleProceedToCheckout = (contextWithFood) => {
    setBookingContext(contextWithFood);
    setWizardStep('checkout');
  };

  const handleConfirmPayment = (completeBooking) => {
    setWizardStep(null);
    setConfirmedBooking(completeBooking);
    // Add to bookings history
    setBookings(prev => [completeBooking, ...prev]);
    // Persist to Supabase database if configured
    saveBookingToDatabase(completeBooking);
  };

  const handleBookAnother = () => {
    setConfirmedBooking(null);
    setBookingContext(null);
    setWizardStep(null);
  };

  return (
    <div className="app-root">
      
      {/* Navigation */}
      <Navbar
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        bookingsCount={bookings.length}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenAddTicket={() => setIsAddTicketOpen(true)}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        isSupabaseActive={dbSource === 'supabase' || isSupabaseConfigured()}
        activeNavTab={activeNavTab}
        onSelectNavTab={setActiveNavTab}
      />


      <main className="main-content">
        {/* Hero Carousel */}
        <HeroCarousel 
          onSelectMovieById={(movieId) => {
            const m = movies.find(item => item.id === movieId);
            if (m) handleSelectMovieForBooking(m);
          }}
        />

        {/* Filter Toolbar */}
        <FilterBar
          selectedLanguage={selectedLanguage}
          onSelectLanguage={setSelectedLanguage}
          selectedFormat={selectedFormat}
          onSelectFormat={setSelectedFormat}
          selectedGenre={selectedGenre}
          onSelectGenre={setSelectedGenre}
          sortBy={sortBy}
          onSelectSortBy={setSortBy}
          categoryTab={categoryTab}
          onSelectCategoryTab={setCategoryTab}
          totalResults={filteredMovies.length}
          selectedCity={selectedCity}
          onResetFilters={handleResetFilters}
        />

        {/* Movie Grid */}
        <MovieGrid
          movies={filteredMovies}
          isLoading={isLoading}
          onBookTickets={handleSelectMovieForBooking}
          onViewDetails={(movie) => setActiveDetailMovie(movie)}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Footer */}
      <Footer 
        isLiveBackend={isLiveBackend}
        dbSource={dbSource}
        totalMoviesCount={movies.length}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />


      {/* MODAL 1: Movie Details */}
      {activeDetailMovie && (
        <MovieDetailsModal
          movie={activeDetailMovie}
          onClose={() => setActiveDetailMovie(null)}
          onProceedToShowtimes={(m) => handleSelectMovieForBooking(m)}
          isFavorite={favorites.includes(activeDetailMovie.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* MODAL 2: Showtimes & Multiplex Selector */}
      {activeShowtimeMovie && (
        <ShowtimeSelectorModal
          movie={activeShowtimeMovie}
          onClose={() => setActiveShowtimeMovie(null)}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {/* MODAL 3: Interactive Cinema Hall & Seat Layout */}
      {wizardStep === 'seats' && bookingContext && (
        <SeatSelectorModal
          bookingContext={bookingContext}
          onClose={() => {
            setWizardStep(null);
            setBookingContext(null);
          }}
          onBackToShowtimes={() => {
            setWizardStep(null);
            setActiveShowtimeMovie(bookingContext.movie);
          }}
          onProceedToFood={handleProceedToFood}
        />
      )}

      {/* MODAL 4: Food & Beverages Combo Picker */}
      {wizardStep === 'food' && bookingContext && (
        <FoodSelectorModal
          bookingContext={bookingContext}
          onClose={() => {
            setWizardStep(null);
            setBookingContext(null);
          }}
          onBackToSeats={() => setWizardStep('seats')}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {/* MODAL 5: Checkout & Payment Simulation */}
      {wizardStep === 'checkout' && bookingContext && (
        <CheckoutModal
          bookingContext={bookingContext}
          onClose={() => {
            setWizardStep(null);
            setBookingContext(null);
          }}
          onBackToFood={() => setWizardStep('food')}
          onConfirmPayment={handleConfirmPayment}
        />
      )}

      {/* MODAL 6: Booking Confirmation & Digital M-Ticket Pass */}
      {confirmedBooking && (
        <TicketConfirmationModal
          confirmedBooking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
          onBookAnother={handleBookAnother}
        />
      )}

      {/* MODAL 7: Add Movie Ticket (POST /items) */}
      {isAddTicketOpen && (
        <AddTicketModal
          defaultCity={selectedCity}
          onClose={() => setIsAddTicketOpen(false)}
          onSubmitNewItem={handleAddNewItem}
        />
      )}

      {/* DRAWER: My Bookings History */}
      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onViewTicketPass={(b) => {
          setIsMyBookingsOpen(false);
          setConfirmedBooking(b);
        }}
        onCancelBooking={handleCancelBooking}
      />

      {/* MODAL 8: Supabase Database Setup & Testing */}
      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onConfigSaved={() => loadMovies()}
      />

    </div>
  );
}

