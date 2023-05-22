import Question, { IQuestion } from '@/models/Question'
import {
  SET_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from '../actionTypes'
import { QuestionActionTypes } from '../types/questionTypes'

interface QuestionState {
  questions: IQuestion[]
}

const initialState: QuestionState = {
  questions: [],
}

const questionReducer = (
  state = initialState,
  action: QuestionActionTypes,
): QuestionState => {
  switch (action.type) {
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      }
    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload],
      }
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question) =>
          question._id === action.payload._id ? action.payload : question,
        ),
      }
    case DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question._id !== action.payload,
        ),
      }
    // 추가적인 액션 처리 로직을 여기에 추가해주세요.
    default:
      return state
  }
}

export default questionReducer
