import React, { useState } from 'react';
import './BookingsPage.css';
import BookingForm from '../components/forms/BookingForm';
import BookingList from '../components/lists/BookingList';

function BookingsPage({ data, setData }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleAddBooking = (booking) => {
    const newBooking = {
      id: Date.now().toString(),
      ...booking,
      createdAt: new Date().toISOString(),
    };
    setData({
      ...data,
      bookings: [...data.bookings, newBooking],
    });
    setShowForm(false);
  };

  const handleUpdateBooking = (id, booking) => {
    setData({
      ...data,
      bookings: data.bookings.map(b => b.id === id ? { ...b, ...booking } : b),
    });
    setEditingId(null);
  };

  const handleDeleteBooking = (id) => {
    setData({
      ...data,
      bookings: data.bookings.filter(b => b.id !== id),
    });
  };

  return (
    <div className="bookings-page">
      <div className="page-header">
        <h1>إدارة الحجوزات</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'إغلاق' : '+ حجز جديد'}
        </button>
      </div>

      {showForm && (
        <BookingForm
          onSubmit={handleAddBooking}
          onCancel={() => setShowForm(false)}
        />
      )}

      <BookingList
        bookings={data.bookings}
        onEdit={setEditingId}
        onDelete={handleDeleteBooking}
        onUpdate={handleUpdateBooking}
        editingId={editingId}
      />
    </div>
  );
}

export default BookingsPage;
