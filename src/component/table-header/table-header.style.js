import styled from 'styled-components'
import { InputBase, makeStyles, TableCell, TablePagination, TableRow, withStyles } from '@material-ui/core'
import PieChartIcon from '@material-ui/icons/PieChart'


// DropDown Styles
export const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}))
  // const useStyles = makeStyles({
  //   root: {
  //     width: '100%',
  //   },
  //   container: {
  //     maxHeight: 440,
  //   },
  // });

export const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

// Table Styles
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

export const StyledTableWrapper = styled.div`
  grid-column: 1/-1;
  grid-row: 1/2;
`
