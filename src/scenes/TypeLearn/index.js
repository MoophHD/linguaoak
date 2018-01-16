import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    View
   } from 'react-native';
   
import * as actions from '../../actions/words.action'
import s from './style'
import TypeInput from '../../components/TypeInput';
import FromContainer from './components/FromContainer'

const WORDS_PER_SECCION = 3;
const CYCLE_TYPE = {
    NATIVE_FOREIGH: 'NATIVE_FOREIGH',
    FOREIGH_NATIVE: 'FOREIGH_NATIVE'
}

class TypeLearn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wordFrom: '',
            wordTo: '',
            wordQueue: [],
            
            input: ''
        }
        
    }

    // PARTIALS

    shuffle(array) { //Fisher-Yates (aka Knuth) Shuffle
        var copy = [], n = array.length, i;
      
        while (n) {
      
          i = Math.floor(Math.random() * array.length);
      
          if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
          }
        }
      
        return copy;
      }

    // SECCION

    componentDidMount() {
        this.newSeccion();
    }

    newSeccion() {
        //clear
        this.setState(() => ({ wordFrom: '', wordTo: '', wordQueue: [], }));

        let wordsInSeccion = [];
        const { performance } = this.props;
        let perfById = performance.byid;

        //sort array of keys by value from least to largest
        let sortedPerformance = Object.keys(perfById).sort(function(a,b){return perfById[a]-perfById[b]})

        for (let i = 0; i < WORDS_PER_SECCION; i++) {
            //pick key(id) in order
            wordsInSeccion.push( sortedPerformance[i] );
        }

        wordsInSeccion = this.shuffle(wordsInSeccion);

        this.setState(() => ({ wordQueue: wordsInSeccion}), this.cycle)

    }

    cycle() {
        const { byid } = this.props;
        let id, from, to, newQueue;

        // 75% for foreign to native
        let cycleType = Math.random() > 0.25 ? CYCLE_TYPE.FOREIGH_NATIVE : CYCLE_TYPE.NATIVE_FOREIGH;
        
        newQueue = this.state.wordQueue;
        id = newQueue.pop(); //get last id and affect new line

        if (cycleType == CYCLE_TYPE.FOREIGH_NATIVE) {
            from = byid[id].foreign;
            to = byid[id].native;
        } else {
            from = byid[id].native;
            to = byid[id].foreign;
        }

        this.setState(() => ({
            wordFrom: from,
            wordTo: to,
            wordQueue: newQueue,
        }))
    }

    submit() {
        if ( this.state.input == this.state.wordTo) {
            // dispatch + performance
            
        } else {
            // dispatch - performance
        }

        //animation then confirmation btn (?)
        this.cycle();
    }

    render() {
        const { count, actions } = this.props;
        return (
            <View style={s.core}>
                <FromContainer word={this.state.wordFrom}/>
                <TypeInput 
                    onSubmitEditing={this.submit}
                    onChange={(text) => this.setState({input: text})}  
                    value={this.state.input}/>
            </View>
        );
      }
}

function mapStateToProps(state) {
    const words = state.words;
    return {
      ids: words.ids,
      byid: words.byid,
      performance: words.performance
    }
  }

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

TypeLearn.PropTypes = {
    action: PropTypes.arrayOf(PropTypes.func)
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeLearn);