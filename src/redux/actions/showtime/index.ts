import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../../api'

export const fetchShowtimes = createAsyncThunk(
  'showtimes/fetchShowtimes',
  async () => {
    const showtimes = await api.getShowtimesAPI()
    return showtimes
  },
)

export const createShowtime = createAsyncThunk(
  'showtimes/createShowtime',
  async (showtime: {
    movieId: string
    locationId: string
    screenId: string
    startTime: Date
    endTime: Date
  }) => {
    const showtimes = await api.createShowtimeAPI(showtime)
    return showtimes
  },
)
