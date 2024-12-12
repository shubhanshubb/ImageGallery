import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../src/bottomTab/Home';
import AIcon from 'react-native-vector-icons/AntDesign';
import Search from '../src/bottomTab/Search';
import Create from '../src/bottomTab/Create';
import Community from '../src/bottomTab/Community';
import Me from '../src/bottomTab/Me';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let imageSource;

          switch (route.name) {
            case 'Home':
              imageSource = 'home';
              break;
            case 'Search':
              imageSource = 'search1';
              break;
            case 'Create':
              imageSource = 'pluscircleo';
              break;
            case 'Community':
              imageSource = 'man';
              break;
            case 'Me':
              imageSource = 'user';
              break;
            default:
              break;
          }
          return (
            <AIcon
              name={imageSource}
              size={24}
              color={focused ? 'black' : 'gray'}
            />
          );
        },
        tabBarLabel: ({focused, color}) => {
            let fontFamily = focused ? 'sans-serif-medium' : 'sans-serif';
            return (
              <Text style={{color, fontFamily, fontSize: 12}}>
                {route.name}
              </Text>
            );
          },
        tabBarStyle: {
          backgroundColor: '#E7EEFA',
          height: 60,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Me" component={Me} />
    </Tab.Navigator>
  );
};

export default BottomTab;
