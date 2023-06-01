import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'
import Image from 'next/image'
import { Box } from '@mui/material'

const QnA = () => {
  const { answers, isLoading, handleSubmit } = useQuestionSubmit('/api/ai/qna')

  return (
    <div style={{ height: '87vh' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Image
          src="/images/QnA2.png"
          alt="Q&A"
          layout="fill"
          objectFit="cover"
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <HeadInfo title="Q&A" />
          <QuestionForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="궁금한 것이 있으면 물어보세요."
          />
          <AnswerView answers={answers} />
        </div>
      </Box>
    </div>
  )
}

export default QnA
