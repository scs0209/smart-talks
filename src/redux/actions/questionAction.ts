import { Dispatch } from 'redux'
import Question, { IQuestion } from '@/models/Question'
import { QuestionService } from '@/services/apiServices'
import {
  SET_QUESTIONS,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
} from '../actionTypes'

// 질문 목록을 설정하는 액션
export const setQuestions = (questions: IQuestion[]) => {
  return {
    type: SET_QUESTIONS,
    payload: questions,
  }
}

// 질문을 추가하는 액션
export const addQuestion = (question: IQuestion) => {
  return {
    type: ADD_QUESTION,
    payload: question,
  }
}

// 질문을 업데이트하는 액션
export const updateQuestion = (question: IQuestion) => {
  return {
    type: UPDATE_QUESTION,
    payload: question,
  }
}

// 질문을 삭제하는 액션
export const deleteQuestion = (questionId: string) => {
  return {
    type: DELETE_QUESTION,
    payload: questionId,
  }
}

// 비동기적으로 질문 목록을 가져오는 액션
export const fetchQuestions = () => {
  return async (dispatch: Dispatch) => {
    try {
      const questions = await QuestionService.getQuestions()
      dispatch(setQuestions(questions))
    } catch (error) {
      // 에러 처리 로직 추가
    }
  }
}
