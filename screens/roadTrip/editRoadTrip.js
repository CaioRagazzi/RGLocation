import React, { Component } from 'react'
import { Modal, Text, Button } from "react-native";
import { Item, Input, Label, Content, Container, Form } from 'native-base';
import { HeaderButtons, Item as ItemHeader } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "./headerButton";
import { updateRoadTrips } from "../../helpers/db";
import { ColorPicker } from 'react-native-color-picker'

export default class EditRoadTripsScreen extends Component {

    componentWillMount() {
        const roadTrip = this.props.navigation.getParam('roadTrip')
        
        this.setState({ name: roadTrip.name, color: roadTrip.color, id: roadTrip.id})
        
        this.props.navigation.setParams({ save: this.update })
    }

    state = {
        id: null,
        name: '',
        modalVisible: false,
        color: '#3339FF'
    }

    update = () => {
        updateRoadTrips(this.state.name, this.state.color, this.state.id).then(response => {
            this.props.navigation.goBack()
        }).catch(err => console.log(err))
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'New Road Trip',
            headerRight: (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <ItemHeader title="Save" iconName="ios-save" onPress={navigation.getParam('save')} />
                </HeaderButtons>
            ),
        }
    }

    handleNameChange = (val) => {
        this.setState({ name: val })
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item fixedLabel regular style={{ paddingLeft: 10 }}>
                            <Label>Name:</Label>
                            <Input onChangeText={this.handleNameChange} value={this.state.name} />
                        </Item>

                        <Item fixedLabel regular style={{ paddingLeft: 10, marginTop: 10, paddingRight: 10 }}>
                            <Label>Tag Color:</Label>
                                <Button color={this.state.color} onPress={() => this.setState({ modalVisible: true })} title="Pick" />
                        </Item>

                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                                this.setState({ modalVisible: false })
                            }}>

                            <ColorPicker
                                onColorSelected={color => {
                                    this.setState({ color: color })
                                    this.setState({ modalVisible: false })
                                }}
                                style={{ flex: 1 }}
                            />
                        </Modal>
                    </Form>
                </Content>
            </Container>
        )
    }
}
