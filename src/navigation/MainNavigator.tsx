import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from './constants/colors';

// Screens
import BookingsScreen from './screens/BookingsScreen';
import AddBookingScreen from './screens/AddBookingScreen';
import EditBookingScreen from './screens/EditBookingScreen';
import BookingDetailScreen from './screens/BookingDetailScreen';
import CustomersScreen from './screens/CustomersScreen';
import AddCustomerScreen from './screens/AddCustomerScreen';
import EditCustomerScreen from './screens/EditCustomerScreen';
import EventsScreen from './screens/EventsScreen';
import AddEventScreen from './screens/AddEventScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import SettingsScreen from './screens/SettingsScreen';
import BackupScreen from './screens/BackupScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bookings Stack Navigator
const BookingsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="BookingsList"
      component={BookingsScreen}
      options={{ title: 'الحجوزات' }}
    />
    <Stack.Screen
      name="AddBooking"
      component={AddBookingScreen}
      options={{ title: 'حجز جديد' }}
    />
    <Stack.Screen
      name="EditBooking"
      component={EditBookingScreen}
      options={{ title: 'تعديل الحجز' }}
    />
    <Stack.Screen
      name="BookingDetail"
      component={BookingDetailScreen}
      options={{ title: 'تفاصيل الحجز' }}
    />
  </Stack.Navigator>
);

// Customers Stack Navigator
const CustomersStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="CustomersList"
      component={CustomersScreen}
      options={{ title: 'العملاء' }}
    />
    <Stack.Screen
      name="AddCustomer"
      component={AddCustomerScreen}
      options={{ title: 'عميل جديد' }}
    />
    <Stack.Screen
      name="EditCustomer"
      component={EditCustomerScreen}
      options={{ title: 'تعديل العميل' }}
    />
  </Stack.Navigator>
);

// Events Stack Navigator
const EventsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="EventsList"
      component={EventsScreen}
      options={{ title: 'الفعاليات' }}
    />
    <Stack.Screen
      name="AddEvent"
      component={AddEventScreen}
      options={{ title: 'فعالية جديدة' }}
    />
    <Stack.Screen
      name="EditEvent"
      component={EventsScreen}
      options={{ title: 'تعديل الفعالية' }}
    />
  </Stack.Navigator>
);

// Settings Stack Navigator
const SettingsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: COLORS.primary,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="SettingsList"
      component={SettingsScreen}
      options={{ title: 'الإعدادات' }}
    />
    <Stack.Screen
      name="Backup"
      component={BackupScreen}
      options={{ title: 'النسخ الاحتياطية' }}
    />
  </Stack.Navigator>
);

// Main Tab Navigator
export const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string = '';

        if (route.name === 'Bookings') {
          iconName = focused ? 'calendar-check' : 'calendar-blank';
        } else if (route.name === 'Customers') {
          iconName = focused ? 'account-multiple' : 'account-multiple-outline';
        } else if (route.name === 'Events') {
          iconName = focused ? 'star' : 'star-outline';
        } else if (route.name === 'Statistics') {
          iconName = focused ? 'chart-pie' : 'chart-pie';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'cog' : 'cog-outline';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textTertiary,
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: COLORS.divider,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '500',
      },
    })}
  >
    <Tab.Screen
      name="Bookings"
      component={BookingsStackNavigator}
      options={{ title: 'الحجوزات' }}
    />
    <Tab.Screen
      name="Customers"
      component={CustomersStackNavigator}
      options={{ title: 'العملاء' }}
    />
    <Tab.Screen
      name="Events"
      component={EventsStackNavigator}
      options={{ title: 'الفعاليات' }}
    />
    <Tab.Screen
      name="Statistics"
      component={StatisticsScreen}
      options={{ title: 'الإحصائيات' }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsStackNavigator}
      options={{ title: 'الإعدادات' }}
    />
  </Tab.Navigator>
);
