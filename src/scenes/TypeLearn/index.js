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
            id: '',
            
            input: ''
        }
        
        this.submit = this.submit.bind(this);
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
        let sortedPerformance = Object.keys(perfById).sort((a,b) => (perfById[a]-perfById[b]));

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
        console.log(from);
        this.setState(() => ({
            wordFrom: from,
            wordTo: to,
            wordQueue: newQueue,
            id: id
        }))
    }

    submit() {
        const { increasePerformance, decreasePerformance } = this.props.actions;
        const id = this.state.id;

        if ( this.state.input.toLowerCase() == this.state.wordTo) {

            increasePerformance(id);
            
        } else {

            decreasePerformance(id);
            
        }

        //animation then confirmation btn (?)

        this.setState(() => ({input: ''}), this.cycle)
    }

    render() {
        const { count, actions } = this.props;
        return (
            <View style={s.core}>
                <FromContainer word={this.state.wordFrom}/>
                <TypeInput 
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