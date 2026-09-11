export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ar-SA', options);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(amount || 0);
};

export const getPageTitle = (page) => {
  const titles = {
    bookings: 'الحجوزات',
    customers: 'العملاء',
    events: 'الفعاليات',
    statistics: 'الإحصائيات',
    settings: 'الإعدادات',
  };
  return titles[page] || 'الصفحة الرئيسية';
};

export const getStats = (bookings) => {
  return {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length,
    cancelledBookings: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings.reduce((sum, b) => sum + (parseFloat(b.budget) || 0), 0),
  };
};
