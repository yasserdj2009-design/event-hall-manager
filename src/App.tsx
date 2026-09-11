import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { I18nManager } from 'react-native';
import { theme } from './constants/theme';
import { MainNavigator } from './navigation/MainNavigator';
import GoogleAuthService from './services/GoogleAuthService';

// Force RTL layout for Arabic
I18nManager.forceRTL(true);

export default function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize Google Auth Service
      await GoogleAuthService.initialize();
      setIsInitialized(true);
    } catch (error) {
      console.error('App initialization error:', error);
      setIsInitialized(true);
    }
  };

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
