import React from 'react'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { columns } from '../table-header/table.config';
import { TableRow } from '@material-ui/core';


const matchCondition = (row, searchValue) => searchValue.value ? row[searchValue.name] === searchValue.value : true

const YobotaTableBody = ({ tableData, searchValue, nameSelect }) => {

  return (
    <TableBody>
      {tableData && tableData.map((row, key) => {
        return (
          <>
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
