import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'

const PnG = () => {
  const { answer, isLoading, handleSubmit } =
    useQuestionSubmit('/api/ai/naming')

  return (
    <div>
      <HeadInfo title="상품 이름 짓기" />
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
      {answer && <AnswerView answer={answer} />}
    </div>
  )
}

export default PnG
