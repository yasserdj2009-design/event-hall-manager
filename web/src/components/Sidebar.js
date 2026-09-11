import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, currentPage, onPageChange }) {
  const menuItems = [
    { id: 'bookings', label: 'الحجوزات', icon: '📅' },
    { id: 'customers', label: 'العملاء', icon: '👥' },
    { id: 'events', label: 'الفعاليات', icon: '⭐' },
    { id: 'statistics', label: 'الإحصائيات', icon: '📊' },
    { id: 'settings', label: 'الإعدادات', icon: '⚙️' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <div className="logo">🎭</div>
        <h2>Event Manager</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>© 2026 Event Hall Manager</p>
      </div>
    </aside>
  );
}

export default Sidebar;
