import React, { Component } from 'react';
import { View, StyleSheet, Alert, AsyncStorage, Vibration } from 'react-native';
import { Container, Text, Item, Label, Input, Grid, Row, Col, Button, Form, Picker } from 'native-base';
import Boundary, {Events} from 'react-native-boundary';

import NotifService from '../../notifService';
import appConfig from '../../../app.json';
import Map from '../../components/Map';
import Toolbar from '../../components/Toolbar';
import SimpleModal from '../../components/Modals/SimpleModal';

export default class NewRoute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      step: 0,
      name: '',
      selected: 200,
      selectedMode: 'key0',
      showModal: false,
      searchInput: true,
      latitude: null,
      longitude: null,
      description: null
    };
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
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
  }

  handleModal = () => {
    this.setState({ showModal: true });
  };

  onChangeState = () => {
    this.setState({ showModal: false });
    this.setState({step: this.state.step + 1, searchInput: false});
    this.createRoute();
    this.playGeofence(this.state.latitude, this.state.longitude);
  };

  createRoute = async () => {
    const exist = await AsyncStorage.getItem('@NoPonto:ROUTES');
    let value;
    if(exist !== null){
      const aux = JSON.parse(exist);
      value = { data: aux.data.concat({
                        name: this.state.name,
                        destination: this.state.description,
                        distance: this.state.selected,
                        typeAlarm: this.state.selectedMode  
                      })
              };
    }else{
      value = { data: [{
              name: this.state.name,
              destination: this.state.description,
              distance: this.state.selected,
              typeAlarm: this.state.selectedMode  
            }]
      }
      
    }
    await AsyncStorage.setItem('@NoPonto:ROUTES', JSON.stringify(value));
  }

  saveRoutes = async (data) => {
    await AsyncStorage.setItem('@NoPonto:ROUTES', JSON.stringify(data));
  }

  searchLocation = (latitude, longitude, description) => {
    this.setState({latitude, longitude, description});
  }

  onChangeName = e => {
    this.setState({name: e});
  }

  playGeofence = (latitude, longitude) =>  {
      Boundary.add({
        lat: latitude,
        lng: longitude,
        radius: this.state.selected, // metros
        id: "Destination",
      })
        .then(() => console.log("success!"))
        .catch(e => console.error("error :(", e));
      Boundary.on(Events.ENTER, id => {
        this.notif.inDestiny(this.state.selected);
      });
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    Vibration.cancel();
    this.notif.cancelAll();
  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
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
    let { step, searchInput, selected, name } = this.state;
    return (
      <>
        <Container>
          <Toolbar back={() => this.props.navigation.goBack()}/>
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
                          <Input placeholder='Nome da rota' value={name} onChangeText={(val) => this.onChangeName(val)}/>
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
          message={"Você será alertado quando estiver à " + selected + " metros de seu destino!"}
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