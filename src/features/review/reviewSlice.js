import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { REVIEWS_PER_PRODUCT } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  reviewsByProduct: {},
  totalReviewsByProduct: {},
  totalPages: 0,
  currentPageByProduct: [],
  reviewsById: {},
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getReviewsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { productId, review, count, page } = action.payload;
      review.forEach((review) => (state.reviewsById[review._id] = review));
      state.reviewsByProduct[productId] = review
        .map((review) => review._id)
        .reverse();
      state.totalReviewsByProduct[productId] = count;
      state.currentPageByProduct[productId] = page;
      state.totalPages = action.payload.totalPages;
    },

    sendReviewReactionSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { reviewId } = action.payload;
      const { reaction } = action.payload.reactions;
  
      state.reviewsById[reviewId].totalRatings = reaction.totalRatings;
      state.reviewsById[reviewId].rateAverage = reaction.rateAverage;
    },
    deleteReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { _id, product } = action.payload;
      state.reviewsByProduct[product] = state.reviewsByProduct[product].filter(
        (reviewId) => reviewId !== action.payload._id
      );
      delete state.reviewsById[_id];
      state.totalReviewsByProduct[product] -= 1;
    },
    editReviewSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { _id, content } = action.payload;
      state.reviewsById[_id].content = content;
    },
  },
});
export default slice.reducer;

export const createReview =
  ({ productId, content, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reviews/me/${productId}`, {
        content,
        userId,
      });
      dispatch(slice.actions.createReviewSuccess(response.data));
      dispatch(getReviews({ productId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getReviews =
  ({ productId, page = 1, limit = REVIEWS_PER_PRODUCT }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page: page,
        limit: limit,
      };
      const response = await apiService.get(`/reviews/public/${productId}`, {
        params,
      });
      if (response) {
        dispatch(
          slice.actions.getReviewsSuccess({
            ...response.data,
            productId,
            page,
          })
        );
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const sendReviewReaction =
  ({ reviewId, rate, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        refPaths: "Review",
        targetId: reviewId,
        userId: userId,
        rate,
      });
      dispatch(
        slice.actions.sendReviewReactionSuccess({
          reviewId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteReview = (reviewId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/reviews/me/${reviewId}`);
    dispatch(slice.actions.deleteReviewSuccess(response.data));

    toast.success("Delete successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const editReview =
  ({ reviewId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/reviews/me${reviewId}`, {
        content,
      });
      dispatch(slice.actions.editReviewSuccess(response.data));

      toast.success("Edit successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
