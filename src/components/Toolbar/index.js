import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Header, Left, Button, Body, Right, Text, Title } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../assets/logo.png';

class Toolbar extends Component {
  render() {
    return (   
        <Header style={styles.header}>
            <Left style={styles.leftContainer}>
                {this.props.back &&
                    <Button transparent onPress={this.props.back}>
                        <Icon size={25} name="arrow-back" style={{color: '#000'}}/>
                    </Button>
                }
            </Left>
            <Body style={styles.body}>
                <Image source={logo} style={styles.logo}/>
            </Body>
            <Right style={styles.rightContainer}>
                {this.props.onPressRight &&
                    <Button transparent onPress={this.props.onPressRight}>
                        <Icon size={25} name="replay" style={{color: '#000'}}/>
                    </Button>
                }
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
        height: 50,
        width: 150
    },
    leftContainer: {
        flex: 0,
        paddingLeft: 10,
        width: 50
    },
    rightContainer: {
        flex: 0,
        width: 50
    },
});

export default Toolbar;