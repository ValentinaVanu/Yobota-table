import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// React imports
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import { YobotaTableBody } from '../table-body/table-body.component';
// Table imports
import { Field, Formik } from 'formik';
// DropDown imports
import * as ST from './table-header.style'
import * as CT from './table.config'
// Import all styles ,columns and initial values

import { getYobotaDataAction, setDisplayChartAction } from '../../store/yobota.action';
import { ClickAwayListener, Grow, MenuItem, MenuList, Popper } from '@material-ui/core'
// Acttions import


const YobotaTableHeader = () => {
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState({})
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // DropDown State
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [nameSelect, setNameSelect] = useState("first_name")
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

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }

  const handleCloseMenu = (name, e) => {
    setNameSelect(name)
    handleClose(e)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false && anchorRef.current) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // Table Pagination functionality
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  // Input Value
  const handleValueChange = (e, setFieldValue) => {
    setFieldValue(e.target.name, e.target.value)
    console.log(e.target.name, e.target.value)
    setSearchValue({
      ...searchValue,
      [e.target.name]: e.target.value,
    })
  }
  const onSubmit = () => {
    // console.log("Submited")
  }

  const handleDisplayChart = () => {
    dispatch(setDisplayChartAction(chart === "on" ? "off" : "on"))
  }
  const nameList = [{
    label: "First Name",
    id: "first_name"
  },
  {
    label: "Last Name",
    id: "last_name"
  }]
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
                      <Fragment key={column.id}>
                        {/* Each Cell Title from our Table Head is displayed based on it's column.id*/}
                        {["last_name", "first_name"].includes(column.id) && column.id === nameSelect && (<ST.StyledTableCell
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {/* If our cell id is First Name, then a DropDown will be displayed so we can chose between displaying First Name column or Last Name column */}
                          <>
                            <div
                              onClick={() => setOpen(true)}
                              ref={anchorRef}
                            >{column.label}</div>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                              {({ TransitionProps, placement }) => (
                                <Grow
                                  {...TransitionProps}
                                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                  <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        {nameList.map(({ label, id }, key) => {
                                          return (
                                            <MenuItem key={key} onClick={e => handleCloseMenu(id, e)}>{label}</MenuItem>
                                          )
                                        })}
                                      </MenuList>
                                    </ClickAwayListener>
                                  </Paper>
                                </Grow>
                              )}
                            </Popper>
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
                          </>
                          {/* Our Column Titles being displayed by column.label, I chose to not display the First Name as I've already added a dropDown for both name options */}
                        </ST.StyledTableCell>)}

                        {!["last_name", "first_name"].includes(column.id) && (<ST.StyledTableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                          {/* For DOB I've added an icon with a state, based on which a Chart COmponent will be shown or hidden */}
                          {column.id === "date_of_birth" && <ST.StyledPieChartIcon
                            onClick={handleDisplayChart}
                            chart={chart} />}
                          <br />
                          {/* I've gave the option to search in these fields for each Column displayed */}
                          <Field
                            autocomplete="off"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSubmit()}
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
                      </Fragment >
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



