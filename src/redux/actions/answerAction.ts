import { Dispatch } from 'redux'
import { IAnswer } from '@/models/Answer'
import { AnswerService } from '@/services/apiServices'
import {
  SET_ANSWERS,
  ADD_ANSWER,
  UPDATE_ANSWER,
  DELETE_ANSWER,
} from '../actionTypes'

// 답변 목록을 설정하는 액션
export const setAnswers = (answers: IAnswer[]) => {
  return {
    type: SET_ANSWERS,
    payload: answers,
  }
}

// 답변을 추가하는 액션
export const addAnswer = (answer: IAnswer) => {
  return {
    type: ADD_ANSWER,
    payload: answer,
  }
}

// 답변을 업데이트하는 액션
export const updateAnswer = (answer: IAnswer) => {
  return {
    type: UPDATE_ANSWER,
    payload: answer,
  }
}

// 답변을 삭제하는 액션
export const deleteAnswer = (answerId: string) => {
  return {
    type: DELETE_ANSWER,
    payload: answerId,
  }
}

// 비동기적으로 답변 목록을 가져오는 액션
export const fetchAnswers = () => {
  return async (dispatch: Dispatch) => {
    try {
      const answers = await AnswerService.getAnswers()
      dispatch(setAnswers(answers))
    } catch (error) {
      // 에러 처리 로직 추가
    }
  }
}
