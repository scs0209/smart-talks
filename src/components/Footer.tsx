import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '20px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      <Typography variant="body2" align="center" color="textSecondary">
        2023 SCS - All rights reserved
      </Typography>
    </Box>
  )
}

export default Footer
