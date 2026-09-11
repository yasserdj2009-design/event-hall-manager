import React from 'react';
import './SettingsPage.css';

function SettingsPage() {
  const handleClearData = () => {
    if (window.confirm('هل أنت متأكد من حذف جميع البيانات؟')) {
      localStorage.removeItem('eventHallData');
      window.location.reload();
    }
  };

  const handleDownloadBackup = () => {
    const data = localStorage.getItem('eventHallData');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', `event-hall-backup-${new Date().toISOString()}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="settings-page">
      <h1>الإعدادات</h1>

      <div className="settings-group">
        <h2>حول التطبيق</h2>
        <div className="setting-item">
          <div>
            <p className="setting-label">اسم التطبيق</p>
            <p className="setting-value">Event Hall Manager</p>
          </div>
        </div>
        <div className="setting-item">
          <div>
            <p className="setting-label">الإصدار</p>
            <p className="setting-value">1.0.0</p>
          </div>
        </div>
        <div className="setting-item">
          <div>
            <p className="setting-label">نوع التطبيق</p>
            <p className="setting-value">نسخة ويب</p>
          </div>
        </div>
      </div>

      <div className="settings-group">
        <h2>النسخ الاحتياطية</h2>
        <div className="setting-item full-width">
          <div>
            <p className="setting-label">تحميل نسخة احتياطية</p>
            <p className="setting-description">احفظ جميع بيانات التطبيق في ملف</p>
          </div>
          <button className="btn btn-primary" onClick={handleDownloadBackup}>
            تحميل
          </button>
        </div>
      </div>

      <div className="settings-group danger">
        <h2>خطر - البيانات الحساسة</h2>
        <div className="setting-item full-width">
          <div>
            <p className="setting-label">حذف جميع البيانات</p>
            <p className="setting-description">حذف جميع الحجوزات والعملاء والفعاليات</p>
          </div>
          <button className="btn btn-danger" onClick={handleClearData}>
            حذف
          </button>
        </div>
      </div>

      <div className="settings-group">
        <h2>المعلومات</h2>
        <p className="info-text">
          Event Hall Manager هو تطبيق ويب لإدارة قاعات الحفلات والفعاليات. يمكنك إدارة
          الحجوزات والعملاء والفعاليات والاطلاع على الإحصائيات والتقارير.
        </p>
        <p className="info-text">
          جميع البيانات يتم حفظها محليًا على جهازك ولا تُرسل إلى أي خادم.
        </p>
      </div>
    </div>
  );
}

export default SettingsPage;
