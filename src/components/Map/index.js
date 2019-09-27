import React, { Component } from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Search from '../Search';

export default class Map extends Component {

    state = {
        region: null
    }

    componentDidMount(){
        Geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                        this.setState({ 
                            region: { 
                                latitude, 
                                longitude, 
                                latitudeDelta: 0.0143, 
                                longitudeDelta: 0.0134},
                        })
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    render() {
        const { region } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnable={true}
                />

                <Search />
            </View>
        );
    }
}
