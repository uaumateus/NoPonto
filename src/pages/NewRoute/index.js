import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Container, Text, Item, Label, Input, Grid, Row, Col, Button, Form, Picker } from 'native-base';
import Boundary, {Events} from 'react-native-boundary';

import Map from '../../components/Map';
import Toolbar from '../../components/Toolbar';
import SimpleModal from '../../components/Modals/SimpleModal';

export default class NewRoute extends Component {

  state = {
    step: 0,
    selected: 200,
    selectedMode: 'key0',
    showModal: false,
    searchInput: true,
    latitude: null,
    longitude: null
  }

  nextStep = () => {
    this.setState({step: this.state.step + 1});
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  onValueChangeMode(value) {
    this.setState({
      selectedMode: value
    });
  }lat

  handleModal = () => {
    this.setState({ showModal: true });
  };

  onChangeState = () => {
    this.setState({ showModal: false });
    this.setState({step: this.state.step + 1, searchInput: false});
    this.playGeofence(this.state.latitude, this.state.longitude);
  };

  searchLocation = (latitude, longitude) => {
    this.setState({latitude, longitude});
  }

  playGeofence = (latitude, longitude) =>  {
      Boundary.add({
        lat: latitude,
        lng: longitude,
        radius: 500, // metros
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
    let { step, searchInput } = this.state;
    return (
      <>
        <Container>
          <Toolbar />
            <Grid>
              <Row>
                <Map searchInput={searchInput} searchLocation={this.searchLocation} />
              </Row>
              {step === 0 &&
                <Row style={styles.container}>
                  <View style={{ width: '100%' }}>
                    <Grid style={{alignItems: 'center'}}>
                      <Col>
                        <Item rounded style={styles.input}>
                          <Input placeholder='Nome da rota'/>
                        </Item>
                      </Col>
                      <Col style={{width: 40, marginLeft: 10}}>
                        <Button rounded style={{width: 40, height: 40}} onPress={this.nextStep}>
                          <Text>></Text>
                        </Button>
                      </Col>
                    </Grid>
                  </View>
                </Row>
              }
              {step === 1 &&
                <Row style={styles.containerTwo}>
                  <View style={{ width: '100%' }}>
                    <Grid>
                      <Row style={{ alignItems: 'center' }}>
                          <Text>Alarmar em:</Text>
                          <Picker
                            note
                            mode="dropdown"
                            style={{ width: 150 }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                          >
                            <Picker.Item label="200 metros" value={200} />
                            <Picker.Item label="300 metros" value={300} />
                            <Picker.Item label="500 metros" value={500} />
                            <Picker.Item label="600 metros" value={600} />
                            <Picker.Item label="700 metros" value={700} />
                          </Picker>
                      </Row>
                      <Row style={{ alignItems: 'center' }}>
                          <Text>Tipo de alarme:</Text>
                          <Picker
                            note
                            mode="dropdown"
                            style={{ width: 150 }}
                            selectedValue={this.state.selectedMode}
                            onValueChange={this.onValueChangeMode.bind(this)}
                          >
                            <Picker.Item label="Vibrar" value={'key0'} />
                            <Picker.Item label="Vibrar e tocar" value={'key1'} />
                          </Picker>
                      </Row>
                      <Row style={{justifyContent: 'center'}}>
                        <Button rounded style={styles.button} onPress={this.handleModal}>
                          <Text>Confirmar</Text>
                        </Button>
                      </Row>
                    </Grid>
                  </View>
                </Row>
              }
            </Grid>
        </Container>
        <SimpleModal 
          show={this.state.showModal}
          onChangeState={this.onChangeState}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 20
  },
  containerTwo: {
    height: 150,
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    paddingHorizontal: 10
  },
  button: {
    height: 30
  }
});