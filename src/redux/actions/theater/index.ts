import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../../api'

export const fetchTheaters = createAsyncThunk(
  'theaters/fetchTheaters',
  async () => {
    const theaters = await api.getTheatersAPI()
    console.log(theaters)
    return theaters
  },
)

export const createTheaterAPI = createAsyncThunk(
  'theaters/createTheater',
  async (data: { name: string; address: string }) => {
    const theaters = await api.createTheaterAPI(data.name, data.address)
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
