import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'

const AiAssistant = () => {
  const { answer, isLoading, handleSubmit } = useQuestionSubmit('/api/question')

  return (
    <div>
      <HeadInfo title="Assistant" />
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {answer && <AnswerView answer={answer} />}
    </div>
  )
}

export default AiAssistant
