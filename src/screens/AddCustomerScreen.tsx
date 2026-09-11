import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import DatabaseService from '../services/DatabaseService';
import { validateEmail, validatePhone, validateName } from '../utils/validationUtils';
import { COLORS } from '../constants/colors';

const AddCustomerScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCustomer = async () => {
    if (!validateName(name)) {
      Alert.alert('تنبيه', 'الرجاء إدخال اسم صحيح (حد أدنى حرفان)');
      return;
    }
    if (!validatePhone(phone)) {
      Alert.alert('تنبيه', 'الرجاء إدخال رقم هاتف صحيح');
      return;
    }
    if (email && !validateEmail(email)) {
      Alert.alert('تنبيه', 'الرجاء إدخال بريد إلكتروني صحيح');
      return;
    }

    try {
      setIsLoading(true);
      await DatabaseService.addCustomer({
        name,
        phone,
        email,
        address,
        notes,
      });

      Alert.alert('نجح', 'تم إضافة العميل بنجاح');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في إضافة العميل');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>بيانات العميل</Text>
        <TextInput
          label="الاسم *"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="رقم الهاتف *"
          value={phone}
          onChangeText={setPhone}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          label="البريد الإلكتروني"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="العنوان"
          value={address}
          onChangeText={setAddress}
          mode="outlined"
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
          onPress={handleAddCustomer}
          loading={isLoading}
          disabled={isLoading}
          style={styles.submitButton}
        >
          إضافة العميل
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

export default AddCustomerScreen;
