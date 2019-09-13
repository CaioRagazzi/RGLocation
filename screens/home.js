import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, TouchableNativeFeedback } from 'react-native';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Location')}>
          <View style={{ backgroundColor: 'blue', width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>LOCATION</Text>
          </View>
        </TouchableOpacity>

        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Background')}>
          <View style={{ backgroundColor: 'blue', width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>BACKGROUND</Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Camera')}>
          <View style={{ backgroundColor: 'blue', width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>CAMERA</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});