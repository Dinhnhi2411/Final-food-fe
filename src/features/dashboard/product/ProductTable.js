
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Box from "@mui/material/Box";
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
import { useState } from "react";
import { useEffect } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {  NavLink } from "react-router-dom";
import PaginationBar from "../../../components/pagination/PaginationBar";
import SearchInput from "../../../components/searchInput/SearchInput";
import useAuth from "../../../hooks/useAuth";
import { fCurrency } from "../../../utils/numberFormat";
import {
  deleteProduct,
  getProductList,
  handleChangeFilters,
  handleClearFilters,
} from "../../product/productSlice";
import ProductSort from "../../product/ProductSort";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ProductEdit from "./ProductEdit";
import { Pagination, Stack } from "@mui/material";

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
    id: "image",
    aligns: "center",
    disablePadding: true,
    label: "Image",
  },
  {
    id: "_id",
    aligns: "center",
    disablePadding: true,
    label: "Product",
  },
  {
    id: "types",
    aligns: "center",
    disablePadding: false,
    label: "Types",
  },
  {
    id: "status",
    aligns: "center",
    disablePadding: false,
    label: "Status",
  },
  {
    id: "price",
    aligns: "center",
    disablePadding: false,
    label: "Price",
  },
  {
    id: "priceSale",
    aligns: "center",
    disablePadding: false,
    label: "PriceSale",
  },
  {
    id: "Unit",
    aligns: "center",
    disablePadding: false,
    label: "Unit",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ fontWeight: 600 }}
            key={headCell.id}
            align={headCell.aligns}
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
                <Box component="span" sx={visuallyHidden}>
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
  const {
    numSelected,
    setSelected,
    setPage,
  } = props;
  const handleSubmit = (searchQuery) =>
    dispatch(handleChangeFilters({ productName: searchQuery }));
  const handleDispatch = (value) => dispatch(handleChangeFilters(value));

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
        <Stack
          direction="row"
          alignItems="center"
          sx={{ flex: "1 1 100%" }}
          spacing={2}
        >
          <SearchInput handleSubmit={handleSubmit} />
          <ProductSort handleDispatch={handleDispatch} />
        </Stack>
      )}
    
        <Tooltip title="Add Product">
          <IconButton
            component={NavLink}
            to={`/dashboard/products/add`}
            onClick={() => setSelected([])}
          >
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear filter">
          <IconButton
            onClick={() => {
              setPage(0);
              dispatch(handleClearFilters());
            }}
          >
            <ClearAllIcon />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
};

export default function ProductTable() {
  const { products, totalProductDashboard, filters, totalPages, error, isLoading } =
  useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productCurrent, setProductCurrent] = useState([]);
  const { user } = useAuth();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("price");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChange = (even, value) => {
        setPage(value);
    };


  const handleDeleteProduct = (id) => {
    if (user._id) dispatch(deleteProduct(id));
  };

  const handleClickOpen = (row) => {
    
    setProductCurrent(row);
    setOpen(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n._id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  useEffect(() => {
    const filters = { page: page, limit: rowsPerPage };
    dispatch(getProductList(filters));
  }, [page, filters, rowsPerPage, dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          setSelected={setSelected}
          setPage={setPage}
        />

        <TableContainer>
        <ProductEdit
        productCurrent={productCurrent}
        setOpen={setOpen}
        open={open}
      />
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
              rowCount={products?.length}
            />
            <TableBody>
              {stableSort(products, getComparator(order, orderBy)).map(
                (row, index) => {
                  const {
                    productName,
                    types,
                    status,
                    price,
                    priceSale,
                    unit,
                    _id,
                  } = row;
                  const image = row.image[0];
                  return (
                    <TableRow key={row._id}>
                      <TableCell sx={{ alignItems: "center" }}>
                        <Box
                          component="img"
                          sx={{
                            width: 100,
                            height: "100%",
                            ml: 1,
                            mt: 1,
                            borderRadius: 1,
                          }}
                          src={image}
                          alt="product"
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          display: { xs: "10%", md: "20%" },
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        {productName}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{ display: { xs: "10%", md: "20%" } }}
                      >
                        {types}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ display: { xs: "10%", md: "20%" } }}
                      >
                        {status}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{
                          display: { xs: "10%", md: "20%", fontWeight: "600" },
                        }}
                      >
                        {fCurrency(price)}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{
                          display: {
                            xs: "10%",
                            md: "20%",
                            color: "red",
                            fontWeight: "600",
                          },
                        }}
                      >
                        {fCurrency(priceSale)}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{ display: { xs: "15%", md: "20%" } }}
                      >
                        {unit}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{ display: { xs: "15", md: "20%" } }}
                      >
                        <IconButton
                          onClick={() => {
                            handleClickOpen(row);
                          }}
                          aria-label="edit"
                          size="small"
                        >
                          <BorderColorIcon fontSize="small" />
                        </IconButton>
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{ display: { xs: "15", md: "20%" } }}
                      >
                        <IconButton
                          onClick={() => {
                            handleDeleteProduct(_id);
                          }}
                          aria-label="delete"
                          size="small"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
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
            mt: { xs: 2, md: 5,  },
            mb: { xs: 2, md: 5,  },
            display: "flex",
            justifyContent: "center",
          }}
        >
          {totalProductDashboard ? (
            // <PaginationBar
            //   page={page}
            //   setPage={setPage}
            //   totalPage={+totalPages}
            // />
            <Pagination
            count={Math.ceil(totalProductDashboard/10)}
            page={page}
            onChange={handleChange}
            />
          ) : (
            <Typography variant="h6">No Products Yet</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}