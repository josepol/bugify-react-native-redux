import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Picker, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Theme from '../../theme';

class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            language: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Bugs!',
            headerLeft: <TouchableWithoutFeedback onPress={() => navigation.openDrawer()} ><Icon style={styles.navigationIcon} name="bars" size={20} color={Theme.white} /></TouchableWithoutFeedback>,
            headerRight: <TouchableWithoutFeedback onPress={() => { console.log('clicked') }}><Icon style={styles.navigationIconRight} name="ellipsis-v" size={20} color={Theme.white} /></TouchableWithoutFeedback>,
        }
    }

    render() {
        return <View>
            <Text>Home</Text>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login')}}>
                        <Text style={styles.loginButtonText}>LOGOUT</Text>
                    </TouchableOpacity>
            <Picker
                selectedValue={this.state.language}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    }
}

const styles = StyleSheet.create({
    navigationIcon: {
        marginLeft: 20
    },
    navigationIconRight: {
        marginRight: 20
    }
});

export default HomeScreen;