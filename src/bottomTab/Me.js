import {View, Text} from 'react-native';
import React from 'react';

const Me = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Coming Soon
      </Text>
    </View>
  );
};

export default Me;
