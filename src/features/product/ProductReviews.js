import { Stack } from '@mui/material'
import React from 'react'
import ReviewForm from '../review/ReviewForm'
import ReviewList from '../review/ReviewList'

function ProductReviews({ productId }) {
  return (
   <Stack spacing={2} sx={{ maxWidth: "600px" }}>
      <ReviewList productId={productId} />
      <ReviewForm productId={productId} />
    </Stack>
  )
}

export default ProductReviews
