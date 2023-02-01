import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  selectedUser: null,
  users:[],
  totalPage:0,
  totalUsers:0,
  currentPage:1,
  filters: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updateUser = action.payload;
      state.updatedProfile = updateUser;
    },
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },
     deactiveUserSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
      updateUserSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalUsers = action.payload.count;
      state.users = action.payload.users;
   
      state.currentPage = action.payload.page;
      state.totalPage = action.payload.totalPage
    },
     handleChangeUserFilters(state, action) {
      state.isLoading = false;
      state.error = null;
      state.filters = { ...state.filters, ...action.payload };
    },
     handleClearUserFilters(state) {
      state.isLoading = false;
      state.error = null;
      state.filters = {};
    },

  },
});

export default slice.reducer;

export const {
  
 
  getUserListSuccess,
  deactiveUserSuccess,
  updateUserSuccess,
  handleChangeUserFilters,
  handleClearUserFilters,
} = slice.actions;


export const getUser = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/${id}`);
    dispatch(slice.actions.getUserSucess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const getCurrentUserProfile = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/me`);
    dispatch(slice.actions.updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const updateUserProfile =
  ({ userId, name, avatarUrl, address, city, country, phone }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name,
        avatarUrl,
        address,
        city,
        country,
        phone,
      };
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      }
      const response = await apiService.put(`/users/customer/${userId}`,{...data});
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      dispatch(getCurrentUserProfile());
      toast.success("Update Profile Sucessfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };


  export const getUserList = (filters) => async (dispatch, getState) => {
  dispatch(slice.actions.startLoading());
  try {
    filters = { ...filters, ...getState().user.filters };

    const response = await apiService.get("/users", { params: filters });
    dispatch(getUserListSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};

export const deactiveUser = (id, filters) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const repsonse = await apiService.delete(`/users/delete/${id}`);
    if (repsonse) {
      dispatch(deactiveUserSuccess());
      dispatch(getUserList(filters));
    }
    toast.success("You are deactive user sucessfully!");
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};

export const updateUser = (id, updateContent, filters) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const repsonse = await apiService.put(`/users/update/${id}`, {
      ...updateContent,
    });
    if (repsonse) {
      dispatch(updateUserSuccess());

      dispatch(getUserList(filters));

      toast.success("You are updated user sucessfully!");
    }
  } catch (error) {
    dispatch(slice.actions.hasError(error));
    toast.error(error.message);
  }
};