import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
  View,
  StyleSheet
 } from 'react-native';

 import TypeLearn from './scenes/TypeLearn'


class AppContainer extends Component {
  
  render() {
    return (
        <View style={ styles.container }>
          <TypeLearn />
        </View>
    );
  }
}

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 50
  }
});

export default AppContainer;