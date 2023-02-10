import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function ProductDes({product}) {
  return (
    <Box>
      <Typography fontWeight={600}>
            DESCRIPTION
        </Typography>
        <Typography>
            {product.description}
        </Typography>
    </Box>
  )
}

export default ProductDes
