import { apiService } from '@/services/apiServices'
import { signOut, useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import Error from 'next/error'
import Head from '@/components/common/HeadInfo'

export default function Home({ errorCode, stars }: any) {
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

  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <>
      <Head title="Home" />
      {session && (
        <>
          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
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

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const errorCode = res.ok ? false : res.status
  const json = await res.json()
  return {
    props: { errorCode, stars: json.stargazers_count },
  }
}
