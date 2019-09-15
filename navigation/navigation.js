import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "react-navigation-tabs";

import LocationScreen from "../screens/location/location";
import LocationDetailsScreen from "../screens/location/locationDetails";
import SplashScreen from "../screens/splash"
import BackgroundScreen from "../screens/background"
import VisitedLocationsScreen from "../screens/visitedLocations";

const LocationNavigator = createStackNavigator({
  Location: LocationScreen,
  LocationDetails: LocationDetailsScreen
})

const VisitedLocationsNavigator = createStackNavigator({
  VisitedLocations: VisitedLocationsScreen,
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
  VisitedLocations: {
    screen: VisitedLocationsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-locate" size={25}/>
      },
      title: "Visited Locations"
    }
  }
})

const SwitchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: BottomNavigator
})

export default createAppContainer(SwitchNavigator);