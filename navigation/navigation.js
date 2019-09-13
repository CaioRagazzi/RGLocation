import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { zoomIn, fromLeft, fadeIn } from 'react-navigation-transitions';

import HomeScreen from "../screens/home";
import LocationScreen from "../screens/location";
import SplashScreen from "../screens/splash"
import BackgroundScreen from "../screens/background"
import CameradScreen from "../screens/camera"

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  if (prevScene
    && prevScene.route.routeName === 'Home'
    && nextScene.route.routeName === 'Location') {
    return zoomIn();
  }
  return fromLeft();
}

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Location: LocationScreen,
  Background: BackgroundScreen,
  Camera: CameradScreen
}, {
  transitionConfig: (nav) => handleCustomTransition(nav)
});

const DrawerNavigator = createDrawerNavigator({
  App: AppNavigator
})

const SwitchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: DrawerNavigator
})

export default createAppContainer(SwitchNavigator);