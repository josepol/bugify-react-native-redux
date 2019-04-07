import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

class Drawer extends Component {
    constructor() {
        super();
    }

    static navigationOptions = () => {
        return {
            header: null
        };
    }

    render() {
        return <SafeAreaView><View><Text>Drawer</Text></View></SafeAreaView>
    }
}

const styles = StyleSheet.create({
});

export default Drawer;