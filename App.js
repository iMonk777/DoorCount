import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import InitSettingsScreen from './src/components/InitSettingsScreen';
import CountScreen from './src/components/CountScreen';
import InAppSettingsScreen from './src/components/InAppSettingsScreen';
import ReportScreen from './src/components/ReportScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InitSettings"
          component={InitSettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CountScreen"
          component={CountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InAppSettings"
          component={InAppSettingsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
