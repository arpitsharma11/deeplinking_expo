import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

const MainApp = createAppContainer(createSwitchNavigator({
  Main: {
    screen: MainTabNavigator,
    path: ''
  },
}));

const prefix = Expo.Linking.makeUrl('/');

//console.log(prefix)
//alert(prefix);

const AppNavigator = () => <MainApp uriPrefix={prefix} />;

export default AppNavigator;

/*export default class AppNavigator extends React.Component{
  render(){
    return (
      <MainApp uriPrefix={prefix}/>
    )
  }
}*/