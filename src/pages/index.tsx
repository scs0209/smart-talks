import { apiService } from '@/services/apiServices'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import Error from 'next/error'
import Head from '@/components/common/HeadInfo'
import QuestionForm from '@/components/QuestionForm'
import { Box, Container, Typography } from '@mui/material'

export default function Home({ errorCode, stars }: any) {
  const [answer, setAnswer] = useState('')
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'

  const handleSubmit = useCallback(async (question: string) => {
    const response = await apiService.post('/api/chatGptService', { question })
    setAnswer(response.result)
  }, [])

  useEffect(() => {
    if (!isLoading && !session) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      window.location.href = '/login'
    }
  }, [session, isLoading])

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head title="Home" />
      {session && (
        <Container>
          <Box mt={4}>
            <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
          </Box>
          {answer && (
            <Box mt={2}>
              <Typography
                variant="body1"
                sx={{ backgroundColor: '#f5f5f5', padding: '10px' }}
              >
                {answer}
              </Typography>
            </Box>
          )}
        </Container>
      )}
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.status
  const json = await res.json()
  return {
    props: { errorCode, stars: json.stargazers_count },
  }
}
