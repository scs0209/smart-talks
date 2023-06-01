import QuestionForm from '@/components/QuestionForm'
import HeadInfo from '@/components/common/HeadInfo'
import AnswerView from '@/components/AnswerView'
import useQuestionSubmit from '@/hooks/useQuestionSubmit'
import Image from 'next/image'
import { Box } from '@mui/material'

const PnG = () => {
  const { answers, isLoading, handleSubmit } =
    useQuestionSubmit('/api/ai/naming')

  return (
    <div style={{ height: '87vh' }}>
      <Box sx={{ position: 'relative', height: '100%' }}>
        <Image
          src="/images/naming2.png"
          alt="product-naming"
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
          <HeadInfo title="상품 이름 짓기" />
          <QuestionForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            placeholder="please write the product"
          />
          <AnswerView answers={answers} />
        </div>
      </Box>
    </div>
  )
}

export default PnG
