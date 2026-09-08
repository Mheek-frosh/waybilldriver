import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import DriverDashboardScreen from './src/screens/DriverDashboardScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return <SafeAreaProvider><StatusBar style="light" /><NavigationContainer theme={DarkTheme}>
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#1C1C1E' }, animation: 'slide_from_right' }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="DriverDashboard" component={DriverDashboardScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  </NavigationContainer></SafeAreaProvider>;
}
