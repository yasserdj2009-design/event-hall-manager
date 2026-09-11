import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatabaseService from '../services/DatabaseService';
import { formatDate } from '../utils/dateUtils';
import { COLORS } from '../constants/colors';

const AddBookingScreen = ({ navigation }: any) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState('14:00');
  const [eventType, setEventType] = useState('');
  const [guestCount, setGuestCount] = useState('0');
  const [budget, setBudget] = useState('0');
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setEventDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleAddBooking = async () => {
    if (!clientName.trim() || !clientPhone.trim() || !eventType.trim()) {
      Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setIsLoading(true);
      await DatabaseService.addBooking({
        clientName,
        clientPhone,
        eventDate: eventDate.toISOString(),
        eventTime,
        eventType,
        guestCount: parseInt(guestCount) || 0,
        budget: parseFloat(budget) || 0,
        notes,
        status: 'pending',
      });

      Alert.alert('نجح', 'تم إضافة الحجز بنجاح');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في إضافة الحجز');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>بيانات العميل</Text>
        <TextInput
          label="اسم العميل *"
          value={clientName}
          onChangeText={setClientName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="رقم الهاتف *"
          value={clientPhone}
          onChangeText={setClientPhone}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>تفاصيل الفعالية</Text>
        <TextInput
          label="نوع الفعالية *"
          value={eventType}
          onChangeText={setEventType}
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          التاريخ: {formatDate(eventDate.toISOString())}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={eventDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          label="الوقت (HH:MM)"
          value={eventTime}
          onChangeText={setEventTime}
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
          onPress={handleAddBooking}
          loading={isLoading}
          disabled={isLoading}
          style={styles.submitButton}
        >
          إضافة الحجز
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
  submitButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
});

export default AddBookingScreen;
