import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Header, Left, Button, Body, Icon, Right, Text, Title } from 'native-base';
import logo from '../../assets/logo.png';

class Toolbar extends Component {
  render() {
    return (   
        <Header style={styles.header}>
            <Left style={styles.leftContainer}>
                <Button transparent>
                    <Icon type="FontAwesome" name="arrow-left" style={{color: '#000'}}/>
                </Button>
            </Left>
            <Body style={styles.body}>
                <Image source={logo} style={styles.logo}/>
            </Body>
            <Right style={styles.rightContainer}>
            </Right>
        </Header>
    );
  }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#333'
    },
    body: {
        alignItems: 'center'
    },
    logo: {
        height: 60,
        width: 150
    },
    leftContainer: {
        flex: 0,
        paddingLeft: 10,
        width: 50
    },
    rightContainer: {
        flex: 0,
        paddingRight: 10,
        width: 50
    },
});

export default Toolbar;