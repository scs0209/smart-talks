import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'
import Image from 'next/image'
import { Box } from '@mui/material'

const AiChatRude = () => {
  const { answers, isLoading, handleSubmit } = useQuestionSubmit(
    '/api/ai/rude-friend',
  )

  return (
    <div style={{ height: '87vh' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Image
          src="/images/rude.png"
          alt="rude"
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
          <HeadInfo title="건방진 친구" />
          <QuestionForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="이 친구는 조금 건방져요."
          />
          <AnswerView answers={answers} />
        </div>
      </Box>
    </div>
  )
}

export default AiChatRude
