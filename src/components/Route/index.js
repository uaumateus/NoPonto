import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import { Text, Grid, Col, Row, Accordion } from 'native-base';
import Boundary, {Events} from 'react-native-boundary';
import NotifService from '../../notifService';
import appConfig from '../../../app.json';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GlobalStyles from '../../global';

class Route extends Component {
    constructor(props){
        super(props);
        this.state = {
            senderId: appConfig.senderID,
        }
        this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    }

    onRegister(token) {
        this.setState({ registerToken: token.token, gcmRegistered: true });
    }
    
    onNotif(notif) {
    }

    removeRoute = (item) => {
        Alert.alert(
            'Excluir rota',
            'Deseja mesmo excluir essa rota?',
            [
                {
                text: 'Não',
                onPress: () => console.log('Cancel Pressed'),
                },
                {text: 'Excluir', onPress: () => this.getRoutes(item)},
            ],
            {cancelable: true},
            );
        
    }
    getRoutes = async (item) => {
        let routes = await AsyncStorage.getItem('@NoPonto:ROUTES');
        routes = JSON.parse(routes);
        const idx = routes.data.findIndex((route, index, array) => route.name === item.name && route.destination === item.destination);
        routes.data.splice(idx, 1);
        this.saveRoute(routes);
        ToastAndroid.show('Rota excluída!', ToastAndroid.SHORT);
    }
    activeRoute = async (item) => {
        ToastAndroid.show('Alarme ativado!', ToastAndroid.SHORT);
        let routes = await AsyncStorage.getItem('@NoPonto:ROUTES');
        // this.notif.fenceActive(item.distance, item.name)
        // Boundary.add({
        //     lat: item.locationLat,
        //     lng: item.locationLng,
        //     radius: item.distance,
        //     id: item.name
        // })
        // .then(() => {
            routes = JSON.parse(routes);
            const idx = routes.data.findIndex((route, index, array) => route.name === item.name && route.destination === item.destination);
            routes.data[idx].active = true;
            this.saveRoute(routes);
            ToastAndroid.show('Alarme ativado!', ToastAndroid.SHORT);
        // })
        // .catch(e => console.warn("error :(", e));
        // Boundary.on(Events.ENTER, id => {
        //     this.notif.inDestiny(item.distance, item.name);
        // });
    }
    stopRoute = async (item) => {
        let routes = await AsyncStorage.getItem('@NoPonto:ROUTES');
        // Boundary.remove(item.name)
        // .then(() => {
            routes = JSON.parse(routes);
            const idx = routes.data.findIndex((route, index, array) => route.name === item.name && route.destination === item.destination);
            routes.data[idx].active = false;
            // this.notif.cancelAll();
            this.saveRoute(routes);
            ToastAndroid.show('Alarme parado!', ToastAndroid.SHORT);
        // })
        // .catch(e => console.log('Failed to delete Chipotle :)', e))
    }
    saveRoute = async e => {
        await AsyncStorage.setItem('@NoPonto:ROUTES', JSON.stringify(e));
        console.warn(e);
        this.props.reload();
    }

    render(){
        return (
            // <Accordion
            //     dataArray={this.props.data}
            //     animation={true}
            //     expanded={true}
            //     renderHeader={this._renderHeader}
            //     renderContent={this._renderContent}
            // />
            <>
                {this.props.data.map(item => (
                    <View style={styles.card}>
                        <Grid>
                            <Row>
                                <Col>
                                    <Text style={styles.title}>{item.name}</Text>
                                </Col>
                                <Col style={styles.columnOptions}>
                                    {item.active ?
                                        <TouchableOpacity onPress={() => this.stopRoute(item)}><Icon size={25} name="pause" style={{color: GlobalStyles.primaryColor, paddingLeft: 10}}/></TouchableOpacity>
                                    :
                                        <TouchableOpacity onPress={() => this.activeRoute(item)}><Icon size={25} name="play-arrow" style={{color: GlobalStyles.primaryColor, paddingLeft: 10}}/></TouchableOpacity>
                                    }
                                    <TouchableOpacity onPress={() => this.removeRoute(item)}><Icon size={25} name="delete" style={{color: GlobalStyles.primaryColor, paddingLeft: 10}}/></TouchableOpacity>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Text style={styles.infos}>{"Destino: " + item.destination}</Text>
                                    <Text style={styles.infosSecundary}>{"Alarmar em: " + item.distance + " metros."}</Text>
                                </Col>
                            </Row>
                        </Grid>
                        {/* <TouchableOpacity onPress={this.removeRoute}><Icon size={25} name="delete" /></TouchableOpacity> */}
                        
                    </View>
                ))}
            </>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1'
    },
    title: {
        fontSize: 22,
        color: GlobalStyles.primaryColor
    },
    infos: {
        fontSize: 16
    },
    body: {
        width: '100%',
        alignItems: 'flex-start'
    },
    cardContent: {
        marginTop: -10,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#d1d1d1',
        paddingBottom: 10
    },
    infosSecundary: {
        fontSize: 14,
        color: '#AAA'
    },
    columnOptions: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    columnArrow: {
        width: 'auto',
        justifyContent: 'center'
    }
})

export default Route;
