import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import questionReducer from './reducers/questionReducer'
import answerReducer from './reducers/answerReducer'

const rootReducer = combineReducers({
  user: userReducer,
  question: questionReducer,
  answer: answerReducer,
  // 추가적인 리듀서들을 여기에 추가해주세요.
})

const makeStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  return store
}

const wrapper = createWrapper(makeStore)

export default wrapper
