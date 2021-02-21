import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// React imports
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import { YobotaTableBody } from '../table-body/table-body.component';
// Table imports
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import { Field, Formik } from 'formik';
// DropDown imports
import * as ST from './table-header.style'
import * as CT from './table.config'
// Import all styles ,columns and initial values

import { getYobotaDataAction, setDisplayChartAction } from '../../store/yobota.action';
// Acttions import


const YobotaTableHeader = () => {
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState({ value: "", name: "" })
  const [rowsPerPage, setRowsPerPage] = useState(10)
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
  }
  const onSubmit = () => {
    console.log("Submited")
  }

  const handleDisplayChart = () => {
    dispatch(setDisplayChartAction(!chart))
    // Toggle chart
  }

  const handleDropDownChange = (event) => {
    setNameSelect(event.target.value)
    // Select a name/column from dropdown to be displayed
  }

  const nameList = ["First Name", "Last Name"]
  // dropdown options

  const classes = ST.useStyles();
  // Material ui classes
  const tableData = mockData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  // Counting rows per page for out Table
  return (
    <ST.StyledTableWrapper>
      <Paper elevation={6} className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <Formik onSubmit={onSubmit} initialValues={CT.initialValues}>
              {({ handleChange, handleBlur, values, errors, touched, isValid, handleReset, handleSubmit, setFieldValue, ...r }) => (
                <TableHead>
                  <ST.StyledTableRowHead>
                    {CT.columns.map((column) => (
                      <>
                        {/* Each Cell Title from our Table Head is displayed based on it's column.id*/}
                        {column.id !== nameSelect && (<ST.StyledTableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {/* If our cell id is First Name, then a DropDown will be displayed so we can chose between displaying First Name column or Last Name column */}
                          {column.id === "first_name" && (
                            <FormControl className={classes.margin}>
                              <NativeSelect
                                id="demo-customized-select-native"
                                value={column.label}
                                onChange={handleDropDownChange}
                                input={<ST.BootstrapInput />}
                              >
                                {nameList.map((name, key) => {
                                  return (
                                    <option key={key} value={column.id}>{name}</option>
                                  )
                                })}
                              </NativeSelect>
                            </FormControl>
                          )}
                          {/* Our Column Titles being displayed by column.label, I chose to not display the First Name as I've already added a dropDown for both name options */}
                          {column.id !== "first_name" && column.label}
                          {/* For DOB I've added an icon with a state, based on which a Chart COmponent will be shown or hidden */}
                          {column.id === "date_of_birth" && <ST.StyledPieChartIcon
                            onClick={handleDisplayChart}
                            chart={chart} />}
                          {/* I've gave the option to search in these fields for each Column displayed */}
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
            {/* This is our Table Body to which i've send props as It is it's child component so we can make use of it when our value from inputs change, our table body is going to display different results in our list */}
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
    </ST.StyledTableWrapper>
  )
}

export { YobotaTableHeader }



