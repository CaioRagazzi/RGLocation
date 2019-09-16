import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, Switch, ScrollView, KeyboardAvoidingView } from "react-native";
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import { Item as ItemNative, Input, Label, Content, Picker, Textarea, Container, Form, Icon } from 'native-base';
import Geocoder from 'react-native-geocoding';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import uuid from 'uuid/v1';
import { HeaderButtons, Item as ItemHeader } from "react-navigation-header-buttons";
import { Header } from 'react-navigation-stack';
import { CustomHeaderButton } from "./headerButton";
import { insertPlace } from "../../helpers/db";


class LocationDetailsScreen extends Component {

    state = {
        location: {},
        address: '',
        locationNotes: '',
        images: [],
        hasHotel: false,
        hotelName: '',
        hotelPrice: '',
        hotelNotes: '',
        hasRoadTrip: false,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Location Details',
            headerRight: (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <ItemHeader title="Save" iconName="ios-save" onPress={navigation.getParam('save')} />
                </HeaderButtons>
            ),
        }
    }

    componentWillMount() {
        let currentLocation = this.props.navigation.getParam('location', 'NO-LOCATION')
        this.props.navigation.setParams({ save: this.insert })

        this.setState({ location: currentLocation }, () => {
            this.getAddress()
        })
    }

    insert = () => {
        insertPlace(this.state.address, this.state.locationNotes, this.state.hotelName, this.state.hotelPrice, this.state.hotelNotes, this.state.location.latitude, this.state.location.longitude).then(response => {
            this.props.navigation.goBack()
        }).catch(err => {
            console.log(err);
        })
    }

    takePicture = async () => {
        let response = await ImagePicker.launchCameraAsync({
            mediaTypes: 'All',
            quality: 1
        })

        if (response.cancelled) {
            return
        }

        let uriFile = FileSystem.documentDirectory + response.uri.split('/').pop()

        FileSystem.moveAsync({
            from: response.uri,
            to: uriFile
        })

        this.setState({ images: [...this.state.images, { uri: uriFile, id: uuid() }] })
    }

    getAddress = () => {
        Geocoder.init('AIzaSyBzN5uHhKTTojDqazlzIbvTbnraIdxyEsY');

        Geocoder.from({
            latitude: this.state.location.latitude,
            longitude: this.state.location.longitude
        })
            .then(json => {
                let street = json.results[0].address_components[1].short_name
                let city = json.results[0].address_components[3].short_name
                let country = json.results[0].address_components[5].short_name

                this.setState({ address: `${street} - ${city} - ${country}` })
            })
            .catch(error => console.warn(error));
    }

    handleHotelChange = (val) => {
        this.setState({ hasHotel: val })
    }

    handleRoadTripChange = (val) => {
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
                                <ItemNative fixedLabel regular>
                                    <Label>Location:</Label>
                                    <Input disabled value={this.state.address} />
                                </ItemNative>

                                <ItemNative fixedLabel regular style={{ marginTop: 10 }}>
                                    <Label>Hotel:</Label>
                                    <Switch onValueChange={this.handleHotelChange} value={this.state.hasHotel} />
                                </ItemNative>

                                <ItemNative fixedLabel regular style={{ marginTop: 10 }}>
                                    <Label>Road Trip:</Label>
                                    <Switch onValueChange={this.handleRoadTripChange} value={this.state.hasRoadTrip} />
                                </ItemNative>

                                {
                                    this.state.hasHotel ?
                                        <ItemNative fixedLabel regular style={{ marginTop: 10 }}>
                                            <Label>Hotel name:</Label>
                                            <Input onChangeText={this.handleHotelNameChange} value={this.state.hotelName} />
                                        </ItemNative> : null
                                }

                                {
                                    this.state.hasHotel ?
                                        <ItemNative fixedLabel regular style={{ marginTop: 10 }}>
                                            <Label>Hotel price:</Label>
                                            <Input onChangeText={this.handleHotelPriceChange} value={this.state.hotelPrice} />
                                        </ItemNative> : null
                                }

                                {
                                    this.state.hasHotel ?
                                        <Textarea
                                            style={{ marginTop: 10, width: undefined }}
                                            value={this.state.hotelNotes}
                                            onChangeText={this.handleHotelNotesChange}
                                            bordered
                                            rowSpan={5}
                                            placeholder="Hotel Notes" /> : null
                                }

                                <Textarea
                                    style={{ marginTop: 10, width: undefined }}
                                    bordered
                                    rowSpan={5}
                                    value={this.state.locationNotes}
                                    onChangeText={this.handleLocationNotesChange}
                                    placeholder="Place Notes" />

                                <FlatList
                                    numColumns={3}
                                    data={this.state.images}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => <Image style={{ width: 100, height: 100, margin: 5 }}
                                        source={{ uri: item.uri }} />} />
                            </Form>
                        </Content>
                    </ScrollView>
                </KeyboardAvoidingView >
                <ActionButton onPress={() => this.takePicture()} buttonColor="grey" renderIcon={(a) => <Ionicons name="ios-camera" size={25} color="white" />} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
});

export default LocationDetailsScreen;