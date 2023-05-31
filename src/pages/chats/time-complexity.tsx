import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'

const TimeComplexity = () => {
  const { answer, isLoading, handleSubmit } = useQuestionSubmit('/api/ai/time')

  return (
    <div>
      <HeadInfo title="시간복잡도" />
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {answer && <AnswerView answer={answer} />}
    </div>
  )
}

export default TimeComplexity
