import React, { Component } from 'react';
import { Content, Container, Text, Fab } from 'native-base';

import GlobalStyles from '../../global';
import Toolbar from '../../components/Toolbar';
import Route from '../../components/Route';

export default class Home extends Component {
  render() {
    return (
        <Container>
            <Toolbar />
            <Content>
                <Route />
            </Content>
            <Fab style={{backgroundColor: GlobalStyles.primaryColor}} direction="right" position="bottomRight" onPress={() => this.props.navigation.navigate('NewRoute')}>
                <Text>+</Text>
            </Fab>
        </Container>
    );
  }
}
