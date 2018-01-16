import { GUESS } from '../constants/words.constant';

const initialState = {
    set: {
        ids: [0, 1, 2],
        byid: {
            0: {
                foreigh: 'black',
                native: 'черный'
            },
            1: {
                foreigh: 'white',
                native: 'белый'
            },
            2: {
                foreigh: 'yellow',
                native: 'желтый'
            }
        }
    },
    performance: { // 0..3
        byid: {
            0: 1,
            1: 2,
            2: 0
        }
    }

};

export default (state = initialState, action) => {
  switch (action.type) {
    case GUESS:
      return { ...state };
    default:
      return state;
  }
};