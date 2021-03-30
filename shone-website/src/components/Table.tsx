import { Box, Button, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

export default function BasicTable({
  bottomActions,
  rows,
  columns,
  rowId,
  handleRowClick,
  tableTitle,
  tableWidth,
}: {
  bottomActions?: any[]
  rows: any[]
  columns: any[]
  rowId: string
  tableTitle?: string
  tableWidth?: string | number
  handleRowClick?: (id) => void
}) {
  return (
    <Box
      width={tableWidth}
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={2}
    >
      {tableTitle && (
        <Typography variant="h4" component="h4">
          {tableTitle}
        </Typography>
      )}
      <Box width={tableWidth} mt={4}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map(({ title }, index) => (
                  <TableCell key={`title-${title}-${index}`}>{title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  onClick={() => handleRowClick && handleRowClick(row[rowId])}
                  key={row[rowId]}
                >
                  {columns.map(({ renderField, field }, index) => (
                    <TableCell key={`column-${field}-${index}`}>
                      {renderField ? renderField(row) : row[field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {bottomActions && (
        <Box mt={2}>
          {bottomActions.map(({ handleClick, name }) => (
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              key={`button-${name}`}
            >
              {name}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  )
}
