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
