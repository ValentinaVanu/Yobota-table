import React from 'react'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui'
import { Animation } from '@devexpress/dx-react-chart'
import { useSelector } from 'react-redux';
import { StyledChartWrapper } from './chart.style'


const YobotaChart = () => {
// yobota data and chart boolean state from redux
  const [chartData, chart] = useSelector(({ yobota }) => [
    yobota.data,
    yobota.chart,
  ])
// List of Date of birth year with year and salary
  const dobList = chartData.map(l => ({
    year: l.date_of_birth.split("/")[2],
    salary: l.salary
  }))

  return (
    <StyledChartWrapper>
      {chart === "on" && <Paper>
        <Chart
          data={dobList}
        >
          <ArgumentAxis />
          <ValueAxis max={100} />
          <BarSeries
            valueField="salary"
            argumentField="year"
          />
          <Title text="Salary / Date of Birth" />
          <Animation />
        </Chart>
      </Paper>}
    </StyledChartWrapper>
  )
}

export { YobotaChart }
