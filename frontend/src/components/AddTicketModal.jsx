import React, { useState } from 'react';
import { X, PlusCircle, Film, MapPin, Clock, IndianRupee, Sparkles, CheckCircle2 } from 'lucide-react';
import { POPULAR_CITIES } from '../data/mockData';

export default function AddTicketModal({
  onClose,
  onSubmitNewItem,
  defaultCity
}) {
  const [formData, setFormData] = useState({
    movie: '',
    theatre: '',
    show_time: '07:30 PM',
    price: '280',
    language: 'English',
    format: 'IMAX 3D',
    genre: 'Action/Sci-Fi',
    city: defaultCity || 'Mumbai',
    rating: '9.1'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.movie.trim() || !formData.theatre.trim()) {
      setErrorMessage('Please fill in both the Movie Title and Theatre name.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await onSubmitNewItem({
        ...formData,
        price: Number(formData.price) || 250,
        rating: Number(formData.rating) || 9.0
      });
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to submit movie listing.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-ticket-modal" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="add-modal-header">
          <div className="header-icon-badge">
            <PlusCircle size={22} className="accent-icon" />
          </div>
          <div>
            <h3 className="add-title">List New Movie Showtime</h3>
            <p className="add-sub">Syncs directly with backend API (POST /items) in real time</p>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="add-ticket-form">
          {errorMessage && (
            <div className="form-alert-error">
              {errorMessage}
            </div>
          )}

          {/* Movie Title */}
          <div className="form-group">
            <label htmlFor="input-movie-name">Movie Name *</label>
            <div className="input-with-icon">
              <Film size={16} className="field-icon" />
              <input
                type="text"
                id="input-movie-name"
                name="movie"
                required
                placeholder="e.g. Gladiator II, Deadpool & Wolverine, Oppenheimer"
                value={formData.movie}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Theatre Name & City */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="input-theatre-name">Theatre / Multiplex *</label>
              <div className="input-with-icon">
                <MapPin size={16} className="field-icon" />
                <input
                  type="text"
                  id="input-theatre-name"
                  name="theatre"
                  required
                  placeholder="e.g. PVR ICON: Phoenix Marketcity"
                  value={formData.theatre}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="select-city">City</label>
              <select
                id="select-city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-select"
              >
                {POPULAR_CITIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Showtime & Ticket Base Price */}
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="input-showtime">Showtime *</label>
              <div className="input-with-icon">
                <Clock size={16} className="field-icon" />
                <input
                  type="text"
                  id="input-showtime"
                  name="show_time"
                  required
                  placeholder="e.g. 07:30 PM"
                  value={formData.show_time}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-price">Base Ticket Price (₹) *</label>
              <div className="input-with-icon">
                <IndianRupee size={16} className="field-icon" />
                <input
                  type="number"
                  id="input-price"
                  name="price"
                  required
                  min="50"
                  max="2000"
                  placeholder="280"
                  value={formData.price}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          </div>

          {/* Format, Language, Genre */}
          <div className="form-row-3">
            <div className="form-group">
              <label htmlFor="select-format">Format</label>
              <select
                id="select-format"
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="form-select"
              >
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="IMAX 3D">IMAX 3D</option>
                <option value="4DX 3D">4DX 3D</option>
                <option value="IMAX 2D">IMAX 2D</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select-lang">Language</label>
              <select
                id="select-lang"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="form-select"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
                <option value="Tamil">Tamil</option>
                <option value="Marathi">Marathi</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input-genre">Genre</label>
              <input
                type="text"
                id="input-genre"
                name="genre"
                placeholder="Action/Sci-Fi"
                value={formData.genre}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="add-modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary btn-submit-ticket"
              disabled={isSubmitting}
              id="submit-ticket-btn"
            >
              {isSubmitting ? (
                <span>Adding to Cinema Listings...</span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Publish Movie Showtime</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
