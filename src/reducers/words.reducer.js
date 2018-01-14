import { GUESS } from '../constants/words.constant';

const initialState = {
    set: {
        ids: [0, 1, 2],
        byid: {
            0: {
                eng: 'black',
                rus: 'черный'
            },
            1: {
                eng: 'white',
                rus: 'белый'
            },
            2: {
                eng: 'yellow',
                rus: 'желтый'
            }
        }
    },
    performance: { // 0..3
        byid: {
            0: 1,
            0: 2,
            0: 0
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