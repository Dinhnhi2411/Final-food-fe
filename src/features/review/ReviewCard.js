import { Avatar, Paper, Rating, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import useAuth from "../../hooks/useAuth";

import { fDate } from "../../utils/formatTime";
import { sendReviewReaction } from "./reviewSlice";

function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const { rateAverage, _id } = review;
  const { user } = useAuth();
  const userId = user?._id;
  const [valueRating, setRating] = useState(rateAverage);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={review.userId?.name} src={review.userId?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {review.userId?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(review.createdAt)}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          {review?.userId?._id === userId ? (
            <Rating
              name="read-only"
              value={valueRating}
              precision={1}
              onChange={(event, newValue) => {
                if (newValue) {
                  setRating(newValue);
                  dispatch(
                    sendReviewReaction({
                      reviewId: _id,
                      rating: +newValue,
                      userId: userId,
                    })
                  );
                }
              }}
              size="small"
            />
          ) : (
            <Rating name="read-only" value={valueRating} readOnly />
          )}
        </Stack>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {review.content}
        </Typography>
      </Paper>
    </Stack>
  );
}

export default ReviewCard;
