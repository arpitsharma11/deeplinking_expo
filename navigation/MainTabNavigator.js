import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Test1 from '../screens/Test1';
import Test2 from '../screens/Test2';
import CameraExample from '../screens/Camera';
import CropView from '../screens/CropView';
import ExampleComponent from '../screens/ExampleComponent';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createBottomTabNavigator({
  Links: {
    screen: LinksScreen,
    path: ''
  },
  Test2: {
    screen: CameraExample,
    path: 'camera'
  }
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack : {
    screen: HomeStack,
    path: ''
  },
  LinksStack: {
    screen: LinksStack,
    path: 'link'
  },
  SettingsStack: {
    screen: SettingsStack,
    path: 'setting'
  },
});
