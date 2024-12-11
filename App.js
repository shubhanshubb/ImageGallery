import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AppNavigator from './navigators/AppNavigator';

const App = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
