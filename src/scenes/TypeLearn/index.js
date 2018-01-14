import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    View
   } from 'react-native';
import PropTypes from 'prop-types';
   

import TypeInput from '../../components/TypeInput';
import * as actions from '../../actions/words.action'

class TypeLearn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '123'
        }
        
    }
    render() {
        const { count, actions } = this.props;
        return (
            <View >
                <TypeInput 
                    onChange={(text) => this.setState({input: text})}  
                    value={this.state.input}/>
            </View>
        );
      }
}

function mapStateToProps(state) {
    console.log(state);
    return {
      count: state.words.count
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeLearn);