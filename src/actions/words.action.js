import { GUESS } from '../constants/words.constant';

export function guess(word, guess) {
  return {
    type: GUESS,
    word: word,
    guess: guess
  }
}