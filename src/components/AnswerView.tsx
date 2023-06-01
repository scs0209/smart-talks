import React from 'react'
import { Box, Typography } from '@mui/material'

interface AnswerViewProps {
  answers: { question: string; answer: string }[]
}

const AnswerView: React.FC<AnswerViewProps> = ({ answers }) => {
  return (
    <Box mt={2}>
      {answers.map((entry, index) => (
        <Typography
          key={index}
          variant="body1"
          sx={{ backgroundColor: '#f5f5f5', padding: '10px' }}
        >
          <strong>Question:</strong> {entry.question}
          <br />
          <strong>Answer:</strong> {entry.answer}
        </Typography>
      ))}
    </Box>
  )
}

export default AnswerView
