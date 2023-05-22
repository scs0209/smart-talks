import { Dispatch } from 'redux'
import { apiService } from '@/services/apiServices'
import { SET_USER, CLEAR_USER } from '../actionTypes'
import { IUser } from '@/models/User'

// 유저 정보를 설정하는 액션
export const setUser = (user: IUser) => {
  return {
    type: SET_USER,
    payload: user,
  }
}

// 유저 정보를 초기화하는 액션
export const clearUser = () => {
  return {
    type: CLEAR_USER,
  }
}

// 비동기적으로 유저 정보를 가져오는 액션
export const fetchUser = (userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await apiService.get(userId)
      dispatch(setUser(user))
    } catch (error) {
      // 에러 처리 로직 추가
    }
  }
}
