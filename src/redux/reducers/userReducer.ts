/* eslint-disable */
import User, { IUser } from '@/models/User'
import { SET_USER, CLEAR_USER } from '../actionTypes'
import { UserActionTypes } from '../types/userTypes'

interface UserState {
  user: IUser | null
}

const initialState: UserState = {
  user: null,
}

const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    // 추가적인 액션 처리 로직을 여기에 추가해주세요.
    default:
      return state
  }
}

export default userReducer
