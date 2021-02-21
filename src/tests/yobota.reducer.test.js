import { initialState, yobotaReducer } from '../store/yobota.reducer'
import * as constant from '../store/yobota.constant'

describe("Yobota reducer", () => {
  it("should handle DISPLAY_CHART", () => {
    expect(yobotaReducer(initialState, {
      type: constant.DISPLAY_CHART,
      chart: true
    }))
  })
  it("should handle SET_YOBOTA_DATA", () => {
    expect(yobotaReducer(initialState, {
      type: constant.SET_YOBOTA_DATA,
      data: []
    }))
  })
})
