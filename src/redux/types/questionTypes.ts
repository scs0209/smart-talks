import { Action } from 'redux'
import {
  ADD_QUESTION,
  DELETE_QUESTION,
  SET_QUESTIONS,
  UPDATE_QUESTION,
} from '../actionTypes'
import { IQuestion } from '@/models/Question'

interface SetQuestionsAction extends Action<typeof SET_QUESTIONS> {
  payload: IQuestion[]
}

interface AddQuestionAction extends Action<typeof ADD_QUESTION> {
  payload: IQuestion
}

interface UpdateQuestionAction extends Action<typeof UPDATE_QUESTION> {
  payload: IQuestion
}

interface DeleteQuestionAction extends Action<typeof DELETE_QUESTION> {
  payload: string // questionId
}

export type QuestionActionTypes =
  | SetQuestionsAction
  | AddQuestionAction
  | UpdateQuestionAction
  | DeleteQuestionAction

// 각각 질문 목록을 설정하는 액션, 질문을 추가하는 액션, 질문을 업데이트하는 액션, 질문을 삭제하는 액션을 나타냄
// 'SetQuestionsAction', ... 등은 해당 액션들에 대한 타입 정의입니다.
// 'QuestionActionTypes'는 질문 액션들의 유니온 타입으로써, 'QuestionActionTypes' 타입을 갖는 액션들만 해당 리듀서에서 처리할 수 있습니다.
