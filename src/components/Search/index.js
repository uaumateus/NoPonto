import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
  render() {
    return <GooglePlacesAutocomplete
                placeholder = "Para onde?"
                placeholderTextColor="#333"
                onPress={()=>{}}
                query={{
                    key: 'AIzaSyD1uf9mIGakaIN7qWg1tiMHdXi1BnK4Fwc',
                    language: 'pt'
                }} 
                textInputProps={{
                    autoCapitalize: "none",
                    autoCorrect: false
                }}
                fetchDetails
                enablePoweredByContainer={false}
            />;
  }
}