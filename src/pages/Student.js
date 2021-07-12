import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect, useCallback } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import Popup from '../components/Popup';
import UploadButton from '../components/UploadButton';
// import USERLIST from '../_mocks_/user';
import { http, getComCode } from '../utils/httpUtils';
import StudentForm from '../components/StudentForm';
import UploadStudentForm from '../components/UploadStudentForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'patientName', label: 'Student Name', alignRight: false },
  { id: 'sex', label: 'Sex', alignRight: false },
  { id: 'age', label: 'Age', alignRight: false },
  { id: 'payType', label: 'Payment Type', alignRight: false },
  { id: 'leftMoney', label: 'Left Money', alignRight: false },
  { id: 'enabled', label: 'Enabled', alignRight: false },
  { id: 'updatedAt', label: 'LastModified', alignRight: false }
];
// student: [
//   { id: 'patientName', label: 'StudentName', alignRight: false },
//   { id: 'sex', label: 'Sex', alignRight: false },
//   { id: 'patType', label: 'PaymentType', alignRight: false },
//   { id: 'enabled', label: 'isEnabled', alignRight: false },
//   { id: 'updatedAt', label: 'LastModified', alignRight: false }
// ]

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.patientName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Student() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [USERLIST, setUSERLIST] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [uploadRecords, setUploadRecords] = useState([]);
  const [uploadHeadLabels, setUploadHeadLabels] = useState([]);
  const [openUploadPopup, setOpenUploadPopup] = useState(false);
  const fetchData = useCallback(() => {
    http
      .get(`/patients/${getComCode()}/allWithPayList`)
      .then((res) => {
        setUSERLIST(res.data);
      })
      .catch((err) => {
        const error = err.response ? err.response.data : err;
        alert(`系统错误\n${JSON.stringify(error)}`);
      });
  }, [setUSERLIST]);
  useEffect(() => {
    fetchData();
    // return () => {
    //   cleanup;
    // };
  }, [fetchData]);

  const showUploadForm = (data) => {
    setUploadRecords(data);
    setOpenUploadPopup(true);
  };
  const closeUploadForm = () => {
    setUploadRecords([]);
    setOpenUploadPopup(false);
  };
  const setEditRecord = (_id) => {
    USERLIST.some((element) => {
      if (element._id === _id) {
        setRecordForEdit(element);
        setOpenPopup(true);
        return true;
      }
      return false;
    });
  };
  const closeOpenPopup = () => {
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.patientName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  // course upload process
  // end course upload process
  return (
    <Page title="Working Calculation | Student">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student
          </Typography>
          <Stack direction="row" alignItems="flex-end" justifyContent="flex-end">
            <UploadButton
              text="Import Students"
              showUploadForm={showUploadForm}
              importSheetName="学生数据"
            />
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={() => setOpenPopup(true)}
              sx={{ ml: 3 }}
            >
              New Student
            </Button>
          </Stack>
        </Stack>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeHolder="Search Student..."
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                      const { _id, patientName, sex, age, payType, payList, enabled, updatedAt } =
                        row;
                      const isItemSelected = selected.indexOf(patientName) !== -1;
                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, patientName)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              {/* <Avatar alt={name} src={avatarUrl} /> */}
                              <Typography variant="subtitle2" noWrap>
                                {patientName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{sex ? 'Male' : 'Female'}</TableCell>
                          <TableCell align="left">{age}</TableCell>
                          <TableCell align="left">
                            {payType === 'oneTime' ? '按次付费' : '按月付费'}
                          </TableCell>
                          <TableCell align="left">
                            {payList && payList.length > 0
                              ? payList[payList.length - 1].currentMoney
                              : '---'}
                          </TableCell>
                          <TableCell align="left">{enabled ? 'Yes' : 'No'}</TableCell>
                          <TableCell key="key-lastModified" align="left">
                            {updatedAt.toLocaleString().substring(0, 10)}
                          </TableCell>
                          {/* <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={(status === 'banned' && 'error') || 'success'}
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell> */}

                          <TableCell align="right">
                            <UserMoreMenu _id={_id} setEditRecord={setEditRecord} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Popup title="Student Form" openPopup={openPopup} setOpenPopup={closeOpenPopup}>
          <StudentForm
            recordForEdit={recordForEdit}
            callback={() => {
              closeOpenPopup();
              fetchData();
            }}
          />
        </Popup>
        <Popup
          title="Import Students Form"
          openPopup={openUploadPopup}
          setOpenPopup={closeUploadForm}
        >
          {/* <CourseForm
            recordForEdit={recordForEdit}
            callback={() => {
              closeUploadForm();
              fetchData();
            }}
          /> */}
          <UploadStudentForm
            comCode={getComCode()}
            headLabels={TABLE_HEAD.map((item) => item.label)}
            recordArray={uploadRecords}
            companyPatientList={USERLIST}
            callback={() => {
              closeUploadForm();
              fetchData();
            }}
          />
        </Popup>
      </Container>
    </Page>
  );
}
