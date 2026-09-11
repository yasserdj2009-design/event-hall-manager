import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import BookingsPage from './pages/BookingsPage';
import CustomersPage from './pages/CustomersPage';
import EventsPage from './pages/EventsPage';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('bookings');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [data, setData] = useState({
    bookings: [],
    customers: [],
    events: [],
  });

  // تحميل البيانات من localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('eventHallData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // حفظ البيانات في localStorage
  useEffect(() => {
    localStorage.setItem('eventHallData', JSON.stringify(data));
  }, [data]);

  const renderPage = () => {
    switch (currentPage) {
      case 'bookings':
        return <BookingsPage data={data} setData={setData} />;
      case 'customers':
        return <CustomersPage data={data} setData={setData} />;
      case 'events':
        return <EventsPage data={data} setData={setData} />;
      case 'statistics':
        return <StatisticsPage data={data} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <BookingsPage data={data} setData={setData} />;
    }
  };

  return (
    <div className="app">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
      />
      <div className="app-container">
        <Sidebar
          isOpen={sidebarOpen}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <main className="app-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
