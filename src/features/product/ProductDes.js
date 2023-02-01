import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function ProductDes({product}) {
  return (
    <Box>
        <Typography>
            {product.description}
        </Typography>
    </Box>
  )
}

export default ProductDes
