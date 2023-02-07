import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Alert, Avatar, AvatarGroup, Chip, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import { useEffect } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import PaginationBar from "../../components/pagination/PaginationBar";
import SearchInput from "../../components/searchInput/SearchInput";
import {
  deactiveUser,
  getUserList,
  handleChangeUserFilters,
  updateUser,
} from "../../features/user/userSlice";

import { TitleStyle } from "../../theme/customizations/TitleStyle";
import { fDate } from "../../utils/formatTime";

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "avatar",
    numeric: false,
    disablePadding: true,
    label: "Avatar",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone",
  },

  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "createdAt",
    numeric: true,
    disablePadding: false,
    label: "Created at",
  },
  {
    id: "social",
    numeric: true,
    disablePadding: false,
    label: "Social",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    userCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < userCount}
            checked={userCount > 0 && numSelected === userCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { numSelected, selected, setSelected, page, rowsPerPage } = props;
  const user = users?.find((user) => user._id === selected[0] && user.isDeleted);

  const handleSubmit = (searchQuery) =>
    dispatch(handleChangeUserFilters({ name: searchQuery }));

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="span"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Stack direction="row" alignItems="center" sx={{ flex: "1 1 100%" }}>
          <SearchInput handleSubmit={handleSubmit} />
        </Stack>
      )}

      {numSelected > 0 && user ? (
        <Tooltip title="Active User">
          <IconButton
            onClick={() => {
              const filters = { page: page + 1, limit: rowsPerPage };
              dispatch(updateUser(selected[0], { isDeleted: false }, filters));
              setSelected([]);
            }}
          >
            <PersonIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Deative User">
          <span>
            <IconButton
              disabled={numSelected === 0}
              onClick={() => {
                const filters = { page: page + 1, limit: rowsPerPage };
                dispatch(deactiveUser(selected[0], filters));
                setSelected([]);
              }}
            >
              <PersonOffIcon />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Toolbar>
  );
};
export default function UserPage() {
  const { isLoading, error, users, totalUsers, filters, totalPage } =
    useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  
  const [page, setPage] = React.useState(0);
// eslint-disable-next-line
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n._id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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

  const isSelected = (title) => selected.indexOf(title) !== -1;

  useEffect(() => {
    const filters = { page: page + 1, limit: rowsPerPage };
    dispatch(getUserList(filters));
  }, [selected, filters, dispatch, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" sx={{ py: 2 }}>
        <TitleStyle>
          <GroupIcon sx={{ width: "35px", height: "35px" }} />
          <Typography variant="h6" textAlign="left" sx={{ pl: 1 }}>
            User
          </Typography>
        </TitleStyle>
      </Stack>

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar
                  numSelected={selected.length}
                  selected={selected}
                  setSelected={setSelected}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"medium"}
                  >
                    <EnhancedTableHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      userCount={totalUsers}
                    />
                    <TableBody>
                      {users &&
                        stableSort(users, getComparator(order, orderBy)).map(
                          (user, index) => {
                            const isItemSelected = isSelected(user._id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                onClick={(event) => {
                                  handleClick(event, user._id);
                                }}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={user._id}
                                selected={isItemSelected}
                              >
                                <TableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                  />
                                </TableCell>
                                <TableCell
                                  // component="span"
                                  id={labelId}
                                  scope="user"
                                  sx={{ p: 1 }}
                                >
                                  <Avatar
                                    src={user?.avatarUrl}
                                    alt="photoURL"
                                  />
                                </TableCell>
                                <TableCell align="left">
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ color: "text.primary" }}
                                  >
                                    {user?.name}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography
                                    variant="subtitle1"
                                    color="initial"
                                  >
                                    {user?.email}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography
                                    variant="subtitle1"
                                    color="initial"
                                  >
                                    {user?.phone}
                                  </Typography>
                                </TableCell>

                                <TableCell align="right">
                                  <Typography
                                    variant="subtitle1"
                                    color="initial"
                                  >
                                    <Chip
                                      label={
                                        user?.isDeleted ? "Deactive" : "Active"
                                      }
                                      color={user?.isDeleted ? "error" : "info"}
                                    />
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Typography
                                    variant="subtitle1"
                                    color="initial"
                                  >
                                    {fDate(user?.createdAt)}
                                  </Typography>
                                </TableCell>
                                <TableCell align="right">
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="flex-end"
                                  >
                                    <AvatarGroup max={2}>
                                      {user?.facebookId && (
                                        <Avatar
                                          alt="Facebook"
                                          sx={{
                                            bgcolor: "primary.main",
                                            width: 35,
                                            height: 35,
                                          }}
                                        >
                                          <FaFacebookF />
                                        </Avatar>
                                      )}

                                      {user?.googleId && (
                                        <Avatar
                                          alt="Google"
                                          sx={{
                                            bgcolor: "primary.main",
                                            width: 35,
                                            height: 35,
                                          }}

                                       >
                                        <FaGoogle />
                                       </Avatar>
                                      )}

                                    </AvatarGroup>
                                  </Stack>
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                     
                    </TableBody>
                  </Table>
                </TableContainer>
                 <Box
            sx={{
              mt: { xs: 2, md: 5 },
              mb: { xs: 2, md: 5 },
              display: "flex",
              justifyContent: "center",
            }}
          >
            {totalUsers ? (
              <PaginationBar
                page={page}
                setPage={setPage}
                totalPage={+totalPage}
              />
            ) : (
              <Typography variant="h6">No User Yet</Typography>
            )}
          </Box>
              </Paper>
            </>
          )}
         
        </>
      )}
    </Box>
  );
}
