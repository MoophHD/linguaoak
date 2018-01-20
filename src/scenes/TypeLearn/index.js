import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
    View,
    StyleSheet
   } from 'react-native';
   
import * as actions from '../../actions/words.action'
import s from './style'
import FromContainer from './components/FromContainer';
import ToContainer from './components/ToContainer';
import ButtonNext from './components/ButtonNext';

const WORDS_PER_SECCION = 3;
const CYCLE_TYPE = {
    NATIVE_FOREIGH: 'NATIVE_FOREIGH',
    FOREIGH_NATIVE: 'FOREIGH_NATIVE'
}
const VERDICT = {
    Y: 'Y',
    N: 'N'
}

class TypeLearn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wordFrom: '',
            wordTo: '',
            wordQueue: [],
            id: '',
            verdict: null,
            
            input: ""
        }
        
        this.submit = this.submit.bind(this);
        this.cycle = this.cycle.bind(this);
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
        this.setState(() => ({ wordFrom: '', wordTo: '', wordQueue: [], verdict: null }));

        let wordsInSeccion = [];
        const { performance } = this.props;
        let perfById = performance.byid;

        //sort array of keys by value from least to largest
        let sortedPerformance = Object.keys(perfById).sort((a,b) => (perfById[a]-perfById[b]));

        for (let i = 0; i < WORDS_PER_SECCION; i++) {
            //pick key(id) in order
            wordsInSeccion.push( sortedPerformance[i] );
        }

        wordsInSeccion = this.shuffle(wordsInSeccion);

        this.setState(() => ({ wordQueue: wordsInSeccion}), this.cycle)

    }

    cycle() {
        this.setState(() => ({ verdict: null, input: ""}));
        const { byid } = this.props;
        let id, from, to, newQueue;

        // 75% for foreign -> native
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
            id: id,
        }))
    }

    submit() {
        const { increasePerformance, decreasePerformance } = this.props.actions;
        const id = this.state.id;
        let verdict;
        // console.log(this.state.input.input.slice());

        // if ( this.checkWords( this.state.finput.input.slice, this.state.wordTo.slice) ) {
        //     // increasePerformance(id);
        //     verdict = VERDICT.Y;
        // } else {
        //     // decreasePerformance(id); 
        //     verdict = VERDICT.N;
        // }


        // this.setState(() => ({ verdict }));
    }

    checkWords(a, b) {
        if (a.toLowerCase() == b.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { count, actions } = this.props;

        let containerStyle;
        if (this.state.verdict) {
            if (this.state.verdict == VERDICT.Y) {
                containerStyle = StyleSheet.flatten([s.core, s.core__y]);
            } else {
                containerStyle = StyleSheet.flatten([s.core, s.core__n]);
            }
        } else {
            containerStyle = s.core;
        }

        return (
            <View style={containerStyle}>
                {!!this.state.verdict && <ButtonNext onPress={this.cycle} verdict={this.state.verdict}/>}
                <FromContainer word={this.state.wordFrom}/>
                <ToContainer
                    verdict={this.state.verdict}
                    onSubmit={this.submit}
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
    actions: PropTypes.arrayOf(PropTypes.func)
}

export default connect(mapStateToProps, mapDispatchToProps)(TypeLearn);