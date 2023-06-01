import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'
import Image from 'next/image'
import { Box } from '@mui/material'

const AiAssistant = () => {
  const { answers, isLoading, handleSubmit } =
    useQuestionSubmit('/api/ai/assistant')

  return (
    <div style={{ height: '87vh' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Image
          src="/images/AI-Assistant2.png"
          alt="Assistant"
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
          <HeadInfo title="Assistant" />
          <QuestionForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="비서에게 말을 걸어보세요."
          />
          <AnswerView answers={answers} />
        </div>
      </Box>
    </div>
  )
}

export default AiAssistant
