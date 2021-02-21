import React from 'react'
import { Provider } from 'react-redux'
import store from '../../store'
import { YobotaChart } from '../chart'
import { YobotaTableHeader } from '../table-header'
import { StyledAppWrapper } from './app.style'

const App = () => {
  return (
    <StyledAppWrapper>
      <Provider store={store}>
        <YobotaTableHeader />
        <YobotaChart />
      </Provider>
    </StyledAppWrapper>
  )
}

export { App }
