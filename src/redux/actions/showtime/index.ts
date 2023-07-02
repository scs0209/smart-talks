import { getShowtimesAPI } from '@/redux/api/showtime'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchShowtimes = createAsyncThunk(
  'showtimes/fetchShowtimes',
  async () => {
    const showtimes = await getShowtimesAPI()
    return showtimes
  },
)
