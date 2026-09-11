import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import DatabaseService, { Customer } from '../services/DatabaseService';
import { validateEmail, validatePhone, validateName } from '../utils/validationUtils';
import { COLORS } from '../constants/colors';

const EditCustomerScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const data = await DatabaseService.getCustomerById(id);
      if (data) {
        setCustomer(data);
        setName(data.name);
        setPhone(data.phone);
        setEmail(data.email);
        setAddress(data.address);
        setNotes(data.notes);
      }
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحميل بيانات العميل');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!validateName(name)) {
      Alert.alert('تنبيه', 'الرجاء إدخال اسم صحيح');
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
      setIsSaving(true);
      await DatabaseService.updateCustomer(id, {
        name,
        phone,
        email,
        address,
        notes,
      });
      Alert.alert('نجح', 'تم تحديث بيانات العميل بنجاح');
      navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحديث البيانات');
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
        <Text style={styles.sectionTitle}>تعديل بيانات العميل</Text>
        <TextInput
          label="الاسم"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="رقم الهاتف"
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
  },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
});

export default EditCustomerScreen;
