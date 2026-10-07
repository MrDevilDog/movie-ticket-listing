import axios from 'axios';
import { INITIAL_MOVIES_METADATA } from '../data/mockData';
import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

const PROXY_BASE = '';
const DIRECT_BACKEND = 'http://127.0.0.1:5000';

export const apiClient = axios.create({
  baseURL: PROXY_BASE,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  validateStatus: (status) => status >= 200 && status < 400
});

// Response interceptor to catch any Axios error without crashing
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (config && !config._retried && !config.baseURL) {
      config._retried = true;
      config.baseURL = DIRECT_BACKEND;
      try {
        return await axios(config);
      } catch (fallbackError) {
        return Promise.resolve({
          data: null,
          status: fallbackError?.response?.status || 503,
          isError: true,
          errorMessage: fallbackError.message
        });
      }
    }

    return Promise.resolve({
      data: null,
      status: error?.response?.status || 500,
      isError: true,
      errorMessage: error.message
    });
  }
);

/**
 * Merges raw items with rich BookMyShow metadata
 */
export function enrichMovieItem(item) {
  if (!item) return null;
  const meta = INITIAL_MOVIES_METADATA[item.id] || {};
  
  return {
    id: item.id,
    movie: item.movie || 'Untitled Movie',
    theatre: item.theatre || meta.theatre || 'PVR Cinemas',
    show_time: item.show_time || meta.show_time || '07:30 PM',
    price: Number(item.price) || meta.price || 250,
    language: item.language || meta.language || 'English',
    format: item.format || meta.format || '2D',
    genre: item.genre || meta.genre || 'Action/Drama',
    rating: Number(item.rating) || meta.rating || 9.0,
    votes: item.votes || meta.votes || '25.4K',
    city: item.city || meta.city || 'Mumbai',
    badge: item.badge || meta.badge || 'Available',
    duration: item.duration || meta.duration || '2h 30m',
    certificate: item.certificate || meta.certificate || 'UA 16+',
    releaseDate: item.releaseDate || meta.releaseDate || 'Now In Cinemas',
    poster: item.poster || meta.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80',
    backdrop: item.backdrop || meta.backdrop || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    synopsis: item.synopsis || meta.synopsis || `Experience the spectacular presentation of ${item.movie} at ${item.theatre}. High-definition sound and crystal-clear projection guaranteed.`,
    cast: item.cast || meta.cast || [
      { name: "Lead Performer", role: "Protagonist", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80" },
      { name: "Supporting Cast", role: "Companion", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" }
    ],
    theatres: item.theatres || meta.theatres || [
      {
        name: item.theatre || 'PVR Multiplex',
        location: `${item.city || 'City'} Central Mall`,
        amenities: ['M-Ticket', 'Dolby Atmos', 'F&B Available'],
        shows: [
          { time: item.show_time || '07:30 PM', format: item.format || '2D', price: Number(item.price) || 250, status: 'available' },
          { time: '10:15 PM', format: item.format || '2D', price: Number(item.price) || 250, status: 'filling' }
        ]
      }
    ]
  };
}

/**
 * Fetch all movie listings from Supabase first, then Flask backend, then fallback
 */
export async function fetchMovieListings() {
  const supabase = getSupabaseClient();

  // 1. Check Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        return {
          success: true,
          data: data.map(enrichMovieItem),
          dbSource: 'supabase'
        };
      }
    } catch (sbErr) {
      console.warn('Supabase fetch failed, falling back to Flask:', sbErr);
    }
  }

  // 2. Check Flask API
  try {
    const res = await apiClient.get('/items');
    if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
      return {
        success: true,
        data: res.data.map(enrichMovieItem),
        dbSource: 'flask'
      };
    }
  } catch (err) {
    console.warn('Axios fetch exception handled gracefully:', err);
  }

  // 3. Fallback to Local Catalog
  return {
    success: true,
    data: Object.values(INITIAL_MOVIES_METADATA),
    dbSource: 'local'
  };
}

/**
 * Add a new movie ticket listing to Supabase and/or Flask backend
 */
export async function addMovieListing(newItem) {
  const supabase = getSupabaseClient();
  let createdItem = null;

  const payload = {
    movie: newItem.movie,
    theatre: newItem.theatre,
    show_time: newItem.show_time || '07:30 PM',
    price: Number(newItem.price) || 250,
    language: newItem.language || 'English',
    format: newItem.format || '2D',
    genre: newItem.genre || 'Action/Drama',
    rating: Number(newItem.rating) || 9.0,
    city: newItem.city || 'Mumbai',
    badge: 'Available',
    poster: newItem.poster || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80'
  };

  // 1. If Supabase configured, insert into Supabase `movies` table
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('movies')
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        createdItem = enrichMovieItem(data);
      }
    } catch (sbErr) {
      console.warn('Failed to insert into Supabase:', sbErr);
    }
  }

  // 2. Also sync with Flask backend
  try {
    const res = await apiClient.post('/items', payload);
    if (res && res.data && !res.isError && !createdItem) {
      createdItem = enrichMovieItem(res.data);
    }
  } catch (err) {
    console.warn('Flask sync error handled gracefully:', err);
  }

  // 3. Fallback simulation
  if (!createdItem) {
    createdItem = enrichMovieItem({
      id: Date.now(),
      ...payload
    });
  }

  return {
    success: true,
    data: createdItem,
    dbSource: supabase ? 'supabase' : 'flask'
  };
}

/**
 * Persist confirmed booking into Supabase database `bookings` table
 */
export async function saveBookingToDatabase(bookingData) {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('bookings').insert([{
      booking_id: bookingData.bookingId,
      movie_id: bookingData.movie?.id || null,
      movie_title: bookingData.movie?.movie || 'Movie',
      theatre_name: bookingData.theatreName || 'Theatre',
      show_time: bookingData.showTime,
      date_info: bookingData.dateInfo?.fullDate || 'Today',
      format: bookingData.format || '2D',
      seats: bookingData.selectedSeats || [],
      snacks: bookingData.selectedSnacks || [],
      grand_total: bookingData.grandTotal || 0,
      payment_method: bookingData.paymentMethod || 'UPI'
    }]);

    if (!error) {
      return true;
    }
    console.warn('Supabase booking insert notice:', error.message);
    return false;
  } catch (err) {
    console.warn('Supabase saveBookingToDatabase error:', err);
    return false;
  }
}

/**
 * Check backend /health using Axios
 */
export async function checkBackendHealth() {
  try {
    const res = await apiClient.get('/health');
    if (res && res.data && typeof res.data === 'string' && res.data.trim() === 'OK') {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
