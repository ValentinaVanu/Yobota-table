import * as constant from './yobota.constant'

export const initialState = {
  data: [],
  chart: "off"
}

export const yobotaReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.DISPLAY_CHART: 
    return {
      ...state,
      chart: action.chart
    }
    case constant.SET_YOBOTA_DATA:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
