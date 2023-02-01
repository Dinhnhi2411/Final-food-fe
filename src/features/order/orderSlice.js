import { ProductionQuantityLimitsSharp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  orders: [],
  ordersDashboard: [],
  page: 1,
  totalOrders: 0,
  totalOrderDashboard: 0,
  totalPageDashboard:0,
  currentPage: 1,
  totalPages: 1,
  filters: {},
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orders = action.payload.orders;
      state.totalPages = action.payload.totalPages;
      state.totalOrders = action.payload.count;
      
    },
    getOrderDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { ordersDashboard, count } = action.payload
      state.ordersDashboard = ordersDashboard;
      state.totalOrderDashboard = count
      state.totalPageDashboard = action.payload.totalPages
    },
    handleChangeFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
    handleClearFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
    },
    updateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export default slice.reducer;

export const createOrder =
  ({ name, addressShip, phone, products, priceShip, total, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const response = await apiService.post(`/orders/me`, {
        name,
        addressShip,
        phone,
        products,
        priceShip,
        total,
        userId,
      });
      dispatch(slice.actions.addOrderSuccess(response));
      toast.success("Order Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getOrder =
  ({ page, limit = 5 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/orders/me`, { params });
      dispatch(slice.actions.getOrderSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateOrder =
  ({ id, status }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/orders/${id}`, {
        status,
      });
      dispatch(slice.actions.updateOrderSuccess(response.data));
      toast.success("Update Order Successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

// GET ALL ORDER DASBOARD
export const getOrdersDashboard =
  ({ page, limit = 5, userId, status }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit, status };
      if (status) params.status = status;
      const response = await apiService.get(`/orders`, {
        params,
        userId,
      });
      dispatch(slice.actions.getOrderDashboardSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
