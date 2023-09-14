import {
  Action,
  combineReducers,
  configureStore,
  PayloadAction,
  ThunkAction,
} from '@reduxjs/toolkit'
import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper'

import { moviesReducer } from './reducers/movieSlice'
import reservationSlice from './reducers/reservationSlice'
import showtimeSlice from './reducers/showtimeSlice'
import theaterSlice from './reducers/theaterSlice'
import screenSlice from './reducers/screenSlice'
import movieApi from './api/movieApi'
import { userApi } from './api/userApi'

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    [movieApi.reducerPath]: movieApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    movies: moviesReducer,
    theaters: theaterSlice,
    showtimes: showtimeSlice,
    reservations: reservationSlice,
    screens: screenSlice,
    // 추가적인 리듀서들을 여기에 추가해주세요.
  })(state, action)
}

const makeStore = (context: Context) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(movieApi.middleware, userApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: true,
})
