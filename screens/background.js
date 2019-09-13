import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import axios from "axios";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { SQLite } from 'expo-sqlite';

TaskManager.defineTask('ALERT', () => {

});

export default class BackgroundScreen extends Component {

    async componentDidMount() {
        let response = await BackgroundFetch.getStatusAsync()
        alert(response)
    }

    definirTask() {        
        // BackgroundFetch.registerTaskAsync('ALERT', {
        //     minimumInterval: 1,
        //     stopOnTerminate: false,
        //     startOnBoot: true
        // })
    }

    async tasksRegistradas() {
        let response = await TaskManager.getRegisteredTasksAsync()
        alert(JSON.stringify(response))
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => this.definirTask()}>
                    <View style={{ backgroundColor: 'blue', width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>DEFINIR TASK</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback onPress={() => this.tasksRegistradas()}>
                    <View style={{ backgroundColor: 'blue', width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>TASK</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
