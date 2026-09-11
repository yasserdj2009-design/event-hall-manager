import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Button, Card, Text, Divider, Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleAuthService from '../services/GoogleAuthService';
import GoogleDriveBackupService from '../services/GoogleDriveBackupService';
import DatabaseService from '../services/DatabaseService';
import { COLORS } from '../constants/colors';

const SettingsScreen = ({ navigation }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [autoBackup, setAutoBackup] = useState(false);
  const [appVersion] = useState('1.0.0');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    loadSettings();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticated = await GoogleAuthService.isSignedIn();
      setIsAuthenticated(authenticated);
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  const loadSettings = async () => {
    try {
      const autoBackupSetting = await AsyncStorage.getItem('autoBackup');
      setAutoBackup(autoBackupSetting === 'true');
    } catch (error) {
      console.error('Load settings error:', error);
    }
  };

  const handleAutoBackupChange = async (value: boolean) => {
    try {
      setAutoBackup(value);
      await AsyncStorage.setItem('autoBackup', value.toString());
      Alert.alert('تم', `النسخ الاحتياطي التلقائي ${value ? 'مفعّل' : 'معطّل'}`);
    } catch (error) {
      Alert.alert('خطأ', 'فشل في حفظ الإعداد');
    }
  };

  const handleClearData = () => {
    Alert.alert('حذف جميع البيانات', 'هل أنت متأكد؟ لا يمكن التراجع عن هذه العملية!', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        onPress: async () => {
          try {
            setIsLoading(true);
            await DatabaseService.clearAllData();
            Alert.alert('تم', 'تم حذف جميع البيانات');
          } catch (error) {
            Alert.alert('خطأ', 'فشل في حذف البيانات');
          } finally {
            setIsLoading(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const SettingItem = ({ icon, label, onPress, rightElement }: any) => (
    <Card style={styles.settingCard}>
      <Card.Content>
        <View style={styles.settingContent}>
          <View style={styles.settingLeft}>
            <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
            <Text style={styles.settingLabel}>{label}</Text>
          </View>
          {rightElement || (
            <MaterialCommunityIcons name="chevron-left" size={24} color={COLORS.textSecondary} />
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>الإعدادات</Text>
      </View>

      {/* Google Account Section */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>حساب جوجل</Text>
          <Divider style={styles.divider} />
          <SettingItem
            icon="google"
            label={isAuthenticated ? 'متصل بنجاح' : 'غير متصل'}
            rightElement={
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: isAuthenticated ? COLORS.success : COLORS.error },
                ]}
              />
            }
          />
          <Button
            mode="contained"
            onPress={checkAuthStatus}
            style={styles.button}
          >
            {isAuthenticated ? 'تحديث الحالة' : 'تسجيل الدخول'}
          </Button>
        </Card.Content>
      </Card>

      {/* Backup Section */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>النسخ الاحتياطية</Text>
          <Divider style={styles.divider} />
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>النسخ الاحتياطي التلقائي</Text>
              <Text style={styles.switchDescription}>إنشاء نسخة احتياطية يومية</Text>
            </View>
            <Switch
              value={autoBackup}
              onValueChange={handleAutoBackupChange}
            />
          </View>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Backup')}
            style={styles.button}
          >
            إدارة النسخ الاحتياطية
          </Button>
        </Card.Content>
      </Card>

      {/* Data Management */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>إدارة البيانات</Text>
          <Divider style={styles.divider} />
          <Button
            mode="outlined"
            onPress={handleClearData}
            loading={isLoading}
            disabled={isLoading}
            buttonColor={COLORS.error}
            style={styles.button}
            textColor={COLORS.error}
          >
            حذف جميع البيانات
          </Button>
        </Card.Content>
      </Card>

      {/* About Section */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>حول التطبيق</Text>
          <Divider style={styles.divider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>الإصدار</Text>
            <Text style={styles.aboutValue}>{appVersion}</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>اسم التطبيق</Text>
            <Text style={styles.aboutValue}>Event Hall Manager</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutLabel}>نظام التشغيل</Text>
            <Text style={styles.aboutValue}>Android</Text>
          </View>
          <Text style={styles.footerText}>
            © 2026 جميع الحقوق محفوظة
          </Text>
        </Card.Content>
      </Card>
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
    marginBottom: 20,
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  divider: {
    marginBottom: 12,
  },
  settingCard: {
    elevation: 1,
    marginBottom: 8,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  button: {
    marginTop: 12,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  switchDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  aboutLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  aboutValue: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  footerText: {
    fontSize: 11,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SettingsScreen;
