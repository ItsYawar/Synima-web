import { Box } from '@mui/material'
import React from 'react'

const Rightbar = () => {
  return (
    <Box
    bgcolor="yellow"
    flex={1}
    p={1}
    sx={{display: {xs : "none", sm: "block"}}}
    />
  )
}

export default Rightbar
