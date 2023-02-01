import React, { useState } from "react";

import { Stack, Avatar, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { createReview } from "./reviewSlice";
import { toast } from "react-toastify";


function ReviewForm({ productId }) {
    const { user, isAuthenticated } = useAuth();
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const userId = user._id;
    
   const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login for write a review");
    } else {
      dispatch(createReview({ productId, content, userId }));
      setContent("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
    <Stack direction="row" alignItems="center">
      <Avatar src={user?.avatarUrl} alt={user?.name} />
      <TextField
        fullWidth
        size="small"
        value={content}
        placeholder="Write a comment…"
        onChange={(event) => setContent(event.target.value)}
        sx={{
          ml: 2,
          mr: 1,
          "& fieldset": {
            borderWidth: `1px !important`,
            borderColor: (theme) =>
              `${theme.palette.grey[500_32]} !important`,
          },
        }}
      />
      <IconButton type="submit">
        <SendIcon sx={{ fontSize: 30 }} />
      </IconButton>
    </Stack>
  </form>
  )
}

export default ReviewForm