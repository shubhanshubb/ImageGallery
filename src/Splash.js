import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('BottomTab');
    }, 1000);
  });
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Gallery</Text>
      <Text style={styles.header}>Designed by</Text>
      <Text style={styles.name}>Shubhanshu Barnwal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2655a3',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontFamily: 'sans-serif',
  },
  name: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
});

export default Splash;
