import { 
    INCREASE_PERFORMANCE,
    DECREASE_PERFORMANCE
 } from '../constants/words.constant';

const PERFORMANCE = {
  MAX: 4,
  MIN: 0
}

const initialState = {

    ids: [0, 1, 2],
    byid: {
        0: {
            foreign: 'black',
            native: 'черный'
        },
        1: {
            foreign: 'white',
            native: 'белый'
        },
        2: {
            foreign: 'yellow',
            native: 'желтый'
        }
    },
    performance: { // 0..4
        byid: {
            0: 1,
            1: 2,
            2: 0
        }
    }

};


let performance, id;
export default (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_PERFORMANCE:
      id = action.id;
      performance = state.performance.byid[id];
      return { ...state, 
              performance: {...state.performance, byid: {
        ...state.performance.byid,
        [id]: Math.min(performance + 1, PERFORMANCE.MAX)
      }}};
    case DECREASE_PERFORMANCE:
      id = action.id;
      performance = state.performance.byid[id];
      return { ...state, 
              performance: {...state.performance, byid: {
        ...state.performance.byid,
        [id]: Math.max(performance - 1, PERFORMANCE.MIN)
      }}};
    default:
      return state;
  }
};