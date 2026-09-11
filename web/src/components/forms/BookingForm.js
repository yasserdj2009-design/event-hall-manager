import React, { useState } from 'react';

function BookingForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    eventDate: '',
    eventTime: '14:00',
    eventType: '',
    guestCount: '',
    budget: '',
    notes: '',
    status: 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      clientName: '',
      clientPhone: '',
      eventDate: '',
      eventTime: '14:00',
      eventType: '',
      guestCount: '',
      budget: '',
      notes: '',
      status: 'pending',
    });
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>اسم العميل *</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            placeholder="أدخل اسم العميل"
          />
        </div>
        <div className="form-group">
          <label>رقم الهاتف *</label>
          <input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            required
            placeholder="أدخل رقم الهاتف"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>نوع الفعالية *</label>
          <input
            type="text"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            placeholder="زفاف، حفلة، اجتماع"
          />
        </div>
        <div className="form-group">
          <label>تاريخ الفعالية *</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>الوقت</label>
          <input
            type="time"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>عدد الأضياف</label>
          <input
            type="number"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>الميزانية (ريال)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
        <div className="form-group">
          <label>الحالة</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">قيد الانتظار</option>
            <option value="confirmed">مؤكد</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغى</option>
          </select>
        </div>
      </div>

      <div className="form-group full-width">
        <label>ملاحظات</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="أي ملاحظات إضافية"
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-success">حفظ الحجز</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>إلغاء</button>
      </div>
    </form>
  );
}

export default BookingForm;
