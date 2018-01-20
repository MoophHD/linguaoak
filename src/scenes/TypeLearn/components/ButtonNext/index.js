import React from 'react';
import PropTypes from 'prop-types';
import { 
    View, Button, Text
} from 'react-native';
import s from './style';

const ButtonNext = ({ onPress, verdict }) => (
    <View style={s.container}>
        <Text>
            {verdict == 'Y' ? 'Right!' : 'Nep'}
        </Text>
        <Button 
            style={s.btn}
            color="#F5F5F5"
            onPress={onPress} 
            title={'Next'} />
    </View>
)

ButtonNext.PropTypes = {
    onPress: PropTypes.func,
    verdict: PropTypes.oneOf(['Y', 'N'])
}

export default ButtonNext;