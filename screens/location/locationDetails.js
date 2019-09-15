import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import { Item, Input, Label, Icon } from 'native-base';
import Geocoder from 'react-native-geocoding';

class LocationDetailsScreen extends Component {

    state = {
        location: {},
        address: ''
    }

    static navigationOptions = {
        headerTitle: 'Location Details',
        headerRight: (
            <Icon ios='ios-save' android="md-save" style={{fontSize: 30, marginRight: 10}} onPress={() => alert('alouuu')}/>
        ),
      };

    componentDidMount() {
        let currentLocation = this.props.navigation.getParam('location', 'NO-LOCATION')
        console.log(currentLocation);
        this.setState({ location: currentLocation }, () => {
            this.getAddress()
        })
    }


    getAddress = () => {
        Geocoder.init('AIzaSyBzN5uHhKTTojDqazlzIbvTbnraIdxyEsY');

        Geocoder.from({
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude
        })
            .then(json => {
                var addressComponent = json.results[0].formatted_address
                this.setState({ address: addressComponent })

            })
            .catch(error => console.warn(error));
    }

    render() {
        return (
            <View style={styles.containerCentral}>
                <View style={styles.containerForm}>
                    <Item floatingLabel>
                        <Label>Location</Label>
                        <Input disabled value={this.state.address} />
                    </Item>
                    <Item floatingLabel style={{ marginTop: 10 }}>
                        <Label>Note</Label>
                        <Input />
                    </Item>
                </View>
                <View style={styles.actionButtonContainer}>
                    <ActionButton buttonColor="rgba(231,76,60,1)" renderIcon={(a) => <Ionicons name="ios-camera" size={25} color="white" />}>
                    </ActionButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerCentral:{
        flex: 1
    },
    containerForm: {
        flex: 1,
        margin: 20
    },
    actionButtonContainer:{
        flex: 1
    }
});

export default LocationDetailsScreen;