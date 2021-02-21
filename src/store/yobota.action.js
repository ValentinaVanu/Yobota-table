import * as constant from './yobota.constant'
import { get } from 'axios'


export const setDisplayChartAction = chart => ({
  type: constant.DISPLAY_CHART,
  chart
})

export const setYobotaDataAction = data => ({
  type: constant.SET_YOBOTA_DATA,
  data
})

export const getYobotaDataAction = () => {
  return dispatch => {
    try {
      const getResult = async() => {
        const { data } = await get('http://localhost:1234/data')
        dispatch(setYobotaDataAction(data))
        // console.log(data)
      }
      getResult()
    } catch (error) {
      console.log('Error:', error)
    }
  }
}
