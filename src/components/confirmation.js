import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../theme';

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <View style={styles.modalContent}>
                <View style={styles.title}><Text style={styles.titleText}>Are you sure you want to delete this bug report?</Text></View>
                <View style={styles.buttons}>
                    <View style={[styles.button, styles.yesButton]}>
                        <TouchableOpacity onPress={() => this.props.confirmationCallback(true)}><Text style={styles.buttonText}>Yes!</Text></TouchableOpacity>
                    </View>
                    <View style={[styles.button, styles.noButton]}>
                        <TouchableOpacity onPress={() => this.props.confirmationCallback(false)}><Text style={styles.buttonText}>No!</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
    },
    title: {
        height: 40,
        padding: 10,
        backgroundColor: Theme.grey,
        borderRadius: 5
    },
    titleText: {
        color: Theme.white
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        flex: 1,
        margin: 5,
        textAlign: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5
    },
    yesButton: {
        backgroundColor: Theme.green
    },
    noButton: {
        backgroundColor: Theme.softGrey
    },
    buttonText: {
        textAlign: 'center',
        color: Theme.white
    }
});

 
export default Confirmation;