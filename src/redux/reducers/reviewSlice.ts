import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReviewState {
  dropdownOpen: { [key: string]: boolean }
  editing: { [key: string]: boolean }
  newReview: { review: string; rating: number }
  editingReview: string
}

const initialState: ReviewState = {
  dropdownOpen: {},
  editing: {},
  newReview: { review: '', rating: 0 },
  editingReview: '',
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    toggleDropdown: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.dropdownOpen[id] = !state.dropdownOpen[id]
    },
    toggleEditing: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.editing[id] = !state.editing[id]
    },
    setNewReview: (
      state,
      action: PayloadAction<{ review: string; rating: number }>,
    ) => {
      // 수정
      state.newReview = action.payload // 수정
    },
    setEditingReview: (state, action: PayloadAction<string>) => {
      state.editingReview = action.payload
    },
  },
})

export const { toggleDropdown, toggleEditing, setNewReview, setEditingReview } =
  reviewSlice.actions

export default reviewSlice.reducer
