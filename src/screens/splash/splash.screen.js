import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../theme';

class SplashScreen extends Component {
    constructor() {
        super();
        this._getToken = this._getToken.bind(this);
    }

    componentDidMount() {
        this._getToken();
    }

    _getToken() {
        setTimeout(() => {
            AsyncStorage.getItem('token')
			.then(data => this.props.navigation.navigate(data ? 'Home' : 'Login'));
        }, 2000);
    }

    static navigationOptions = () => {
        return {
            header: null
        };
    }

    render() {
        return <View style={styles.container}>
            <Text style={styles.splashText}>
                <Icon name="bug" size={100} color={Theme.primaryColor} />
            </Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.softPrimaryColor
    },
    splashText: {
        width: 100,
        height: 100,
    }
});

export default SplashScreen;