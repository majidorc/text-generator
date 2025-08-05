import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Import your converted components
import OperatorForm from './components/OperatorForm';
import CustomerForm from './components/CustomerForm';
import CommissionCalculator from './components/CommissionCalculator';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sharedName, setSharedName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Operator') {
                iconName = focused ? 'business' : 'business-outline';
              } else if (route.name === 'Customer') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Calculator') {
                iconName = focused ? 'calculator' : 'calculator-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Operator" 
            component={OperatorForm}
            options={{ title: 'Operator Form' }}
          />
          <Tab.Screen 
            name="Customer" 
            component={CustomerForm}
            options={{ title: 'Customer Form' }}
          />
          <Tab.Screen 
            name="Calculator" 
            component={CommissionCalculator}
            options={{ title: 'Commission Calculator' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 