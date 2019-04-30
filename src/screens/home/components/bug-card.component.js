import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Modal as NativeModal, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import Theme from '../../../theme';
import Confirmation from '../../../components/confirmation';

class BugCardComponent extends Component {

    state = {
        bugModalVisible: false,
        bugDeleteModalVisible: false
    };

    constructor(props) {
        super();
        this._bugLongPress = this._bugLongPress.bind(this);
        this._bugPress = this._bugPress.bind(this);
    }

    setBugModalVisible(visible) {
        this.setState({bugModalVisible: visible});
    }

    setBugDeleteModalVisible(visible) {
        this.setState({bugDeleteModalVisible: visible});
    }

    _bugPress() {
        this.setBugModalVisible(true);
    }

    _bugLongPress() {
        this.setBugDeleteModalVisible(!this.state.bugDeleteModalVisible);
    }

    render() { 
        return (
            <TouchableOpacity onPress={this._bugPress} onLongPress={this._bugLongPress} style={styles.touchable}><View style={styles.card}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode='head'>{this.props.bug.title}</Text>
                <Text style={styles.description} numberOfLines={4} ellipsizeMode='tail'>{this.props.bug.description}</Text>
                <NativeModal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.bugModalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <SafeAreaView style={{marginTop: 22}}>
                        <View>
                        <TouchableHighlight
                            onPress={() => {
                            this.setBugModalVisible(!this.state.bugModalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
                        </View>
                    </SafeAreaView>
                    </NativeModal>
                    <Modal isVisible={this.state.bugDeleteModalVisible} onBackdropPress={() => this.setBugDeleteModalVisible(!this.state.bugDeleteModalVisible)}>
                    <Confirmation/>
                    </Modal>
            </View></TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    touchable: {
        flex: 1,
        flexDirection: 'column',
    },
    card: {
        backgroundColor: Theme.softPrimaryColor,
        borderRadius: 5,
        borderColor: Theme.primaryColor,
        borderWidth: 1,
        margin: 5,
        padding: 10,
        height: 100
    },
    title: {
        position: 'absolute',
        top: 5,
        left: -3,
        borderRadius: 5,
        overflow: 'hidden',
        padding: 5,
        backgroundColor: Theme.primaryColor,
        color: Theme.white,
        fontWeight: 'bold',
    },
    description: {
        color: Theme.primaryColor,
        fontWeight: 'normal',
        marginTop: 30,
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
});

 
export default BugCardComponent;