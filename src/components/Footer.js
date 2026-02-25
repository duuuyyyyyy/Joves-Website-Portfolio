import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [localTime, setLocalTime] = useState('--:-- (UTC+08:00)');

  useEffect(() => {
    function updateLocalTime() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const offset = -now.getTimezoneOffset();
      const offsetHours = Math.floor(Math.abs(offset) / 60);
      const offsetMinutes = Math.abs(offset) % 60;
      const offsetSign = offset >= 0 ? '+' : '-';
      const timeZoneString = `UTC${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

      setLocalTime(`${hours}:${minutes}:${seconds} (${timeZoneString})`);
    }

    updateLocalTime();
    const interval = setInterval(updateLocalTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Grid 1: Quick Links, Socials, UTC/Contacts (Left) */}
        <div className="footer-grid-left">
          {/* Column 1: Quick Links */}
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Column 2: Socials */}
          <div className="footer-column">
            <h4>Socials</h4>
            <ul>
              <li><a href="https://www.linkedin.com/in/carla-joves-832059351/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://github.com/duuuyyyyyy" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.facebook.com/carla.joves.71/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>

          {/* Column 3: UTC Time & Contacts */}
          <div className="footer-column">
            <h4>Contacts</h4>
            <p><a href="mailto:carlajoves23@gmail.com">carlajoves23@gmail.com</a></p>
            <p>+63 998 448 8639</p>
            <h4 style={{ marginTop: 'var(--spacing-lg)' }}>UTC Time</h4>
            <p className="local-time" id="local-time">{localTime}</p>
          </div>
        </div>

        {/* Grid 2: Branding & Version (Right) */}
        <div className="footer-grid-right">
          <h3 className="signature">Carla J.</h3>
          <p className="version-mark">version 2026 ©</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
