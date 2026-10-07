import React from 'react';
import { Film, ShieldCheck, Headphones, Mail, HelpCircle, Heart, Server, Database } from 'lucide-react';

export default function Footer({ isLiveBackend, dbSource = 'flask', totalMoviesCount, onOpenSupabaseModal }) {
  return (
    <footer className="footer-wrapper">
      
      {/* Customer Promise Banner */}
      <div className="footer-promise-bar">
        <div className="container promise-grid">
          <div className="promise-item">
            <div className="promise-icon-box">
              <Headphones size={24} />
            </div>
            <div>
              <h4>24/7 CUSTOMER CARE</h4>
              <p>We're here to help with your bookings & inquiries</p>
            </div>
          </div>

          <div className="promise-item">
            <div className="promise-icon-box">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4>100% SECURE CHECKOUT</h4>
              <p>PCI-DSS certified encrypted payments</p>
            </div>
          </div>

          <div className="promise-item">
            <div className="promise-icon-box">
              <Mail size={24} />
            </div>
            <div>
              <h4>INSTANT M-TICKET</h4>
              <p>Direct QR delivery via SMS & WhatsApp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container">
          
          <div className="footer-brand-row">
            <div className="brand-logo footer-logo">
              <div className="logo-icon-wrapper">
                <Film className="logo-icon" size={24} />
              </div>
              <div className="logo-text">
                <span className="logo-title">SHOW<span className="logo-highlight">TICKET</span></span>
                <span className="logo-subtitle">Cinemas & Entertainment</span>
              </div>
            </div>

            {/* Backend & Database Connectivity Status Badge */}
            <div className="footer-badges-group">
              <div 
                className="backend-status-pill clickable-pill"
                onClick={onOpenSupabaseModal}
                title="Click to configure Supabase Database"
              >
                <Database size={14} className="db-pill-icon" />
                <span className={`status-indicator-dot ${dbSource === 'supabase' ? 'online' : 'info'}`} />
                <span>
                  DB: <strong>{dbSource === 'supabase' ? 'Supabase PostgreSQL (Live)' : 'Supabase (Click to connect)'}</strong>
                </span>
              </div>

              <div className="backend-status-pill">
                <Server size={14} />
                <span className={`status-indicator-dot ${isLiveBackend || dbSource !== 'local' ? 'online' : 'fallback'}`} />
                <span>
                  API: <strong>{isLiveBackend ? 'Connected to Flask (Port 5000)' : 'API Active'}</strong>
                </span>
              </div>
            </div>
          </div>


          {/* Links Grid */}
          <div className="footer-links-grid">
            <div className="footer-col">
              <h5>Movies By Language</h5>
              <ul>
                <li><a href="#hindi">Hindi Movies In Cinemas</a></li>
                <li><a href="#english">English Hollywood Releases</a></li>
                <li><a href="#telugu">Telugu Blockbusters</a></li>
                <li><a href="#tamil">Tamil Premieres</a></li>
                <li><a href="#marathi">Marathi Cinema</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Cinema Formats</h5>
              <ul>
                <li><a href="#imax">IMAX 3D Laser Theatres</a></li>
                <li><a href="#4dx">4DX Motion & Sensory</a></li>
                <li><a href="#dolby">Dolby Atmos Sound Theatres</a></li>
                <li><a href="#pvr-gold">PVR Gold & Recliner Class</a></li>
                <li><a href="#drive-in">Drive-in Open Air Cinemas</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Partner Multiplexes</h5>
              <ul>
                <li><a href="#pvr">PVR INOX Cinemas</a></li>
                <li><a href="#cinepolis">Cinepolis Multiplexes</a></li>
                <li><a href="#miraj">Miraj Cinemas</a></li>
                <li><a href="#moviemax">MovieMax Theatres</a></li>
                <li><a href="#mukta">Mukta A2 Cinemas</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Help & Support</h5>
              <ul>
                <li><a href="#about">About ShowTicket</a></li>
                <li><a href="#contact">Contact Support</a></li>
                <li><a href="#faqs">Booking FAQs</a></li>
                <li><a href="#cancellation">Cancellation Policy</a></li>
                <li><a href="#terms">Terms & Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="footer-bottom-strip">
            <p className="copyright-text">
              © {new Date().getFullYear()} ShowTicket Entertainment Pvt Ltd. Inspired by BookMyShow. Crafted with warm cream tones & cinema crimson aesthetics.
            </p>
            <p className="footer-disclaimer">
              Listing {totalMoviesCount} active movie showtimes. All movie titles, trademarks, and images belong to their respective studios.
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
}
