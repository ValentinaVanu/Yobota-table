import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as ST from './table-header.style'
import { columns } from './table.config'
import { useDispatch, useSelector } from 'react-redux';
import { getYobotaDataAction, setDisplayChartAction } from '../../store/yobota.action';
import { YobotaTableBody } from '../table-body/table-body.component';
import { Field, Formik } from 'formik';


const YobotaTableHeader = () => {
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState({ value: "", name: "" })
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [nameSelect, setNameSelect] = useState("last_name")
  const [mockData, chart] = useSelector(({ yobota }) => [
    yobota.data,
    yobota.chart,
  ])
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(getYobotaDataAction())
    },
    []
  )

  const initialValues = {
    last_name: '',
    first_name: '',
    email: '',
    date_of_birth: '',
    industry: '',
    salary: '',
    years_of_experience: '',
  }

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleValueChange = (e, setFieldValue) => {
    setFieldValue(e.target.name, e.target.value)
    setSearchValue({
      value: e.target.value,
      name: e.target.name
    })
    console.log(e.target.value, e.target.name)
  }

  const onSubmit = () => {
    console.log("s-a trimis")
  }

  const handleDisplayChart = () => {
    dispatch(setDisplayChartAction(!chart))
  }

  const classes = useStyles();
  const tableData = mockData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper elevation={6} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <Formik onSubmit={onSubmit} initialValues={initialValues}>
            {({ handleChange, handleBlur, values, errors, touched, isValid, handleReset, handleSubmit, setFieldValue, ...r }) => (
              <TableHead>
                <ST.StyledTableRowHead>
                  {columns.map((column) => (
                    <>
                      {column.id !== nameSelect && (<ST.StyledTableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                        {column.id === "date_of_birth" && <ST.StyledPieChartIcon
                          onClick={handleDisplayChart}
                          chart={chart} />}
                        <Field
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmit()
                            }
                          }}
                          onBlur={(e) => {
                            handleBlur(e)
                            setFieldValue(e.target.name, e.target.value)
                          }}
                          onChange={e => {
                            handleValueChange(e, setFieldValue)
  
                          }}
                          id={column.id}
                          name={column.id}
                          type="text"
                          value={values[column.id]}
                          variant="outlined"
                        />
                      </ST.StyledTableCell>)}
                    </>
                    ))}
                </ST.StyledTableRowHead>
              </TableHead>
            )}
          </Formik>
          <YobotaTableBody
            nameSelect={nameSelect}
            searchValue={searchValue}
            tableData={tableData} />
        </Table>
      </TableContainer>
      <ST.StyledTablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={mockData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export { YobotaTableHeader }


