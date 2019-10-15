import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Grid, Col, Row, Icon, Accordion } from 'native-base';

import GlobalStyles from '../../global';

const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];

class Route extends Component {
    _renderHeader(item, expanded) {
        return (
          <View style={styles.card}>
            <Grid>
                <Row>
                    <Col>
                        <Text style={styles.title}>Casa</Text>
                    </Col>
                </Row>
                <Row>
                    <Text style={styles.infos}>Partida: Mercado Central</Text>
                </Row>
                <Row>
                    <Text style={styles.infos}>Destino: Dragão do Mar</Text>
                </Row>
            </Grid>
            {expanded
              ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
              : <Icon style={{ fontSize: 18 }} name="add-circle" />}
          </View>
        );
      }
      _renderContent(item) {
        return (
          <Text>
            {item.content}
          </Text>
        );
      }
    render(){
        return (
            <Accordion
                dataArray={dataArray}
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
    }
})

export default Route;
