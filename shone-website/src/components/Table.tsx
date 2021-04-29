import {
  Box,
  Button,
  makeStyles,
  TablePagination,
  TableSortLabel,
  Typography,
  withStyles,
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

interface IColumns {
  title: string
  sortable?: boolean
  displayName?: string
  renderField?: (row: any) => any
  field: string
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const useStyles = makeStyles({
  container: (props: { height?: number }) => ({
    height: props.height || 587,
  }),
})

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

export default function BasicTable({
  bottomActions,
  rows,
  columns,
  rowId,
  handleRowClick,
  tableTitle,
  tableWidth,
  handleSort,
  onChangeRowsPerPage,
  onChangePage,
  styleProps,
}: {
  bottomActions?: any[]
  rows: any[]
  columns: IColumns[]
  rowId: string
  tableTitle?: string
  tableWidth?: string | number
  handleRowClick?: (id) => void
  handleSort?: (event, property) => void
  onChangeRowsPerPage?: (rowsPerPage) => void
  onChangePage?: (tablePage) => void
  styleProps?: { height?: number }
}) {
  const classes = useStyles(styleProps)
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [tablePage, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    onChangePage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    onChangeRowsPerPage(parseInt(event.target.value, 10))
  }

  const createSortHandler = (property) => (event) => {
    if (handleSort) handleSort(event, property)
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

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
      <Box width={tableWidth} mt={2}>
        <TableContainer className={classes.container} component={Paper}>
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <StyledTableRow>
                {columns.map(({ title, sortable }, index) => (
                  <StyledTableCell
                    key={`title-${title}-${index}`}
                    sortDirection={orderBy === title ? order : false}
                  >
                    {sortable ? (
                      <TableSortLabel
                        active={orderBy === title}
                        direction={orderBy === title ? order : 'asc'}
                        onClick={createSortHandler(title)}
                      >
                        {title}
                      </TableSortLabel>
                    ) : (
                      title
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  onClick={() => handleRowClick && handleRowClick(row[rowId])}
                  key={row[rowId]}
                >
                  {columns.map(({ renderField, field }, index) => (
                    <StyledTableCell key={`column-${field}-${index}`}>
                      {renderField ? renderField(row) : row[field]}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {onChangePage && onChangeRowsPerPage && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={-1}
            labelDisplayedRows={() => ''}
            nextIconButtonProps={{ disabled: rows.length < rowsPerPage }}
            backIconButtonProps={{ disabled: tablePage === 0 }}
            rowsPerPage={rowsPerPage}
            page={tablePage}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
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
