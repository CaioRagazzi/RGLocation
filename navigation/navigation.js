import React from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "react-navigation-tabs";

import LocationScreen from "../screens/location/location";
import LocationDetailsScreen from "../screens/location/locationDetails";
import SplashScreen from "../screens/splash"
import RoadTripsScreen from "../screens/roadTrip/roadTrips"
import AddRoadTripsScreen from "../screens/roadTrip/addRoadTrips";
import EditRoadTripsScreen from "../screens/roadTrip/editRoadTrip";
import VisitedLocationsScreen from "../screens/visitedLocations/visitedLocations";
import SpecificLocationScreen from "../screens/visitedLocations/specificLocation";

const LocationNavigator = createStackNavigator({
  Location: LocationScreen,
  LocationDetails: LocationDetailsScreen
})

const VisitedLocationsNavigator = createStackNavigator({
  VisitedLocations: VisitedLocationsScreen,
  SpecificLocation: SpecificLocationScreen,
})

const RoadTripsNavigator = createStackNavigator({
  RoadTrips: RoadTripsScreen,
  AddRoadTrip: AddRoadTripsScreen,
  EditRoadTrip: EditRoadTripsScreen
});

const BottomNavigator = createBottomTabNavigator({
  Location: {
    screen: LocationNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="md-locate" size={25} />
      }
    }
  },
  VisitedLocations: {
    screen: VisitedLocationsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-locate" size={25} />
      },
      title: "Visited Locations"
    }
  },
  RoadTrips: {
    screen: RoadTripsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="md-car" size={25} />
      },
      title: "Road Trips"
    }
  }
})

const SwitchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: BottomNavigator
})

export default createAppContainer(SwitchNavigator);