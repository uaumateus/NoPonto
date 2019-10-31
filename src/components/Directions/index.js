import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({ destination, origin, onReady }) => (
    <MapViewDirections 
        destination={ destination }
        origin={ origin }
        onReady={ onReady }
        apikey="AIzaSyD1uf9mIGakaIN7qWg1tiMHdXi1BnK4Fwc"
        strokeWidth={2}
        strokeColor="#3299CC"
        resetOnChange={true}
    />
);

export default Directions;
