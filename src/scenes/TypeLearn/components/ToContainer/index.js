import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    View
   } from 'react-native';
import s from './style';
import TypeInput from '../../../../components/TypeInput'

class ToContainer extends Component {
    render() {
        const { onSubmit, onChange, value } = this.props;
        return(
            <View style={s.container}>
                <TypeInput 
                    onSubmit={onSubmit}
                    onChange={(text) => onChange({input: text})}  
                    value={value}/>
            </View>
        )
    }
}

ToContainer = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string
}

export default ToContainer;