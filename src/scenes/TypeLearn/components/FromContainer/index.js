import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    View,
    Text
} from 'react-native';

import s from './style'

const FromContainer = ({ word }) => (
    <View style={s.container}>
        <Text style={s.text}>
            {word}
        </Text>
    </View>
)

FromContainer.PropTypes = {
    word: PropTypes.string
}

export default FromContainer;