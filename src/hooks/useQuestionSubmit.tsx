/* eslint-disable */
import { useCallback, useState } from 'react'
import axios from 'axios'

const useQuestionSubmit = (endpoint: string) => {
  const [answers, setAnswers] = useState<
    { question: string; answer: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (question: any) => {
      setIsLoading(true)

      try {
        const response = await axios.post(endpoint, { question })

        if (response.status === 200) {
          const data = response.data
          setAnswers((prevAnswers) => [
            ...prevAnswers,
            { question, answer: data.result },
          ])
        } else {
          console.error('Request failed:', response.status)
        }
      } catch (error) {
        console.error('Request failed:', error)
      }

      setIsLoading(false)
    },
    [endpoint],
  )

  return { answers, isLoading, handleSubmit }
}

export default useQuestionSubmit
