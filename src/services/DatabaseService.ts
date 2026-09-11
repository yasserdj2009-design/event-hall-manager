import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  guestCount: number;
  budget: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

class DatabaseService {
  private BOOKINGS_KEY = 'bookings_';
  private CUSTOMERS_KEY = 'customers_';
  private EVENTS_KEY = 'events_';

  // ============ Bookings ============

  async addBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    try {
      const id = uuidv4();
      const now = new Date().toISOString();
      const newBooking: Booking = {
        ...booking,
        id,
        createdAt: now,
        updatedAt: now,
      };

      const bookings = await this.getAllBookings();
      bookings.push(newBooking);
      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
      
      return newBooking;
    } catch (error) {
      console.error('Add booking error:', error);
      throw error;
    }
  }

  async getAllBookings(): Promise<Booking[]> {
    try {
      const data = await AsyncStorage.getItem('bookings');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Get all bookings error:', error);
      return [];
    }
  }

  async getBookingById(id: string): Promise<Booking | null> {
    try {
      const bookings = await this.getAllBookings();
      return bookings.find(b => b.id === id) || null;
    } catch (error) {
      console.error('Get booking by id error:', error);
      return null;
    }
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    try {
      const bookings = await this.getAllBookings();
      const index = bookings.findIndex(b => b.id === id);
      
      if (index === -1) return null;

      bookings[index] = {
        ...bookings[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
      return bookings[index];
    } catch (error) {
      console.error('Update booking error:', error);
      throw error;
    }
  }

  async deleteBooking(id: string): Promise<boolean> {
    try {
      const bookings = await this.getAllBookings();
      const filtered = bookings.filter(b => b.id !== id);
      await AsyncStorage.setItem('bookings', JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Delete booking error:', error);
      return false;
    }
  }

  async getBookingsByStatus(status: string): Promise<Booking[]> {
    try {
      const bookings = await this.getAllBookings();
      return bookings.filter(b => b.status === status);
    } catch (error) {
      console.error('Get bookings by status error:', error);
      return [];
    }
  }

  // ============ Customers ============

  async addCustomer(customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    try {
      const id = uuidv4();
      const now = new Date().toISOString();
      const newCustomer: Customer = {
        ...customer,
        id,
        createdAt: now,
        updatedAt: now,
      };

      const customers = await this.getAllCustomers();
      customers.push(newCustomer);
      await AsyncStorage.setItem('customers', JSON.stringify(customers));
      
      return newCustomer;
    } catch (error) {
      console.error('Add customer error:', error);
      throw error;
    }
  }

  async getAllCustomers(): Promise<Customer[]> {
    try {
      const data = await AsyncStorage.getItem('customers');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Get all customers error:', error);
      return [];
    }
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    try {
      const customers = await this.getAllCustomers();
      return customers.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Get customer by id error:', error);
      return null;
    }
  }

  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer | null> {
    try {
      const customers = await this.getAllCustomers();
      const index = customers.findIndex(c => c.id === id);
      
      if (index === -1) return null;

      customers[index] = {
        ...customers[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('customers', JSON.stringify(customers));
      return customers[index];
    } catch (error) {
      console.error('Update customer error:', error);
      throw error;
    }
  }

  async deleteCustomer(id: string): Promise<boolean> {
    try {
      const customers = await this.getAllCustomers();
      const filtered = customers.filter(c => c.id !== id);
      await AsyncStorage.setItem('customers', JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Delete customer error:', error);
      return false;
    }
  }

  // ============ Events ============

  async addEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    try {
      const id = uuidv4();
      const now = new Date().toISOString();
      const newEvent: Event = {
        ...event,
        id,
        createdAt: now,
        updatedAt: now,
      };

      const events = await this.getAllEvents();
      events.push(newEvent);
      await AsyncStorage.setItem('events', JSON.stringify(events));
      
      return newEvent;
    } catch (error) {
      console.error('Add event error:', error);
      throw error;
    }
  }

  async getAllEvents(): Promise<Event[]> {
    try {
      const data = await AsyncStorage.getItem('events');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Get all events error:', error);
      return [];
    }
  }

  async getEventById(id: string): Promise<Event | null> {
    try {
      const events = await this.getAllEvents();
      return events.find(e => e.id === id) || null;
    } catch (error) {
      console.error('Get event by id error:', error);
      return null;
    }
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
    try {
      const events = await this.getAllEvents();
      const index = events.findIndex(e => e.id === id);
      
      if (index === -1) return null;

      events[index] = {
        ...events[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('events', JSON.stringify(events));
      return events[index];
    } catch (error) {
      console.error('Update event error:', error);
      throw error;
    }
  }

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const events = await this.getAllEvents();
      const filtered = events.filter(e => e.id !== id);
      await AsyncStorage.setItem('events', JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Delete event error:', error);
      return false;
    }
  }

  // ============ Statistics ============

  async getStatistics() {
    try {
      const bookings = await this.getAllBookings();
      const customers = await this.getAllCustomers();
      const events = await this.getAllEvents();

      const totalBookings = bookings.length;
      const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const completedBookings = bookings.filter(b => b.status === 'completed').length;
      const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
      
      const totalRevenue = bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.budget, 0);

      const avgBookingValue = totalBookings > 0 
        ? bookings.reduce((sum, b) => sum + b.budget, 0) / totalBookings 
        : 0;

      return {
        totalBookings,
        confirmedBookings,
        pendingBookings,
        completedBookings,
        cancelledBookings,
        totalCustomers: customers.length,
        totalEvents: events.length,
        totalRevenue,
        avgBookingValue: Math.round(avgBookingValue),
      };
    } catch (error) {
      console.error('Get statistics error:', error);
      throw error;
    }
  }

  // ============ Clear All Data ============

  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem('bookings');
      await AsyncStorage.removeItem('customers');
      await AsyncStorage.removeItem('events');
    } catch (error) {
      console.error('Clear all data error:', error);
      throw error;
    }
  }
}

export default new DatabaseService();
