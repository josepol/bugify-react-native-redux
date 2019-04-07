import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginProvider } from '../../store/auth/auth.provider';
import { resetLoginAction } from '../../store/auth/auth.actions';
import {connect} from 'react-redux';
import Theme from '../../theme';

const mapStateToProps = (state, props) => {
    return {
        authStatus: state.auth.token
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (loginData) => dispatch(loginProvider(loginData)),
        resetLogin: () => dispatch(resetLoginAction())
    }
}

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isValid: false,
            invalidCredentials: false
        }
        this._onLoginButtonPress = this._onLoginButtonPress.bind(this);
        this._getButtonColor = this._getButtonColor.bind(this);
        this._usernameChanged = this._usernameChanged.bind(this);
        this._passwordChanged = this._passwordChanged.bind(this);
    }

    static navigationOptions = () => {
        return {
            header: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps === this.props) {
            return;
        }
        if (this.props.authStatus) {
            this.props.navigation.navigate('Home');
        } else if (this.props.authStatus !== undefined) {
            this.setState({invalidCredentials: true});
        }
    }

    _usernameChanged(username) {
        this._resetInvalidCredentials();
        this.setState({ username }, this._checkIsValid);
    }

    _passwordChanged(password) {
        this._resetInvalidCredentials();
        this.setState({ password }, this._checkIsValid);
    }

    _resetInvalidCredentials() {
        this.props.resetLogin();
        this.setState({invalidCredentials: false});
    }

    _checkIsValid() {
        this.setState({
            isValid: this.state.username.length != 0 && this.state.password.length != 0
        });
    }

    _onLoginButtonPress() {
       this.props.login({
           username: this.state.username,
           password: this.state.password
       });
    }

    _getButtonColor() {
        return {backgroundColor: this.state.isValid ? Theme.primaryColor : Theme.grey};
    }

    render() {
        return <View style={styles.page}><ScrollView style={styles.scroll}>
            <SafeAreaView>
                <View style={styles.container}>
                    <Text style={styles.title}>BUGIFY</Text>
                    <View style={styles.textInputWrapper}>
                        <Icon style={styles.icon} name="user" size={20} color={Theme.primaryColor} />
                        <TextInput placeholder="Username" underlineColorAndroid="transparent" autoCapitalize='none'
                            placeholderTextColor={Theme.grey} style={styles.textInput} onChangeText={this._usernameChanged} />
                    </View>
                    <View style={styles.textInputWrapper}>
                        <Icon style={styles.icon} name="lock" size={20} color={Theme.primaryColor} />
                        <TextInput placeholder="Password" underlineColorAndroid="transparent" autoCapitalize='none' secureTextEntry={true}
                            placeholderTextColor={Theme.grey} style={styles.textInput} onChangeText={this._passwordChanged} />
                    </View>
                    {this.state.invalidCredentials && <Text style={styles.invalidCredentials}>Invalid credentials</Text>}
                    <TouchableOpacity style={[styles.loginButton, this._getButtonColor()]} onPress={this._onLoginButtonPress} disabled={!this.state.isValid}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </ScrollView></View>
    }
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: Theme.softPrimaryColor,
    },
    scroll: {
        height: '100%',
    },
    container: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        color: Theme.primaryColor,
        fontSize: 56,
        paddingTop: 20,
        paddingBottom: 20,
    },
    textInputWrapper: {
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.primaryColor,
        backgroundColor: Theme.white,
        borderRadius: 8,
    },
    textInput: {
        flex: 1,
        width: '100%',
        fontFamily: 'OpenSansCondensed-Bold',
        borderColor: Theme.primaryColor,
        backgroundColor: Theme.white,
        textAlign: 'center',
        color: Theme.grey,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: -20,
    },
    icon: {
        padding: 10
    },
    loginButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 50,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    loginButtonText: {
        color: Theme.white,
        fontSize: 21,
        fontWeight: 'bold'
    },
    invalidCredentials: {
        color: Theme.red
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);