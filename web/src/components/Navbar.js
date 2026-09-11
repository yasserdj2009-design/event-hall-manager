import React from 'react';
import './Navbar.css';
import { getPageTitle } from '../utils/helpers';

function Navbar({ sidebarOpen, setSidebarOpen, currentPage }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <button
          className="menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <div className="navbar-title">
          <h1>{getPageTitle(currentPage)}</h1>
        </div>
        <div className="navbar-actions">
          <span className="version">v1.0.0</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
