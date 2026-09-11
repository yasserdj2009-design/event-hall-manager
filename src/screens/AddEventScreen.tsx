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

const AddEventScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('22:00');
  const [capacity, setCapacity] = useState('0');
  const [price, setPrice] = useState('0');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const handleAddEvent = async () => {
    if (!name.trim() || !eventType.trim()) {
      Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      setIsLoading(true);
      await DatabaseService.addEvent({
        name,
        description,
        eventType,
        date: date.toISOString(),
        startTime,
        endTime,
        capacity: parseInt(capacity) || 0,
        price: parseFloat(price) || 0,
      });

      Alert.alert('نجح', 'تم إضافة الفعالية بنجاح');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في إضافة الفعالية');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>معلومات الفعالية</Text>
        <TextInput
          label="اسم الفعالية *"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="نوع الفعالية *"
          value={eventType}
          onChangeText={setEventType}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="الوصف"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
        />

        <Button
          mode="outlined"
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          التاريخ: {formatDate(date.toISOString())}
        </Button>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <TextInput
          label="وقت البدء (HH:MM)"
          value={startTime}
          onChangeText={setStartTime}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="وقت الانتهاء (HH:MM)"
          value={endTime}
          onChangeText={setEndTime}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="السعة"
          value={capacity}
          onChangeText={setCapacity}
          mode="outlined"
          keyboardType="number-pad"
          style={styles.input}
        />
        <TextInput
          label="السعر (ريال)"
          value={price}
          onChangeText={setPrice}
          mode="outlined"
          keyboardType="decimal-pad"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleAddEvent}
          loading={isLoading}
          disabled={isLoading}
          style={styles.submitButton}
        >
          إضافة الفعالية
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
  },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
});

export default AddEventScreen;
