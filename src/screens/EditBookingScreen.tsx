import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import DatabaseService, { Booking } from '../services/DatabaseService';
import { formatDate } from '../utils/dateUtils';
import { COLORS } from '../constants/colors';

const EditBookingScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('0');
  const [budget, setBudget] = useState('0');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadBooking();
  }, []);

  const loadBooking = async () => {
    try {
      const data = await DatabaseService.getBookingById(id);
      if (data) {
        setBooking(data);
        setClientName(data.clientName);
        setClientPhone(data.clientPhone);
        setEventType(data.eventType);
        setGuestCount(data.guestCount.toString());
        setBudget(data.budget.toString());
        setNotes(data.notes);
        setStatus(data.status);
      }
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحميل الحجز');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await DatabaseService.updateBooking(id, {
        clientName,
        clientPhone,
        eventType,
        guestCount: parseInt(guestCount) || 0,
        budget: parseFloat(budget) || 0,
        notes,
        status: status as any,
      });
      Alert.alert('نجح', 'تم تحديث الحجز بنجاح');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحديث الحجز');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>جاري التحميل...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>بيانات العميل</Text>
        <TextInput
          label="اسم العميل"
          value={clientName}
          onChangeText={setClientName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="رقم الهاتف"
          value={clientPhone}
          onChangeText={setClientPhone}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>تفاصيل الفعالية</Text>
        <TextInput
          label="نوع الفعالية"
          value={eventType}
          onChangeText={setEventType}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="عدد الأضياف"
          value={guestCount}
          onChangeText={setGuestCount}
          mode="outlined"
          keyboardType="number-pad"
          style={styles.input}
        />
        <TextInput
          label="الميزانية (ريال)"
          value={budget}
          onChangeText={setBudget}
          mode="outlined"
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>الحالة</Text>
        <View style={styles.statusButtons}>
          {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
            <Button
              key={s}
              mode={status === s ? 'contained' : 'outlined'}
              onPress={() => setStatus(s)}
              style={styles.statusButton}
            >
              {s === 'pending' ? 'قيد الانتظار' : s === 'confirmed' ? 'مؤكد' : s === 'completed' ? 'مكتمل' : 'ملغى'}
            </Button>
          ))}
        </View>

        <TextInput
          label="ملاحظات"
          value={notes}
          onChangeText={setNotes}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          loading={isSaving}
          disabled={isSaving}
          style={styles.submitButton}
        >
          حفظ التغييرات
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  form: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
    marginTop: 12,
  },
  input: {
    marginBottom: 12,
  },
  statusButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  statusButton: {
    flex: 1,
    minWidth: '48%',
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
});

export default EditBookingScreen;
