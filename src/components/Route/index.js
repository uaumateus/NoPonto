import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity, AsyncStorage, Alert, ToastAndroid } from 'react-native';
import { Text, Grid, Col, Row, Accordion } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import GlobalStyles from '../../global';

class Route extends Component {

    _renderHeader(item, expanded) {
        removeRoute = () => {
            Alert.alert(
                'Excluir rota',
                'Deseja mesmo excluir essa rota?',
                [
                  {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                  },
                  {text: 'Excluir', onPress: this.getRoutes},
                ],
                {cancelable: true},
              );
            
        }
        getRoutes = async () => {
            let routes = await AsyncStorage.getItem('@NoPonto:ROUTES');
            routes = JSON.parse(routes);
            const teste = routes.data.findIndex((route, index, array) => route.name === item.name && route.destination === item.destination);
            routes.data.splice(teste, 1);
            this.updateRoutes(routes);
            
        }
        updateRoutes = async (e) => {
            await AsyncStorage.setItem('@NoPonto:ROUTES', JSON.stringify(e));
            ToastAndroid.show('Rota excluída!', ToastAndroid.SHORT);
        }
        return (
          <View style={styles.card}>
            <Grid>
                <Row>
                    <Col>
                        <Text style={styles.title}>{item.name}</Text>
                    </Col>
                    <Col style={styles.columnOptions}>
                    <TouchableOpacity ><Icon size={25} name="play-arrow" style={{color: GlobalStyles.primaryColor, paddingLeft: 10}}/></TouchableOpacity>
                        <TouchableOpacity onPress={this.removeRoute}><Icon size={25} name="delete" style={{color: '#e61919', paddingLeft: 10}}/></TouchableOpacity>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.infos}>{"Destino: " + item.destination}</Text>
                    </Col>
                    <Col style={styles.columnArrow}>
                        {expanded
                        ? <Icon size={25} name="arrow-drop-up" />
                        : <Icon size={25} name="arrow-drop-down" />}
                    </Col>
                    
                </Row>
            </Grid>
            {/* <TouchableOpacity onPress={this.removeRoute}><Icon size={25} name="delete" /></TouchableOpacity> */}
            
          </View>
        );
      }
      _renderContent(item) {
        return (
            <View style={styles.cardContent}>
                <Grid>
                    <Row>
                        <Text style={styles.infosSecundary}>{"Alarmar em: " + item.distance + " metros."}</Text>
                    </Row>
                    <Row>
                        {item.typeAlarm === "key0" &&
                            <Text style={styles.infosSecundary}>{"Somente vibração"}</Text>
                        }
                        {item.typeAlarm === "key1" &&
                            <Text style={styles.infosSecundary}>{"Vibrar e tocar"}</Text>
                        }
                    </Row>
                </Grid>
            </View>
        );
      }
    render(){
        return (
            <Accordion
                dataArray={this.props.data}
                animation={true}
                expanded={true}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
            />
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
