import { createAsyncThunk } from '@reduxjs/toolkit'

import * as api from '../../api'

export const createScreen = createAsyncThunk(
  'screens/createScreen',
  async ({
    screenName,
    locationId,
  }: {
    screenName: string
    locationId: string
  }) => {
    const screen = await api.createScreenAPI(screenName, locationId)
    return screen
  },
)
