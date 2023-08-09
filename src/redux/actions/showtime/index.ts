import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../../api'

interface FetchShowtimesArgs {
  movieId: string
  locationId: string
  screenId: string
}

export const fetchShowtimes = createAsyncThunk(
  'showtimes/fetchShowtimes',
  async ({ movieId, locationId, screenId }: FetchShowtimesArgs) => {
    const showtimes = await api.getShowtimesAPI(movieId, locationId, screenId)
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
