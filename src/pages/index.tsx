import { apiService } from '@/services/apiServices'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'

export default function Home() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const { data: session, status } = useSession()

  if (status === 'authenticated') console.log('session', session)
  const isLoading = status === 'loading'

  const onChangeQuestion = useCallback((e: any) => {
    setQuestion(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      apiService.post('/api/chatGptService', { question }).then((response) => {
        setAnswer(response.result)
      })
    },
    [question],
  )

  const handleLogout = useCallback(() => {
    signOut()
  }, [])

  useEffect(() => {
    if (!isLoading && !session) {
      // 로그인되지 않은 경우 로그인 페이지로 이동
      window.location.href = '/login'
    }
  }, [session, isLoading])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {session && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask a question"
              value={question}
              onChange={onChangeQuestion}
            />
            <button type="submit">Ask</button>
          </form>
          {answer && <div>{answer}</div>}
        </>
      )}
    </>
  )
}
