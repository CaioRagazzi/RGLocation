import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default class CameraScreen extends Component {
    state = {
        image: null
    }

    async takePicture() {
        let response = await ImagePicker.launchCameraAsync({
            mediaTypes: 'All',
            quality: 1
        })

        const asset = await MediaLibrary.createAssetAsync(response.uri);

        MediaLibrary.createAlbumAsync('RG LOCATION', asset)
        
        console.log(response);
        console.log(response.uri);
        console.log(FileSystem.documentDirectory);

        let fileName = response.uri.split('/').pop()
        let newPath = FileSystem.documentDirectory + fileName

        console.log(newPath);
        

        FileSystem.moveAsync({
            from: response.uri,
            to: newPath
        })

        this.setState({ image: response }) 
    }

    async openGalery() {
        ImagePicker.launchImageLibraryAsync()
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={() => this.takePicture()}>
                    <View style={{ backgroundColor: 'blue', width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>CAMERA</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => this.openGalery()}>
                    <View style={{ backgroundColor: 'blue', width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginTop: 10, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>GALERIA</Text>
                    </View>
                </TouchableNativeFeedback>
                {
                    !this.state.image ? (<Text>Sem imagem</Text>) : <Image style={{ width: 300, height: 300, resizeMode: 'contain', marginTop: 10 }} source={{ uri: this.state.image.uri }}></Image>
                }


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