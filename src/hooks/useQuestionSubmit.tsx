/* eslint-disable */
import { useCallback, useState } from 'react'
import axios from 'axios'

const useQuestionSubmit = (endpoint: string) => {
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async (question: any) => {
      setIsLoading(true)

      try {
        const response = await axios.post(endpoint, { question })

        if (response.status === 200) {
          const data = response.data
          setAnswer(data.result)
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

  return { answer, isLoading, handleSubmit }
}

export default useQuestionSubmit
