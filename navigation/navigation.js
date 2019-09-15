import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "../screens/home";
import LocationScreen from "../screens/location";
import SplashScreen from "../screens/splash"
import BackgroundScreen from "../screens/background"
import CameradScreen from "../screens/camera"

const LocationNavigator = createStackNavigator({
  Location: LocationScreen
})

const CameraNavigator = createStackNavigator({
  Camera: CameradScreen
})

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
})

const AppNavigator = createStackNavigator({
  Background: BackgroundScreen
});

const BottomNavigator = createBottomTabNavigator({
  Location: {
    screen: LocationNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="md-locate" size={25}/>
      }
    }
  },
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-home" size={25}/>
      }
    }
  },
  Camera: {
    screen: CameraNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-camera" size={25}/>
      }
    }
  }
})

const SwitchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: BottomNavigator
})

export default createAppContainer(SwitchNavigator);