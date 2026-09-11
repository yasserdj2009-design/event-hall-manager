import React, { useState } from 'react';
import './CustomersPage.css';

function CustomersPage({ data, setData }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };
    setData({
      ...data,
      customers: [...data.customers, newCustomer],
    });
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
    });
    setShowForm(false);
  };

  const handleDeleteCustomer = (id) => {
    setData({
      ...data,
      customers: data.customers.filter(c => c.id !== id),
    });
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <h1>إدارة العملاء</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'إغلاق' : '+ عميل جديد'}
        </button>
      </div>

      {showForm && (
        <form className="customer-form" onSubmit={handleAddCustomer}>
          <div className="form-row">
            <div className="form-group">
              <label>الاسم *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم العميل"
              />
            </div>
            <div className="form-group">
              <label>رقم الهاتف *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="أدخل رقم الهاتف"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="أدخل البريد الإلكتروني"
              />
            </div>
            <div className="form-group">
              <label>العنوان</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="أدخل العنوان"
              />
            </div>
          </div>
          <div className="form-group full-width">
            <label>ملاحظات</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="أي ملاحظات"
              rows="2"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-success">حفظ العميل</button>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>إلغاء</button>
          </div>
        </form>
      )}

      <div className="customers-grid">
        {data.customers.length === 0 ? (
          <div className="empty-state">لا توجد عملاء</div>
        ) : (
          data.customers.map(customer => (
            <div key={customer.id} className="customer-card">
              <div className="card-header">
                <h3>{customer.name}</h3>
                <button
                  className="btn-small btn-delete"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  ×
                </button>
              </div>
              <p><strong>الهاتف:</strong> {customer.phone}</p>
              {customer.email && <p><strong>البريد:</strong> {customer.email}</p>}
              {customer.address && <p><strong>العنوان:</strong> {customer.address}</p>}
              {customer.notes && <p><strong>الملاحظات:</strong> {customer.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomersPage;
