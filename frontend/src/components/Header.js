import React from 'react';
import { FaCalendarAlt, FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">
            <FaCalendarAlt className="calendar-icon" />
            <FaWhatsapp className="whatsapp-icon" />
          </div>
          <h1>HealthTrack Reminders</h1>
        </div>
        <p className="tagline">Automated patient follow-up system with WhatsApp integration</p>
      </div>
    </header>
  );
};

export default Header;