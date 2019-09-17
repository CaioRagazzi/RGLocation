import React, { Component } from 'react'
import { Text, FlatList } from "react-native";
import ActionButton from 'react-native-action-button';
import { fetchRoadTrips } from "../../helpers/db";
import { withNavigationFocus } from 'react-navigation';
import { List, ListItem, Content, Container } from 'native-base';


class RoadTripsScreen extends Component {

    state = {
        roadTrips: []
    }

    componentWillReceiveProps() {
        fetchRoadTrips().then(response => {
            this.setState({ roadTrips: response.rows._array })
        }).catch(err => console.log(err))
    }

    static navigationOptions = {
        title: 'Road Trips'
    };

    changeScreen() {
        this.props.navigation.navigate('AddRoadTrip')
    }

    render() {
        return (
            <Container style={{ flex: 1 }}>
                <Content>
                    <List>
                        <FlatList
                            data={this.state.roadTrips}
                            renderItem={({ item }) => <ListItem><Text>{item.name.toUpperCase()}</Text></ListItem>}
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
