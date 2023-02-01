import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";




const initialState = {
  isLoading: false,
  error: null,
  
  reports: {},
  products: [],
  product: {},
  totalPageProduct: 1,

  totalProduct: 0,
  totalCustomer:0,
  totalOrder:0,

  filters: {},
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getReportsDashboardSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.reports = action.payload;

    },

     handleChangeDashBoardFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
     handleClearDashBoardFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
    },

}

});
export default slice.reducer;

export const {
  startLoading,
  getReportsDashboardSuccess,
  handleClearDashBoardFilters,
  handleChangeDashBoardFilters,
  hasError,
} = slice.actions


export const getReportsDashboard = (filters) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/dashboards", {
      params: { ...filters },
    });

    if (response) {
      dispatch(slice.actions.getReportsDashboardSuccess(response.data));
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};






