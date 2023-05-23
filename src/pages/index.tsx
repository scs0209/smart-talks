import { apiService } from '@/services/apiServices'
import { getSession, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { GetServerSideProps } from 'next'

interface HomeProps {
  session: any
}

const Home: React.FC<HomeProps> = ({ session }) => {
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const isLoading = !session

  const onChangeQuestion = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: { session },
  }
}

export default Home
