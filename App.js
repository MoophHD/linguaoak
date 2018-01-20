import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/store';
import AppContainer from './src/AppContainer';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}