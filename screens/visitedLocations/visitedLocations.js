import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { fetchPlaces } from "../../helpers/db";
import MapView, { Marker, Polyline } from 'react-native-maps';
import { withNavigationFocus } from 'react-navigation';

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
        return (
            <View style={styles.container}>
                <MapView style={styles.map}>
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