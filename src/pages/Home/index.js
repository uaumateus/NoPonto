import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Content, Container, Text, Fab } from 'native-base';

import GlobalStyles from '../../global';
import Toolbar from '../../components/Toolbar';
import Route from '../../components/Route';

export default class Home extends Component {

  state = {
    data: null
  }

  componentDidMount = async () => {
    const value = await AsyncStorage.getItem('@NoPonto:ROUTES');
    if (value !== null) {
      this.setState({data: JSON.parse(value)})
    }
  }

  reload = async () => {
    const value = await AsyncStorage.getItem('@NoPonto:ROUTES');
    if (value !== null) {
      this.setState({data: JSON.parse(value)})
    }
  }

  render() {
    const {data} = this.state;
    return (
        <Container>
            <Toolbar onPressRight={this.reload}/>
            <Content>
              {data !== null ?
                <Route data={data.data}/>
                :
                <Text style={{textAlign: 'center', marginTop: 10, color:"#AAA"}}>Você ainda não criou uma rota</Text>
              }
                
            </Content>
            <Fab style={{backgroundColor: GlobalStyles.primaryColor}} direction="right" position="bottomRight" onPress={() => this.props.navigation.navigate('NewRoute')}>
                <Text>+</Text>
            </Fab>
        </Container>
    );
  }
}
