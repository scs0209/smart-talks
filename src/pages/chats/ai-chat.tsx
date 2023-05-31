import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'

const AiChat = () => {
  const { answer, isLoading, handleSubmit } = useQuestionSubmit('/api/ai/chat')

  return (
    <div>
      <HeadInfo title="AI Friend" />
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {answer && <AnswerView answer={answer} />}
    </div>
  )
}

export default AiChat
