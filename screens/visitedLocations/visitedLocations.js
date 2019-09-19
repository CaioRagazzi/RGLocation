import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { fetchPlaces } from "../../helpers/db";
import MapView, { Marker } from 'react-native-maps';
import { withNavigationFocus } from 'react-navigation';
import MapViewDirections from 'react-native-maps-directions';

class VisitedLocationsScreen extends Component {

    static navigationOptions = {
        title: 'Visited Locations'
    };

    state = {
        locations: []
    }

    async componentWillReceiveProps() {
        this.setState({ locations: [] })
        fetchPlaces().then(response => {
            this.setState({ locations: response.rows._array })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const origin = { latitude: 37.3318456, longitude: -122.0296002 };
        const destination = { latitude: 37.771707, longitude: -122.4053769 };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyBzN5uHhKTTojDqazlzIbvTbnraIdxyEsY';

        return (
            <View style={styles.container}>
                <MapView style={styles.map}>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeColor="hotpink"
                        strokeWidth={2}
                    />
                    {
                        this.state.locations.map(item => {
                            return (
                                <Marker
                                    key={item.id}
                                    coordinate={{
                                        latitude: item.lat,
                                        longitude: item.lng,
                                    }}
                                    title=''
                                    pinColor={item.color}
                                    onPress={() => {
                                        this.props.navigation.navigate('SpecificLocation', { location: item })
                                    }}
                                >
                                </Marker>
                            )
                        })
                    }
                </MapView>
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

export default withNavigationFocus(VisitedLocationsScreen);