import React from 'react'
import { Box, Typography } from '@mui/material'

interface AnswerViewProps {
  answer: string
}

const AnswerView: React.FC<AnswerViewProps> = ({ answer }) => {
  return (
    <Box mt={2}>
      <Typography
        variant="body1"
        sx={{ backgroundColor: '#f5f5f5', padding: '10px' }}
      >
        {answer}
      </Typography>
    </Box>
  )
}

export default AnswerView
