import React, { Component } from 'react';
import { Platform, StyleSheet, View, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class LocationScreen extends Component {

  static navigationOptions = {
    title: 'Location'
  };

  state = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
    promisePosition: null
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  componentWillUnmount() {
    if (this.state.promisePosition == null) {
      return
    }
    this.state.promisePosition.remove()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let promisePosition = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 20
    }, (response) => {
      this.setState({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude
      });
    });

    this.setState({ promisePosition })
  };

  sendWhatsAppMessage = (message) => {
    Linking.openURL(`whatsapp://send?text=${message}`)
  }

  changeScreen() {
    this.props.navigation.navigate('LocationDetails', {
      location: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          />
        </MapView>
        <ActionButton buttonColor="grey" onPress={() => this.changeScreen()}>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});