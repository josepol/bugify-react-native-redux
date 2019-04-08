import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {listBugsProvider} from '../../store/bugs/bugs.provider';
import Theme from '../../theme';
import { FlatList } from 'react-native-gesture-handler';

const mapStateToProps = (state, props) => {
    return {
        bugs: state.bugs.bugs
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        listBugs: (token) => dispatch(listBugsProvider(token))
    }
}

class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            language: ''
        }
        this._logout = this._logout.bind(this);
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: 'Bugs!',
            headerLeft: <TouchableWithoutFeedback onPress={() => navigation.openDrawer()} ><Icon style={styles.navigationIcon} name="bars" size={20} color={Theme.white} /></TouchableWithoutFeedback>,
            headerRight: <TouchableWithoutFeedback onPress={params.logout}><Icon style={styles.navigationIconRight} name="lock" size={20} color={Theme.white} /></TouchableWithoutFeedback>,
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            logout: this._logout
        });
        AsyncStorage.getItem('token').then(token => this.props.listBugs(token));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps === this.props) {
            return;
        }
        console.log(this.props.bugs);
    }

    _logout() {
        AsyncStorage.clear();
        this.props.navigation.navigate('Login');
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
            <FlatList
                data={this.props.bugs}
                renderItem={(item) => <Text>item.title</Text>}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);