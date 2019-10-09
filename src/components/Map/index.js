import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Boundary, {Events} from 'react-native-boundary';

import Search from '../Search';
import Directions from '../Directions';

export default class Map extends Component {

    state = {
        region: null,
        destination: null
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

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        });

        this.playGeofence(latitude, longitude);
    }

    playGeofence = (latitude, longitude) =>  {
        Boundary.add({
          lat: latitude,
          lng: longitude,
          radius: 200, // metros
          id: "Destination",
        })
          .then(() => console.log("success!"))
          .catch(e => console.error("error :(", e));
       
        Boundary.on(Events.ENTER, id => {
          Alert.alert("Você está chegando em seu destino!");
        });
    }
      
    componentWillUnmount() {
        // Remove os eventos
        Boundary.off(Events.ENTER)

        // Remove o bondary
        Boundary.remove('Destination')
            .then(() => console.log('Goodbye Destination :('))
            .catch(e => console.log('Failed to delete Destination :)', e))
    }

    render() {
        const { region, destination } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    loadingEnable={true}
                    ref={el => this.mapView = el}
                >
                    {destination &&
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={result => {
                                this.mapView.fitToCoordinates(result.coordinates);
                            }}
                        />
                    }
                </MapView>

                <Search onLocationSelected={this.handleLocationSelected}/>
            </View>
        );
    }
}
