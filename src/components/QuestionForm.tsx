import { useCallback, useState } from 'react'
import { Box, Button, CircularProgress, TextField } from '@mui/material'

interface QuestionFormProps {
  onSubmit: (question: string) => void
  isLoading: boolean
  placeholder: string
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onSubmit,
  isLoading,
  placeholder,
}) => {
  const [question, setQuestion] = useState('')

  const onChangeQuestion = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuestion(e.target.value)
    },
    [],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(question)
    },
    [onSubmit, question],
  )

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: '10px', marginTop: '4px' }}
    >
      <TextField
        type="text"
        label={placeholder}
        value={question}
        onChange={onChangeQuestion}
        variant="outlined"
        size="small"
        fullWidth
      />
      <Button
        type="submit"
        disabled={isLoading}
        variant="contained"
        color="primary"
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Ask'}
      </Button>
    </Box>
  )
}

export default QuestionForm
