import React, { Component } from 'react';

import { View, Modal, StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';

export default class SimpleModal extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.props.onChangeState();
    }
    render() {
        const { show } = this.props;
        return (
            <Modal animationType={"fade"} transparent={true} visible={show}>
                <View style={styles.modal}>
                    <View style={styles.container}>
                        <Text>Você será alertado quando estiver à 200 metros de seu destino!</Text>
                        <Button rounded onPress={this.toggleModal} style={styles.button}>
                            <Text style={{width: '100%', textAlign: 'center'}}>Ok</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create ({
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16
    },
    container:{
        backgroundColor: '#FFF',
        width: '100%',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center'
    },
    button: {
        width: 70,
        height: 40,
        marginTop: 20
    }
})