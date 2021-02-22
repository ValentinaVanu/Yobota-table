import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { columns } from '../table-header/table.config';
import { TableRow } from '@material-ui/core';

// Rows are filtered by input value from table head component
// Props from Parent Component table head includes main data, searchValue which come with both the value inserted in the input field and the name of the column it was inserted for, also Our DropDown state, if it's eather on first name or last name.

const YobotaTableBody = ({ tableData, searchValue, nameSelect }) => {
  const filterData = Object.keys(searchValue || {}).length ? tableData.filter(row => Object.keys(searchValue).map(prop => {
    return searchValue[prop] == row[prop]
  }).some(e => e)) : tableData
  const [f, s, ...r] = columns
  const newColumns = [(nameSelect === "first_name" ? f : s), ...r]

  return (
    <TableBody>
      {filterData && filterData.map((row, key) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={key}>
            {newColumns.map((column, key) => {
              const value = row[column.id]
              return (
                <TableCell key={key} align={column.align}>
                  {value}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  )
}

export { YobotaTableBody }
