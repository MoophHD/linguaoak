import { CHANGE_LANGUAGE } from '../constants/userInterface.constant';

const initialState = {
    language: {
        current: 'rus',
        options: ['eng', 'rus']
    }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};