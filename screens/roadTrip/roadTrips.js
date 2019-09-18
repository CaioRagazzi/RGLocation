import React, { Component } from 'react'
import { Text, FlatList, TouchableNativeFeedback, View } from "react-native";
import ActionButton from 'react-native-action-button';
import { fetchRoadTrips, deleteRoadTrips } from "../../helpers/db";
import { withNavigationFocus } from 'react-navigation';
import { List, ListItem, Content, Container, Icon } from 'native-base';
import Swipeable from 'react-native-swipeable';


class RoadTripsScreen extends Component {

    state = {
        roadTrips: []
    }

    componentWillReceiveProps() {
        fetchRoadTrips().then(response => {
            this.setState({ roadTrips: response.rows._array })
            console.log(response.rows._array);
            
        }).catch(err => console.log(err))
    }

    static navigationOptions = {
        title: 'Road Trips'
    };

    changeScreen() {
        this.props.navigation.navigate('AddRoadTrip')
    }

    deletarRoadTrips = (id) => {
        this.setState({
            roadTrips: this.state.roadTrips.filter(item => {
                return item.id != id
            })
        })
        deleteRoadTrips(id).then(response => {
            console.log(response);
        })
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Content>
                    <List>
                        <FlatList
                            data={this.state.roadTrips}
                            renderItem={({ item }) =>
                                <Swipeable rightButtonWidth={40} rightButtons={[
                                    <TouchableNativeFeedback onPress={() => this.deletarRoadTrips(item.id)}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: 40 }}>
                                            <Icon name='trash' style={{ color: 'red' }} />
                                        </View>
                                    </TouchableNativeFeedback>
                                ]}>
                                    <ListItem><Text style={{ color: item.color }}>{item.name.toUpperCase()}</Text></ListItem>
                                </Swipeable>}
                            keyExtractor={item => item.id.toString()}
                        />
                    </List>
                </Content>
                <ActionButton buttonColor="grey" onPress={() => this.changeScreen()}>
                </ActionButton>
            </Container>
        )
    }
}

export default withNavigationFocus(RoadTripsScreen);
