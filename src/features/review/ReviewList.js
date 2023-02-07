import { Pagination, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import PaginationBar from "../../components/pagination/PaginationBar";
import ReviewCard from "./ReviewCard";
import { getReviews } from "./reviewSlice";
function ReviewList({ productId }) {
  const [page, setPage] = useState(1)
  const {
    reviewsByProduct,
    reviewsById,
    totalReviews,
    isLoading,
    // currentPage,
    totalPages
  } = useSelector(
    (state) => ({
      reviewsByProduct: state?.review?.reviewsByProduct[productId],
      totalReviews: state?.review.totalReviewsByProduct[productId],
      // currentPage: state?.review?.currentPageByProduct[productId] || 1,
      reviewsById: state?.review?.reviewsById,
      isLoading: state?.review?.isLoading,
      totalPages:state?.review?.totalPages
    }),
    shallowEqual
  );

  const handleChange = (even, value) => {
        setPage(value);
    };

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) dispatch(getReviews({ productId, page }));
  }, [productId, dispatch, page]);

  let renderReviews;

  if (reviewsByProduct) {
    const reviews = reviewsByProduct?.map((reviewId) => reviewsById[reviewId]);
    // console.log("review", reviews)

    renderReviews = (
      <Stack spacing={1.5}>
        {reviews?.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderReviews = <LoadingScreen />;
  }
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
          {totalReviews > 1
            ? `${totalReviews} reviews`
            : totalReviews === 1
            ? `${totalReviews} review`
            : "No review"}
        </Typography>

       <Pagination
            count={Math.ceil(totalReviews/5)}
            page={page}
            onChange={handleChange}
            />
      </Stack>
      {renderReviews}
    </Stack>
  );
}

export default ReviewList;
