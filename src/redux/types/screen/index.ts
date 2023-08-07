interface Screen {
  id: number
  screenName: string
  locationId: string
}

export interface ScreenState {
  screens: Screen[]
  loading: boolean
  error: any
}
