import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatabaseService from '../services/DatabaseService';
import { COLORS } from '../constants/colors';

const StatisticsScreen = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const data = await DatabaseService.getStatistics();
      setStats(data);
    } catch (error) {
      console.error('Load statistics error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ icon, label, value, color }: any) => (
    <Card style={[styles.statCard, { borderLeftColor: color, borderLeftWidth: 4 }]}>
      <Card.Content style={styles.statContent}>
        <View style={styles.statLeft}>
          <MaterialCommunityIcons name={icon} size={32} color={color} />
        </View>
        <View style={styles.statRight}>
          <Text style={styles.statLabel}>{label}</Text>
          <Text style={[styles.statValue, { color }]}>{value}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (isLoading || !stats) {
    return (
      <View style={styles.container}>
        <Text>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>الإحصائيات والتقارير</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="calendar-check"
          label="إجمالي الحجوزات"
          value={stats.totalBookings}
          color={COLORS.primary}
        />
        <StatCard
          icon="check-circle"
          label="حجوزات مؤكدة"
          value={stats.confirmedBookings}
          color={COLORS.success}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="clock"
          label="قيد الانتظار"
          value={stats.pendingBookings}
          color={COLORS.warning}
        />
        <StatCard
          icon="check-all"
          label="مكتملة"
          value={stats.completedBookings}
          color={COLORS.info}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="cancel"
          label="ملغاة"
          value={stats.cancelledBookings}
          color={COLORS.error}
        />
        <StatCard
          icon="account-multiple"
          label="إجمالي العملاء"
          value={stats.totalCustomers}
          color={COLORS.primary}
        />
      </View>

      <Card style={styles.revenueCard}>
        <Card.Content>
          <Text style={styles.revenueLabel}>إجمالي الإيرادات</Text>
          <Text style={styles.revenueValue}>{stats.totalRevenue.toLocaleString()} ريال</Text>
        </Card.Content>
      </Card>

      <Card style={styles.revenueCard}>
        <Card.Content>
          <Text style={styles.revenueLabel}>متوسط قيمة الحجز</Text>
          <Text style={styles.revenueValue}>{stats.avgBookingValue.toLocaleString()} ريال</Text>
        </Card.Content>
      </Card>

      <Card style={styles.revenueCard}>
        <Card.Content>
          <Text style={styles.revenueLabel}>إجمالي الفعاليات</Text>
          <Text style={styles.revenueValue}>{stats.totalEvents}</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={loadStatistics}
        style={styles.refreshButton}
      >
        تحديث البيانات
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 12,
  },
  header: {
    marginBottom: 24,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statsGrid: {
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    elevation: 2,
    marginBottom: 0,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLeft: {
    marginRight: 16,
  },
  statRight: {
    flex: 1,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  revenueCard: {
    marginBottom: 12,
    elevation: 2,
  },
  revenueLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  revenueValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  refreshButton: {
    marginVertical: 20,
  },
});

export default StatisticsScreen;
