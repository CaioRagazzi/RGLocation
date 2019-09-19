import React, { Component } from 'react'
import { Text, KeyboardAvoidingView, ScrollView, Switch, Image, TouchableHighlight } from 'react-native'
import { Header } from 'react-navigation-stack';
import { Item as ItemNative, Input, Label, Content, Textarea, Container, Form } from 'native-base';
import ActionButton from 'react-native-action-button';
import { Ionicons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { HeaderButtons, Item as ItemHeader } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "./headerButton";
import { deleteSpecificLocation } from "../../helpers/db";

export default class SpecificLocationScreen extends Component {

    componentWillMount() {
        this.props.navigation.setParams({ delete: this.delete })
        const location = this.props.navigation.getParam('location')
        this.setState({ ...location })

        this.props.navigation.setParams({
            location: location
        });
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;

        return {
            title: params.location.address,
            headerRight: (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <ItemHeader title="Delete" iconName="trash" onPress={navigation.getParam('delete')} />
                </HeaderButtons>
            ),
        }
    };

    state = {
        isVisible: false
    }

    delete = () => {        
        deleteSpecificLocation(this.state.id).then(response => {
            this.props.navigation.goBack()
        }).catch(err => console.log(err))
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
                                    <Switch disabled onValueChange={this.handleHotelChange} value={this.state.hasHotel == 1 ? true : false} />
                                </ItemNative>

                                {
                                    this.state.hasHotel ?
                                        <ItemNative fixedLabel regular style={{ marginTop: 10, paddingLeft: 10 }}>
                                            <Label>Hotel name:</Label>
                                            <Input disabled onChangeText={this.handleHotelNameChange} value={this.state.hotelName} />
                                        </ItemNative> : null
                                }

                                {
                                    this.state.hasHotel ?
                                        <ItemNative fixedLabel regular style={{ marginTop: 10, paddingLeft: 10 }}>
                                            <Label>Hotel price:</Label>
                                            <Input disabled onChangeText={this.handleHotelPriceChange} value={this.state.hotelPrice} />
                                        </ItemNative> : null
                                }

                                {
                                    this.state.hasHotel ?
                                        <Textarea
                                            disabled
                                            style={{ marginTop: 10, width: undefined, paddingTop: 10 }}
                                            value={this.state.hotelNotes}
                                            onChangeText={this.handleHotelNotesChange}
                                            bordered
                                            rowSpan={5}
                                            placeholder="Hotel Notes" /> : null
                                }

                                <Textarea
                                    disabled
                                    style={{ marginTop: 10, width: undefined, paddingTop: 10 }}
                                    bordered
                                    rowSpan={5}
                                    value={this.state.locationNotes}
                                    onChangeText={this.handleLocationNotesChange}
                                    placeholder="Place Notes" />

                                <TouchableHighlight onPress={() => this.setState({ isVisible: true })}>
                                    <Image style={{ width: '100%', height: 300, marginTop: 10 }} source={{ uri: this.state.img }} />
                                </TouchableHighlight>
                            </Form>
                        </Content>
                    </ScrollView>
                </KeyboardAvoidingView >
                <Overlay isVisible={this.state.isVisible} onBackdropPress={() => this.setState({ isVisible: false })}>
                    <Image style={{ width: '100%', height: '100%' }} resizeMode="contain" source={{ uri: this.state.img }} />
                </Overlay>
                {
                    this.state.img == null ? (<ActionButton onPress={() => this.takePicture()} buttonColor="grey" renderIcon={(a) => <Ionicons name="ios-camera" size={25} color="white" />} />) : null
                }
            </Container>
        );
    }
}
