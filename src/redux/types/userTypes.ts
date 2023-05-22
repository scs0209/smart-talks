import { IUser } from '@/models/User'
import { Action } from 'redux'
import { CLEAR_USER, SET_USER } from '../actionTypes'

export interface SetUserAction extends Action<typeof SET_USER> {
  payload: IUser
}

export interface ClearUserAction extends Action<typeof CLEAR_USER> {}

export type UserActionTypes = SetUserAction | ClearUserAction
