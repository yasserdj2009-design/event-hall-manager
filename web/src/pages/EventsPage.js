import React, { useState } from 'react';
import './EventsPage.css';

function EventsPage({ data, setData }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventType: '',
    date: '',
    startTime: '14:00',
    endTime: '22:00',
    capacity: '',
    price: '',
  });

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    setData({
      ...data,
      events: [...data.events, newEvent],
    });
    setFormData({
      name: '',
      description: '',
      eventType: '',
      date: '',
      startTime: '14:00',
      endTime: '22:00',
      capacity: '',
      price: '',
    });
    setShowForm(false);
  };

  const handleDeleteEvent = (id) => {
    setData({
      ...data,
      events: data.events.filter(e => e.id !== id),
    });
  };

  return (
    <div className="events-page">
      <div className="page-header">
        <h1>إدارة الفعاليات</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'إغلاق' : '+ فعالية جديدة'}
        </button>
      </div>

      {showForm && (
        <form className="event-form" onSubmit={handleAddEvent}>
          <div className="form-row">
            <div className="form-group">
              <label>اسم الفعالية *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم الفعالية"
              />
            </div>
            <div className="form-group">
              <label>نوع الفعالية *</label>
              <input
                type="text"
                required
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                placeholder="زفاف، حفلة، اجتماع"
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="وصف الفعالية"
              rows="2"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>التاريخ *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>وقت البداية</label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>وقت الانتهاء</label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>السعة</label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>
          <div className="form-group">
            <label>السعر (ريال)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-success">حفظ الفعالية</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>إلغاء</button>
          </div>
        </form>
      )}

      <div className="events-grid">
        {data.events.length === 0 ? (
          <div className="empty-state">لا توجد فعاليات</div>
        ) : (
          data.events.map(event => (
            <div key={event.id} className="event-card">
              <div className="card-header">
                <h3>{event.name}</h3>
                <button
                  className="btn-small btn-delete"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  ×
                </button>
              </div>
              <p><strong>النوع:</strong> {event.eventType}</p>
              <p><strong>التاريخ:</strong> {event.date}</p>
              <p><strong>الوقت:</strong> {event.startTime} - {event.endTime}</p>
              <p><strong>السعة:</strong> {event.capacity}</p>
              <p><strong>السعر:</strong> {event.price} ريال</p>
              {event.description && <p><strong>الوصف:</strong> {event.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventsPage;
