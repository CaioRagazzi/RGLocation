import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Linking,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';

export default class LocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.02,
      promisePosition: null,
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      Alert.alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
    } else {
      this.getLocationAsync();
    }
  }

  componentWillUnmount() {
    const { promisePosition } = this.state;
    if (promisePosition == null) {
      return;
    }
    promisePosition.remove();
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    const promisePosition = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 20,
    }, (response) => {
      this.setState({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude,
      });
    });

    this.setState({ promisePosition });
  };

  sendWhatsAppMessage = (message) => {
    Linking.openURL(`whatsapp://send?text=${message}`);
  }

  static navigationOptions = {
    title: 'Location',
  };

  changeScreen() {
    const { navigation } = this.props;
    const { latitude, longitude } = this.state;
    navigation.navigate('LocationDetails', {
      location: {
        latitude,
        longitude,
      },
    });
  }

  render() {
    const {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          />
        </MapView>
        <ActionButton
          buttonColor="grey"
          onPress={() => this.changeScreen()}
        />
      </View>
    );
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

LocationScreen.propTypes = {
  navigation: PropTypes.isRequired,
};
