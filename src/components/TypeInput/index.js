import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

import s from './style';

class TypeInput extends Component {
    render() {
        const { onChange, onSubmit, value } = this.props;
        
        return(
            <TextInput 
            value={value}
            onSubmitEditing={onSubmit}
            onChangeText={(text) => onChange(text)} style={s.core} />
        )
    }
}

TypeInput.PropTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    value: PropTypes.string
}

export default TypeInput;