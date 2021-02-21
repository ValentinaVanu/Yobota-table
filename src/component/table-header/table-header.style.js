import styled from 'styled-components'
import { TableCell, TablePagination, TableRow } from '@material-ui/core'
import PieChartIcon from '@material-ui/icons/PieChart'


export const StyledPieChartIcon = styled(PieChartIcon)`
  && {
    color: ${({ chart }) => !chart ? '#fff' : 'red'};
    padding-top: 11px;
  }
`

export const StyledTablePagination = styled(TablePagination)`
  && {
    color: #fff;
    background: rgb(0,0,0);
    background: linear-gradient(170deg, rgba(0,0,0,1) 0%, rgba(51,66,77,1) 51%, rgba(9,9,10,1) 87%);
  }
`

export const StyledTableRowHead = styled(TableRow)`
  && {
    border-bottom: none;
  }
`

export const StyledTableCell = styled(TableCell)`
  && {
    color: #fff;
    background-color: #222934;
    border-bottom: none;
    padding: 4px 8px 0px 8px;
    font-size: 16px;
  }
`
