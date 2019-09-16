import React, { Component } from 'react'
import { View, Text } from "react-native";
import { PacmanIndicator } from "react-native-indicators";
import { init, drop } from "../helpers/db";

export default class SplashScreen extends Component {

    componentDidMount() {

        drop().then(() => {
            console.log('Database dropped');
            this.props.navigation.navigate('Location')
        }).catch((err) => {
            console.log('Error initialization database');
            alert(err)
        })

        init().then(() => {
            console.log('Database initialized');
            this.props.navigation.navigate('Location')
        }).catch((err) => {
            console.log('Error initialization database');
            alert(err)
        })
    }

    render() {
        return (
            <PacmanIndicator color="blue" />
        )
    }
}
