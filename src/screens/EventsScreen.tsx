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
import DatabaseService, { Event } from '../services/DatabaseService';
import { formatDate } from '../utils/dateUtils';
import { COLORS } from '../constants/colors';

const EventsScreen = ({ navigation }: any) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEvents();
    const unsubscribe = navigation.addListener('focus', loadEvents);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const data = await DatabaseService.getAllEvents();
      setEvents(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      Alert.alert('خطأ', 'فشل في تحميل الفعاليات');
    } finally {
      setIsLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;
    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.eventType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredEvents(filtered);
  };

  const handleDeleteEvent = (id: string) => {
    Alert.alert('حذف الفعالية', 'هل تريد حذف هذه الفعالية؟', [
      { text: 'إلغاء', style: 'cancel' },
      {
        text: 'حذف',
        onPress: async () => {
          try {
            await DatabaseService.deleteEvent(id);
            await loadEvents();
            Alert.alert('تم', 'تم حذف الفعالية بنجاح');
          } catch (error) {
            Alert.alert('خطأ', 'فشل في حذف الفعالية');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderEventCard = (event: Event) => (
    <Card key={event.id} style={styles.card}>
      <Card.Content>
        <Text style={styles.eventName}>{event.name}</Text>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="calendar" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{formatDate(event.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="clock" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{event.startTime} - {event.endTime}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="tag" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{event.eventType}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="users" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>السعة: {event.capacity}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="cash" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{event.price.toLocaleString()} ريال</Text>
        </View>
        <View style={styles.cardActions}>
          <Button
            mode="outlined"
            size="small"
            onPress={() => navigation.navigate('EditEvent', { id: event.id })}
          >
            تعديل
          </Button>
          <Button
            mode="outlined"
            size="small"
            textColor="#FF6B6B"
            onPress={() => handleDeleteEvent(event.id)}
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
        placeholder="ابحث عن فعالية..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <ScrollView style={styles.content}>
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="inbox-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>لا توجد فعاليات</Text>
          </View>
        ) : (
          filteredEvents.map(event => renderEventCard(event))
        )}
      </ScrollView>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddEvent')}
        label="فعالية جديدة"
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
  eventName: {
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

export default EventsScreen;
