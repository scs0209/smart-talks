import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../../api'

export const fetchShowtimes = createAsyncThunk(
  'showtimes/fetchShowtimes',
  async () => {
    const showtimes = await api.getShowtimesAPI()
    return showtimes
  },
)
