import React from 'react';
import { formatDate, formatCurrency } from '../../utils/helpers';

function BookingList({ bookings, onDelete, editingId, onUpdate }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: '#FF9800',
      confirmed: '#4CAF50',
      completed: '#2196F3',
      cancelled: '#F44336',
    };
    return colors[status] || '#999';
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="empty-state">
        <p>لا توجد حجوزات حالياً</p>
      </div>
    );
  }

  return (
    <div className="bookings-list">
      <div className="list-header">
        <div className="col col-1">اسم العميل</div>
        <div className="col col-2">نوع الفعالية</div>
        <div className="col col-3">التاريخ</div>
        <div className="col col-4">الميزانية</div>
        <div className="col col-5">الحالة</div>
        <div className="col col-6">الإجراءات</div>
      </div>
      {bookings.map(booking => (
        <div key={booking.id} className="list-item">
          <div className="col col-1">{booking.clientName}</div>
          <div className="col col-2">{booking.eventType}</div>
          <div className="col col-3">{formatDate(booking.eventDate)}</div>
          <div className="col col-4">{formatCurrency(booking.budget)}</div>
          <div className="col col-5">
            <span
              className="status-badge"
              style={{ backgroundColor: getStatusColor(booking.status) }}
            >
              {booking.status === 'pending' && 'قيد الانتظار'}
              {booking.status === 'confirmed' && 'مؤكد'}
              {booking.status === 'completed' && 'مكتمل'}
              {booking.status === 'cancelled' && 'ملغى'}
            </span>
          </div>
          <div className="col col-6 actions">
            <button className="btn-small btn-edit">تعديل</button>
            <button
              className="btn-small btn-delete"
              onClick={() => onDelete(booking.id)}
            >
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingList;
