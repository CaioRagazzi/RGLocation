import React, { Component } from 'react'
import { View, KeyboardAvoidingView, ScrollView, Switch, Image, Picker } from 'react-native'
import { Header } from 'react-navigation-stack';
import { Item as ItemNative, Input, Label, Content, Textarea, Container, Form } from 'native-base';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';

export default class SpecificLocationScreen extends Component {

    componentWillMount() {
        const location = this.props.navigation.getParam('location')
        this.setState({ ...location })

        this.props.navigation.setParams({
            location: location
        });
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        return {
            title: params.location.address
        }
    };

    state = {
    }

    handleHotelChange = (val) => {
        this.setState({ hasHotel: val })
    }

    handleRoadTripChange = (val) => {
        if (val == false) {
            this.setState({ roadTripSelected: '' })
        }
        this.setState({ hasRoadTrip: val })
    }

    handleHotelNameChange = (val) => {
        this.setState({ hotelName: val })
    }

    handleHotelPriceChange = (val) => {
        this.setState({ hotelPrice: val })
    }

    handleHotelNotesChange = (val) => {
        this.setState({ hotelNotes: val })
    }

    handleLocationNotesChange = (val) => {
        this.setState({ locationNotes: val })
    }

    render() {
        return (
            <Container>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled keyboardVerticalOffset={Header.HEIGHT + 100}>
                    <ScrollView>
                        <Content padder>
                            <Form>
                                <ItemNative fixedLabel regular style={{ paddingLeft: 10 }}>
                                    <Label>Location:</Label>
                                    <Input disabled value={this.state.address} />
                                </ItemNative>

                                <ItemNative fixedLabel regular style={{ marginTop: 10, paddingLeft: 10 }}>
                                    <Label>Hotel:</Label>
                                    <Switch onValueChange={this.handleHotelChange} value={this.state.hasHotel == 1 ? true : false} />
                                </ItemNative>

                                {
                                    this.state.hasRoadTrip ?
                                        <View style={{ borderStyle: "solid", borderWidth: 0.3, marginTop: 10 }}>
                                            <Picker
                                                selectedValue={this.state.roadTripSelected}
                                                style={{ height: 50, width: "100%" }}
                                                onValueChange={(itemValue, itemIndex) => {
                                                    this.setState({ roadTripSelected: itemValue })
                                                }
                                                }>
                                                {this.state.allRoadTrips.map(item => {
                                                    return <Picker.Item key={item.id} label={item.name.toUpperCase()} value={item.id} />
                                                })}
                                            </Picker>
                                        </View> : null
                                }

                                {
                                    this.state.hasHotel ?
                                        <ItemNative fixedLabel regular style={{ marginTop: 10, paddingLeft: 10 }}>
                                            <Label>Hotel name:</Label>
                                            <Input onChangeText={this.handleHotelNameChange} value={this.state.hotelName} />
                                        </ItemNative> : null
                                }

                                {
                                    this.state.hasHotel ?
                                        <ItemNative fixedLabel regular style={{ marginTop: 10, paddingLeft: 10 }}>
                                            <Label>Hotel price:</Label>
                                            <Input onChangeText={this.handleHotelPriceChange} value={this.state.hotelPrice} />
                                        </ItemNative> : null
                                }

                                {
                                    this.state.hasHotel ?
                                        <Textarea
                                            style={{ marginTop: 10, width: undefined, paddingTop: 10 }}
                                            value={this.state.hotelNotes}
                                            onChangeText={this.handleHotelNotesChange}
                                            bordered
                                            rowSpan={5}
                                            placeholder="Hotel Notes" /> : null
                                }

                                <Textarea
                                    style={{ marginTop: 10, width: undefined, paddingTop: 10 }}
                                    bordered
                                    rowSpan={5}
                                    value={this.state.locationNotes}
                                    onChangeText={this.handleLocationNotesChange}
                                    placeholder="Place Notes" />

                                <Image style={{ width: '100%', height: 300, marginTop: 10 }} source={{ uri: this.state.img }} />
                            </Form>
                        </Content>
                    </ScrollView>
                </KeyboardAvoidingView >
                {
                    this.state.img == null ? (<ActionButton onPress={() => this.takePicture()} buttonColor="grey" renderIcon={(a) => <Ionicons name="ios-camera" size={25} color="white" />} />) : null
                }
            </Container>
        );
    }
}
