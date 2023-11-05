import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ReviewState {
  dropdownOpen: { [key: string]: boolean }
  editing: { [key: string]: boolean }
  newReview: string
  editingReview: string
}

const initialState: ReviewState = {
  dropdownOpen: {},
  editing: {},
  newReview: '',
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
    setNewReview: (state, action: PayloadAction<string>) => {
      state.newReview = action.payload
    },
    setEditingReview: (state, action: PayloadAction<string>) => {
      state.editingReview = action.payload
    },
  },
})

export const { toggleDropdown, toggleEditing, setNewReview, setEditingReview } =
  reviewSlice.actions

export default reviewSlice.reducer
