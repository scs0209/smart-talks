import { useCallback, useState } from 'react'
import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'

const AiAssistant = () => {
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(async (question: any) => {
    setIsLoading(true)

    // 비동기 작업 수행
    try {
      // 예시: 비동기 작업을 수행하고 결과를 받아옴
      const response = await fetch('/api/question', {
        method: 'POST',
        body: JSON.stringify({ question }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAnswer(data.answer)
      } else {
        // 오류 처리
        console.error('Request failed:', response.status)
      }
    } catch (error) {
      // 오류 처리
      console.error('Request failed:', error)
    }

    setIsLoading(false)
  }, [])

  return (
    <div>
      <HeadInfo title="Assistant" />
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {answer && <AnswerView answer={answer} />}
    </div>
  )
}

export default AiAssistant
