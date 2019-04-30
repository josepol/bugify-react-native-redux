import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {listBugsProvider} from '../../store/bugs/bugs.provider';
import Theme from '../../theme';
import { FlatList } from 'react-native-gesture-handler';
import BugCardComponent from './components/bug-card.component';

const mapStateToProps = (state, props) => {
    console.log(state);
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
            <FlatList
                data={this.props && this.props.bugs ? this.props.bugs : []}
                renderItem={({item}) => <BugCardComponent bug={item}/>}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
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