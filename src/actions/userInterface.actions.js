import { CHANGE_LANGUAGE } from '../constants/userInterface.constant';

export function changeLanguage(lang) {
  return {
    type: CHANGE_LANGUAGE,
    payload: lang
  }
}