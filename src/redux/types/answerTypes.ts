import { Action } from 'redux'
import {
  ADD_ANSWER,
  DELETE_ANSWER,
  SET_ANSWERS,
  UPDATE_ANSWER,
} from '../actionTypes'
import { IAnswer } from '@/models/Answer'

interface SetAnswersAction extends Action<typeof SET_ANSWERS> {
  payload: IAnswer[]
}

interface AddAnswerAction extends Action<typeof ADD_ANSWER> {
  payload: IAnswer
}

interface UpdateAnswerAction extends Action<typeof UPDATE_ANSWER> {
  payload: IAnswer
}

interface DeleteAnswerAction extends Action<typeof DELETE_ANSWER> {
  payload: string // answerId
}

export type AnswerActionTypes =
  | SetAnswersAction
  | AddAnswerAction
  | UpdateAnswerAction
  | DeleteAnswerAction

// 각각 답변 목록을 설정하는 액션, 답변을 추가하는 액션, 답변을 업데이트하는 액션, 답변을 삭제하는 액션을 나타냅니다.
// 'SetAnswersAction', ... 은 해당 액션들에 대한 타입을 정의합니다.
// 'AnswerActionTypes'는 답변 액션들의 유니온 타입으로써, 'AnswerActinTypes' 타입을 갖는 액션들만의 해당 리듀서에서 처리할 수 있습니다.
