import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  FlatList,
} from 'react-native';
import { Button, Text, Card, FAB, Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatabaseService, { Customer } from '../services/DatabaseService';
import { COLORS } from '../constants/colors';

const CustomersScreen = ({ navigation }: any) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
    const unsubscribe = navigation.addListener('focus', loadCustomers);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchQuery]);

  const loadCustomers = async () => {
    try {
      setIsLoading(true);
      const data = await DatabaseService.getAllCustomers();
      setCustomers(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحميل العملاء');
    } finally {
      setIsLoading(false);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredCustomers(filtered);
  };

  const handleDeleteCustomer = (id: string) => {
    Alert.alert('حذف العميل', 'هل تريد حذف هذا العميل؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        onPress: async () => {
          try {
            await DatabaseService.deleteCustomer(id);
            await loadCustomers();
            Alert.alert('تم', 'تم حذف العميل بنجاح');
          } catch (error) {
            Alert.alert('خطأ', 'فشل في حذف العميل');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderCustomerCard = (customer: Customer) => (
    <Card key={customer.id} style={styles.card}>
      <Card.Content>
        <Text style={styles.customerName}>{customer.name}</Text>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="phone" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{customer.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="email" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{customer.email}</Text>
        </View>
        {customer.address && (
          <View style={styles.detailRow}>
            <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.primary} />
            <Text style={styles.detailText}>{customer.address}</Text>
          </View>
        )}
        <View style={styles.cardActions}>
          <Button
            mode="outlined"
            size="small"
            onPress={() => navigation.navigate('EditCustomer', { id: customer.id })}
          >
            تعديل
          </Button>
          <Button
            mode="outlined"
            size="small"
            textColor="#FF6B6B"
            onPress={() => handleDeleteCustomer(customer.id)}
          >
            حذف
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="ابحث عن عميل..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <ScrollView style={styles.content}>
        {filteredCustomers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="inbox-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>لا توجد عملاء</Text>
          </View>
        ) : (
          filteredCustomers.map(customer => renderCustomerCard(customer))
        )}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddCustomer')}
        label="عميل جديد"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchbar: {
    margin: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.textTertiary,
  },
});

export default CustomersScreen;
