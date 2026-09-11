import React from 'react';
import { getStats, formatCurrency } from '../utils/helpers';
import './StatisticsPage.css';

function StatisticsPage({ data }) {
  const stats = getStats(data.bookings || []);

  const StatCard = ({ icon, label, value, color }) => (
    <div className="stat-card" style={{ borderColor: color }}>
      <div className="stat-icon" style={{ color }}>{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="statistics-page">
      <h1>الإحصائيات والتقارير</h1>

      <div className="stats-grid">
        <StatCard
          icon="📅"
          label="إجمالي الحجوزات"
          value={stats.totalBookings}
          color="#2196F3"
        />
        <StatCard
          icon="✅"
          label="حجوزات مؤكدة"
          value={stats.confirmedBookings}
          color="#4CAF50"
        />
        <StatCard
          icon="⏳"
          label="قيد الانتظار"
          value={stats.pendingBookings}
          color="#FF9800"
        />
        <StatCard
          icon="✔️"
          label="مكتملة"
          value={stats.completedBookings}
          color="#00BCD4"
        />
      </div>

      <div className="stats-grid">
        <StatCard
          icon="❌"
          label="ملغاة"
          value={stats.cancelledBookings}
          color="#F44336"
        />
        <StatCard
          icon="👥"
          label="إجمالي العملاء"
          value={data.customers?.length || 0}
          color="#9C27B0"
        />
        <StatCard
          icon="⭐"
          label="إجمالي الفعاليات"
          value={data.events?.length || 0}
          color="#FF5722"
        />
        <StatCard
          icon="💰"
          label="إجمالي الإيرادات"
          value={formatCurrency(stats.totalRevenue)}
          color="#1B5E20"
        />
      </div>

      <div className="summary-card">
        <h2>ملخص الأداء</h2>
        <div className="summary-content">
          <p>
            <strong>نسبة التأكيد:</strong>
            {stats.totalBookings > 0
              ? ((stats.confirmedBookings / stats.totalBookings) * 100).toFixed(1)
              : 0}
            %
          </p>
          <p>
            <strong>متوسط قيمة الحجز:</strong>
            {stats.totalBookings > 0
              ? formatCurrency(stats.totalRevenue / stats.totalBookings)
              : formatCurrency(0)}
          </p>
          <p>
            <strong>الحجوزات النشطة:</strong>
            {stats.confirmedBookings + stats.pendingBookings}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
