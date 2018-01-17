import { 
  INCREASE_PERFORMANCE,
  DECREASE_PERFORMANCE
 } from '../constants/words.constant';

export function increasePerformance(id) {
  return {
    type: INCREASE_PERFORMANCE,
    id: id
  }
}

export function decreasePerformance(id) {
  return {
    type: DECREASE_PERFORMANCE,
    id: id
  }
}



