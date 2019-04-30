import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Picker, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {listBugsProvider} from '../../store/bugs/bugs.provider';
import Theme from '../../theme';
import { FlatList } from 'react-native-gesture-handler';
import BugCardComponent from './components/bug-card.component';
import ActionButton from 'react-native-action-button';

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
            language: '',
            isGrid: false,
            flatListKey: 'list'
        }
        this._logout = this._logout.bind(this);
        this._changeListType = this._changeListType.bind(this);
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

    _changeListType() {
        this.setState({
            isGrid: !this.state.isGrid,
            flatListKey: !this.state.isGrid ? 'grid' : 'list'
        });
    }

    _renderFloatingButton() {
        return (
            <ActionButton buttonColor={Theme.primaryColor} renderIcon={() => <Icon name='plus' color='white'/>}>
                <ActionButton.Item buttonColor={Theme.softPrimaryColor} title={this.state.isGrid ? 'List': 'Grid'} onPress={this._changeListType}>
                    <Icon name={this.state.isGrid ? 'list': 'th'} style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor={Theme.primaryColor} title="Add bug" onPress={() => {}}>
                    <Icon name="plus" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        );
    }

    render() {
        return <View>
            <FlatList
                key={this.state.flatListKey}
                data={this.props && this.props.bugs ? this.props.bugs : []}
                renderItem={({item}) => <BugCardComponent bug={item}/>}
                keyExtractor={(item, index) => index.toString()}
                numColumns={this.state.isGrid ? 3 : 1}
            ></FlatList>
            {this._renderFloatingButton()}
        </View>
    }
}

const styles = StyleSheet.create({
    navigationIcon: {
        marginLeft: 20
    },
    navigationIconRight: {
        marginRight: 20
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);