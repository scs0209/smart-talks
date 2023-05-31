import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'

const AiChatRude = () => {
  const { answer, isLoading, handleSubmit } = useQuestionSubmit(
    '/api/ai/rude-friend',
  )

  return (
    <div>
      <HeadInfo title="건방진 친구" />
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {answer && <AnswerView answer={answer} />}
    </div>
  )
}

export default AiChatRude
