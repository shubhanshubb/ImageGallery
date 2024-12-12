import {Platform} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../src/Splash';
import BottomTab from './BottomTab';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the header if needed
          // cardStyle: { backgroundColor: "rgba(0,0,0,0.1)" },
          // animationEnabled: "true",
        }}>
        <Stack.Screen
          name="Parent"
          component={Splash}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{
            headerShown: false,
            gestureEnabled: false,
            tabBarVisible: true,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigator;
