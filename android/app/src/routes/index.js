import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import  LoginScreen  from '../screens/login/index'; 
import MsgListScreen from '../screens/msgList/index';

const AppNavigator = createStackNavigator(
    {
      Login: LoginScreen,
      MsgList: MsgListScreen,
    },
    {
      initialRouteName: 'Login',
    }
  );

export default createAppContainer(AppNavigator);