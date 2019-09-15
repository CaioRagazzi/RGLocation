import React, { Component } from 'react'
import { View, Text } from "react-native";
import { PacmanIndicator } from "react-native-indicators";

export default class SplashScreen extends Component {

    componentDidMount(){
        setTimeout(() => {
            this.props.navigation.navigate('Location')
        }, 3000)
    }

    render() {
        return (
            <PacmanIndicator color="blue"/>
        )
    }
}
