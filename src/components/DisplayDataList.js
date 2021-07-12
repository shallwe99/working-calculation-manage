import {
  Table,
  TableHead,
  TableRow as MuiTableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  Stack,
  Box
} from '@material-ui/core';

const TableRow = ({ record }) => {
  if (record)
    return (
      <MuiTableRow>
        {Object.keys(record).map((key, cellIndex) => (
          <TableCell align="left" key={cellIndex} sx={{ minWidth: 100 }}>
            {record[key]}
          </TableCell>
        ))}
      </MuiTableRow>
    );
  return null;
};

const DisplayDataList = ({ headLabels = [], dataRecords = [{}] }) => (
  <TableContainer>
    <Table>
      {/* <UserListHead
        order={order}
        orderBy={orderBy}
        headLabel={TABLE_HEAD}
        rowCount={USERLIST.length}
        numSelected={selected.length}
        onRequestSort={handleRequestSort}
        onSelectAllClick={handleSelectAllClick}
      /> */}
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell> */}
          {headLabels &&
            headLabels.map((headCell, index) => (
              <TableCell
                key={index}
                align="left"
                // sortDirection={orderBy === headCell.id ? order : false}
                sx={{ minWidth: 50 }}
              >
                {/* <TableSortLabel
                    hideSortIcon
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box sx={{ ...visuallyHidden }}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel> */}
                {headCell}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataRecords.length > 0
          ? dataRecords.map((row, rowIndex) =>
              row ? <TableRow key={rowIndex} record={row} /> : null
            )
          : null}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DisplayDataList;
