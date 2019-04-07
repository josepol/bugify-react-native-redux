import React, {Component} from 'react';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import Route from './src/routes';
import {Provider} from 'react-redux';
import  Store from './src/store/store';

export default class App extends Component {


  constructor() {
    super();
    this._setDefaultStyles();
  }

  _setDefaultStyles() {
    const fontFamily = {
      style: {
        fontFamily: 'OpenSansCondensed-Bold'
      }
    };
    setCustomText(fontFamily);
    setCustomTextInput(fontFamily);
  }

  render() {
    return (
      <Provider store={Store}>
        <Route/>
      </Provider>
    );
  }
}