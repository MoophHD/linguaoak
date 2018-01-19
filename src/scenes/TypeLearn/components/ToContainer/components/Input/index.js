import React from 'react';
import PropTypes from 'prop-types';
import { 
    TypeInput
} from 'react-native';

import s from './style'; 

   

const Input = ({ onSubmit, onChange, value }) => (
    <TypeInput 
        onSubmit={onSubmit}
        onChange={(text) => onChange({input: text})}  
        value={value}/>
)

Input.PropTypes = {
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string
}

export default Input;