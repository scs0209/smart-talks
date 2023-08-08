interface Screen {
  _id: string
  id: number
  screenName: string
  locationId: string
}

export interface ScreenState {
  screens: Screen[]
  loading: boolean
  error: any
}
