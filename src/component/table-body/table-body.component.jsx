import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { columns } from '../table-header/table.config';
import { TableRow } from '@material-ui/core';

// Rows are filtered by input value from table head component
const matchCondition = (row, searchValue) => searchValue.value ? row[searchValue.name] === searchValue.value : true
// Props from Parent Component table head includes main data, searchValue which come with both the value inserted in the input field and the name of the column it was inserted for, also Our DropDown state, if it's eather on first name or last name.
const YobotaTableBody = ({ tableData, searchValue, nameSelect }) => {

  return (
    <TableBody>
      {tableData && tableData.map((row, key) => {
        return (
          <>
          {/* if our matchCondition/filter is met, then we will have relevant row displayed, otherwise we will see all the rows */}
            {matchCondition(row, searchValue) && (<TableRow hover role="checkbox" tabIndex={-1} key={key}>
              {columns.map((column, key) => {
                const value = row[column.id]
                return (
                  <>
                    {nameSelect !== column.id && <TableCell key={key} align={column.align}>
                      {value}
                    </TableCell>}
                  </>
                );
              })}
            </TableRow>)}
          </>
        );
      })}
    </TableBody>
  )
}

export { YobotaTableBody }
