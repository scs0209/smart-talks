import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'
import Image from 'next/image'
import { Box } from '@mui/material'

const TimeComplexity = () => {
  const { answers, isLoading, handleSubmit } = useQuestionSubmit('/api/ai/time')

  return (
    <div style={{ height: '87vh' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Image
          src="/images/Time2.png"
          alt="Time Character"
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
          <HeadInfo title="시간복잡도" />
          <QuestionForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="함수를 적어서 시간복잡도를 계산해 보세요."
          />
          <AnswerView answers={answers} />
        </div>
      </Box>
    </div>
  )
}

export default TimeComplexity
