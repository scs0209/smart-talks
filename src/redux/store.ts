import {
  combineReducers,
  configureStore,
  PayloadAction,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { moviesReducer } from './reducers/movieSlice'

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    movies: moviesReducer,
    // 추가적인 리듀서들을 여기에 추가해주세요.
  })(state, action)
}

const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  })

const store = makeStore()

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development',
})
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
