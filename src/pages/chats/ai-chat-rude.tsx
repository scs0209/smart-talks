import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'

const AiChatRude = () => {
  const { answer, isLoading, handleSubmit } = useQuestionSubmit('/api/question')

  return (
    <div>
      <HeadInfo title="Q&A" />
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {answer && <AnswerView answer={answer} />}
    </div>
  )
}

export default AiChatRude
