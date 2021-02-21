import * as constant from '../store/yobota.constant'
import * as action from '../store/yobota.action'

const data = []
const chart = true

describe("Testing all the yobota actions", () => {
  it("should create an action to set data", () => {
    expect(action.setYobotaDataAction(data)).toEqual({
      type: constant.SET_YOBOTA_DATA,
      data
    })
  })
  it("should create an action to show chart", () => {
    expect(action.setDisplayChartAction(chart)).toEqual({
      type: constant.DISPLAY_CHART,
      chart
    })
  })
})
