import React, { Component } from 'react';
import { View, StyleSheet } from "react-native";
import { fetchPlaces } from "../helpers/db";
import MapView, { Marker } from 'react-native-maps';

class VisitedLocationsScreen extends Component {

    state = {
        locations: []
    }

    async componentDidMount() {
        fetchPlaces().then(response => {
            this.setState({ locations: response.rows._array })
            console.log(response.rows._array); 
            
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
                                    title="Local"
                                    description={item.address}
                                />
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

export default VisitedLocationsScreen;