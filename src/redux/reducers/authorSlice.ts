import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthorState {
  isSignUpActive: boolean
  isHover: boolean
  isPress: boolean
}

const initialState: AuthorState = {
  isSignUpActive: false,
  isHover: false,
  isPress: false,
}

const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    setSignUpActive: (state, action: PayloadAction<boolean>) => {
      state.isSignUpActive = action.payload
    },
    setIsHover: (state, action: PayloadAction<boolean>) => {
      state.isHover = action.payload
    },
    setIsPress: (state, action: PayloadAction<boolean>) => {
      state.isPress = action.payload
    },
    handleSignupClick: (state) => {
      state.isSignUpActive = true
    },
    handleLoginClick: (state) => {
      state.isSignUpActive = false
    },
  },
})

export const {
  setSignUpActive,
  setIsHover,
  setIsPress,
  handleSignupClick,
  handleLoginClick,
} = authorSlice.actions

export default authorSlice.reducer
