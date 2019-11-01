import React, { Component } from 'react';
import { View,  } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';

import Search from '../Search';
import Directions from '../Directions';

export default class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            region: null,
            destination: null
        }
        this.onRegionChange = this.onRegionChange.bind(this);
    }
    

    componentDidMount(){
        this.getLocationUser();
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

        this.props.searchLocation(latitude, longitude, data.description);
    }

    getLocationUser = () => {
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
    
    onRegionChange() {
        this.getLocationUser();
    }

    render() {
        const { region, destination } = this.state;
        const { searchInput } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    // region={region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                    initialRegion={region}
                    onUserLocationChange={this.onRegionChange}
                    loadingEnable={true}
                    ref={el => this.mapView = el}
                >
                    {destination &&
                        <>
                            {/* <Directions
                                origin={region}
                                destination={destination}
                                onReady={result => {
                                    this.mapView.fitToCoordinates(result.coordinates);
                                }}
                                
                            />  */}
                            <MapViewDirections 
                                destination={ region }
                                origin={ destination }
                                onReady={ result => {
                                    this.mapView.fitToCoordinates(result.coordinates);
                                } }
                                apikey="AIzaSyD1uf9mIGakaIN7qWg1tiMHdXi1BnK4Fwc"
                                strokeWidth={2}
                                strokeColor="#3299CC"
                                resetOnChange={true}
                            />
                        </>
                    }
                </MapView>
                
                {searchInput &&
                    <Search onLocationSelected={this.handleLocationSelected}/>
                }
            </View>
        );
    }
}
