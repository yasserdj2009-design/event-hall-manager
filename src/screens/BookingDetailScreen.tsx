import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, Card, Text, Divider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatabaseService, { Booking } from '../services/DatabaseService';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import { COLORS } from '../constants/colors';

const BookingDetailScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const data = await DatabaseService.getBookingById(id);
      setBooking(data);
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحميل الحجز');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return COLORS.success;
      case 'pending':
        return COLORS.warning;
      case 'completed':
        return COLORS.info;
      case 'cancelled':
        return COLORS.error;
      default:
        return COLORS.textTertiary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'مؤكد';
      case 'pending':
        return 'قيد الانتظار';
      case 'completed':
        return 'مكتمل';
      case 'cancelled':
        return 'ملغى';
      default:
        return status;
    }
  };

  if (isLoading || !booking) {
    return (
      <View style={styles.container}>
        <Text>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <View>
              <Text style={styles.clientName}>{booking.clientName}</Text>
              <Text style={styles.clientPhone}>{booking.clientPhone}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(booking.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusLabel(booking.status)}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>تفاصيل الفعالية</Text>
          <Divider style={styles.divider} />

          <DetailRow
            icon="calendar"
            label="التاريخ"
            value={formatDate(booking.eventDate)}
          />
          <DetailRow icon="clock" label="الوقت" value={booking.eventTime} />
          <DetailRow
            icon="tag"
            label="نوع الفعالية"
            value={booking.eventType}
          />
          <DetailRow
            icon="users"
            label="عدد الأضياف"
            value={booking.guestCount.toString()}
          />
          <DetailRow
            icon="cash"
            label="الميزانية"
            value={`${booking.budget.toLocaleString()} ريال`}
          />
        </Card.Content>
      </Card>

      {booking.notes && (
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>ملاحظات</Text>
            <Divider style={styles.divider} />
            <Text style={styles.notesText}>{booking.notes}</Text>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>معلومات النظام</Text>
          <Divider style={styles.divider} />
          <DetailRow
            icon="calendar-plus"
            label="تم الإنشاء في"
            value={formatDateTime(booking.createdAt)}
          />
          <DetailRow
            icon="calendar-edit"
            label="آخر تحديث"
            value={formatDateTime(booking.updatedAt)}
          />
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate('EditBooking', { id: booking.id })
          }
          style={styles.button}
        >
          تعديل
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
          العودة
        </Button>
      </View>
    </ScrollView>
  );
};

const DetailRow = ({ icon, label, value }: any) => (
  <View style={styles.detailRow}>
    <MaterialCommunityIcons name={icon} size={20} color={COLORS.primary} />
    <View style={styles.detailContent}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 12,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  clientPhone: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  divider: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  value: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginTop: 2,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
  },
});

export default BookingDetailScreen;
