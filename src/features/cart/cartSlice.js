import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  productId: {},
  carts: [],
  page: 1,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.carts = action.payload;
    },
    addCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newCart = action.payload;
      state.productId[newCart._id] = newCart;
    },
  },
});

export default slice.reducer;

export const getCart =
  ({ page, limit = PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page: page, limit: limit };
      const response = await apiService.get(`/carts/me`, {
        params,
      });
      dispatch(slice.actions.getCartSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const addCart =
  ({ productId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/carts/me", { productId });
      dispatch(slice.actions.addCartSuccess(response));
      dispatch(getCart(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const updateCart = (id, amount) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.put(`/carts/me/${id}`, {
      amount,
    });
    dispatch(getCart(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const deleteCart = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/carts/me/${id}`);
    dispatch(getCart(response));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
