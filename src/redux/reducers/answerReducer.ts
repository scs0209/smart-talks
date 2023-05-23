/* eslint-disable */
import { IAnswer } from '@/models/Answer'
import {
  SET_ANSWERS,
  ADD_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
} from '../actionTypes'
import { AnswerActionTypes } from '../types/answerTypes'

interface AnswerState {
  answers: IAnswer[]
}

const initialState: AnswerState = {
  answers: [],
}

const answerReducer = (
  state = initialState,
  action: AnswerActionTypes,
): AnswerState => {
  switch (action.type) {
    case SET_ANSWERS:
      return {
        ...state,
        answers: action.payload,
      }
    case ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, action.payload],
      }
    case UPDATE_ANSWER:
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer._id === action.payload._id ? action.payload : answer,
        ),
      }
    case DELETE_ANSWER:
      return {
        ...state,
        answers: state.answers.filter(
          (answer) => answer._id !== action.payload,
        ),
      }
    // 추가적인 액션 처리 로직을 여기에 추가해주세요.
    default:
      return state
  }
}

export default answerReducer
