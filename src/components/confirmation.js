import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <View style={styles.modalContent}>
                <Text>I am the modal content!</Text>
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
});

 
export default Confirmation;