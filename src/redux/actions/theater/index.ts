import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../../api'

export const fetchTheaters = createAsyncThunk(
  'theaters/fetchTheaters',
  async () => {
    const theaters = await api.getTheatersAPI()
    return theaters
  },
)

export const createDummyTheaters = createAsyncThunk(
  'theaters/createDummyTheaters',
  async () => {
    const theaters = await api.createDummyTheatersAPI()
    return theaters
  },
)

export const fetchScreens = createAsyncThunk(
  'theater/fetchScreens',
  async (theaterId: string, { rejectWithValue }) => {
    try {
      const screens = await api.getTheaterScreensAPI(theaterId)
      return screens
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)
