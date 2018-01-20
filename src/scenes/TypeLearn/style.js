import React from 'react';
import { StyleSheet } from 'react-native';

const style = {
    core: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
    },
    core__y: {
        backgroundColor: '#A1FFB0'
    },
    core__n: {
        backgroundColor: '#FF88A4'
    }
}

export default StyleSheet.create(style);
